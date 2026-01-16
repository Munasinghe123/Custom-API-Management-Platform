const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool;

async function initOraclePool() {
  if (pool) return pool;

  pool = await oracledb.createPool({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SERVICE}`,
    poolMin: 1,
    poolMax: 5,
    poolIncrement: 1
  });

  console.log('Oracle connection pool initialized');
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
