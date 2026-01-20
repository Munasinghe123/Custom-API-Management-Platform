const fs = require('fs');
const path = require('path');
const oracledb = require('oracledb');

const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

async function executeApi(req, res) {
  const { apiName, data } = req.body;

  if (!apiName || !data || typeof data !== "object") {
    return res.status(400).json({
      error: "apiName and data object are required"
    });
  }

  const keys = Object.keys(data);

  if (keys.length !== 1) {
    return res.status(400).json({
      error: "Exactly one input field is required"
    });
  }

  const value = data[keys[0]]; // extract the ID safely

  const registry = loadRegistry();
  const api = registry[apiName];

  if (!api) {
    return res.status(404).json({ error: "API not found" });
  }

  let connection;

  try {
    connection = await oracledb.getConnection({
      user: api.db.user,
      password: api.db.password,
      connectString: `${api.db.host}:${api.db.port}/${api.db.service}`
    });

    const result = await connection.execute(
      `
      BEGIN SYSTEM.${api.procedure}(
        :value,
        :cursor
      );
      END;
      `,
      {
        value,
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    const rs = result.outBinds.cursor;
    const rows = [];

    let row;
    while ((row = await rs.getRow())) {
      rows.push(row);
    }

    await rs.close();
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
}


module.exports = { executeApi };
