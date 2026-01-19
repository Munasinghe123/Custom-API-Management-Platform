const fs = require('fs');
const path = require('path');
const { getConnection } = require('../config/oracle')
const oracledb = require('oracledb');


const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
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
      `BEGIN ${apiConfig.procedure}(:emp_no, :name, :status, :role); END;`,
      {
        emp_no: inputParams.emp_no,
        name: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        status: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        role: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );

    res.json({
      emp_no: inputParams.emp_no,
      name: result.outBinds.name,
      status: result.outBinds.status,
      role: result.outBinds.role
    });


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
