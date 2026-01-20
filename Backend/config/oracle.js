const oracledb = require("oracledb");

async function getConnection() {
  return oracledb.getConnection({
    user: "system",
    password: "admin",
    connectString: "localhost:1521/XE"
  });
}

module.exports = {
  getConnection
};
