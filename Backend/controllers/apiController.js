const oracledb = require("oracledb");
const { getConnection } = require("../config/oracle");

async function getApiConfig(apiName) {
  const conn = await getConnection();

  const result = await conn.execute(
    `
    SELECT
      p.procedure_name,
      d.db_user,
      d.db_password,
      d.db_host,
      d.db_port,
      d.db_service
    FROM procedures p
    JOIN procedure_db_config d
      ON p.procedure_id = d.procedure_id
    WHERE p.api_name = :apiName
      AND p.status = 'ACTIVE'
    `,
    { apiName },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();

  if (result.rows.length === 0) return null;

  return result.rows[0];
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

  const value = data[keys[0]];

  const api = await getApiConfig(apiName);

  if (!api) {
    return res.status(404).json({ error: "API not found or inactive" });
  }

  let connection;

  try {
    connection = await oracledb.getConnection({
      user: api.DB_USER,
      password: api.DB_PASSWORD,
      connectString: `${api.DB_HOST}:${api.DB_PORT}/${api.DB_SERVICE}`
    });

    const result = await connection.execute(
      `
      BEGIN ${api.PROCEDURE_NAME}(
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

async function getAll(req, res) {
  
    const { apiName } = req.params;

    if (!apiName) {
      return res.status(400).json({ error: "apiName is required" });
    }

    const api = await getApiConfig(apiName);

    if (!api) {
      return res.status(404).json({ error: "API not found or inactive" });
    }

    let connection;

    try {
      connection = await oracledb.getConnection({
        user: api.DB_USER,
        password: api.DB_PASSWORD,
        connectString: `${api.DB_HOST}:${api.DB_PORT}/${api.DB_SERVICE}`
      });

      const result = await connection.execute(
        `
      BEGIN ${api.PROCEDURE_NAME}(
        :cursor
      );
      END;
      `,
        {
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

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Database connection failed" });
    } finally {
      if (connection) await connection.close();
    }
}

module.exports = { executeApi, getAll };
