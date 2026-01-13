const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool;

async function initOraclePool(dbConfig) {
  if (pool) return pool;

  pool = await oracledb.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: `${dbConfig.host}:${dbConfig.port}/${dbConfig.service}`,
    poolMin: 1,
    poolMax: 5,
    poolIncrement: 1
  });

  console.log('Oracle connection pool created');
  return pool;
}

async function getConnection() {
  if (!pool) {
    throw new Error('Oracle pool not initialized');
  }
  return pool.getConnection();
}

module.exports = {
  initOraclePool,
  getConnection
};
