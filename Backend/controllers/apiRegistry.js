const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
}

function executeApi(req, res) {
  const { apiname } = req.params;
  const inputParams = req.body;

  const registry = loadRegistry();

  const key = Object.keys(registry).find(
    k => k.toLowerCase() === apiname.toLowerCase()
  );

  if (!key) {
    return res.status(404).json({ error: 'API not found' });
  }

  return res.json({
    api: key,
    procedure: registry[key].procedure,
    db: registry[key].db,
    receivedParams: inputParams
  });
}


module.exports = {
    loadRegistry, executeApi
}
