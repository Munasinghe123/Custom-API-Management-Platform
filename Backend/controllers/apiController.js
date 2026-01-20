const fs = require('fs');
const path = require('path');
const { getConnection } = require('../config/oracle')
const oracledb = require('oracledb');


const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function clobToString(clob) {
  if (clob === null) return null;

  if (typeof clob === 'string') return clob;

  let result = '';
  for await (const chunk of clob) {
    result += chunk;
  }
  return result;
}


async function executeApi(req, res) {
  const { apiname } = req.params;
  const inputParams = req.body;

  const registry = loadRegistry();
  const key = Object.keys(registry).find(
    k => k.toLowerCase() === apiname.toLowerCase()
  );

  if (!key) {
    return res.status(404).json({ error: 'API not found' });
  }

  const apiConfig = registry[key];
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: apiConfig.db.user,
      password: apiConfig.db.password,
      connectString: `${apiConfig.db.host}:${apiConfig.db.port}/${apiConfig.db.service}`
    });

    const result = await connection.execute(
      `BEGIN ${apiConfig.procedure}(:input, :output); END;`,
      {
        input: JSON.stringify(inputParams),
        output: { dir: oracledb.BIND_OUT, type: oracledb.CLOB }
      }
    );

    const outputJson = await clobToString(result.outBinds.output);

    res.json(JSON.parse(outputJson));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB execution failed' });
  } finally {
    if (connection) await connection.close();
  }
}


module.exports = {
  loadRegistry, executeApi
}
