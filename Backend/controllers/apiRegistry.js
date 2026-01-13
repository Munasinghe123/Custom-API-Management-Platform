const fs = require('fs');
const path = require('path');
const { getConnection } = require('../config/oracle')


const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
}

async  function executeApi (req, res){
  const { apiname } = req.params;
  const inputParams = req.body;

  const registry = loadRegistry();

  const key = Object.keys(registry).find(
    k => k.toLowerCase() === apiname.toLowerCase()
  );
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `BEGIN ${apiConfig.procedure}(:emp_id); END;`,
      inputParams
    );

    res.json(result.rows || []);

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
