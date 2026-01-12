const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, "../config/api-config.json");

function loadRegistry() {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
}

const getApiConfig = (req, res) => {
    const { apiName } = req.params;

    const registry = loadRegistry();

    const key = Object.keys(registry).find(
        k => k.toLowerCase() === apiName.toLowerCase()
    );

    if (!key) {
        return res.status(404).json({ error: 'API not found' });
    }

    return res.json(registry[key]);
}

module.exports = {
    loadRegistry, getApiConfig
}
