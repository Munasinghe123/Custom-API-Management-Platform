const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config/api-config.json');

function loadRegistry() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveRegistry(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

async function createApi(req, res) {
  try {
    const {
      apiName,
      procedure,
      dbUser,
      dbPassword,
      dbHost,
      dbPort,
      serviceName
    } = req.body;

    if (
      !apiName ||
      !procedure ||
      !dbUser ||
      !dbPassword ||
      !dbHost ||
      !dbPort ||
      !serviceName
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const registry = loadRegistry();

    if (registry[apiName]) {
      return res.status(409).json({ message: 'API already exists' });
    }

    registry[apiName] = {
      procedure,
      db: {
        user: dbUser,
        password: dbPassword,
        host: dbHost,
        port: dbPort,
        service: serviceName
      }
    };

    saveRegistry(registry);

    res.status(201).json({
      message: 'API created successfully',
      api: apiName
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create API' });
  }
}

module.exports = {
  createApi
};
