const { getConnection } = require('../config/oracle');

async function createApi(req, res) {
  const {
    apiName,
    httpMethod,
    procedure,
    dbUser,
    dbPassword,
    dbHost,
    dbPort,
    serviceName
  } = req.body;

  console.log("CREATE API BODY:", req.body);


  if (
    !apiName ||
    !httpMethod ||
    !procedure ||
    !dbUser ||
    !dbPassword ||
    !dbHost ||
    !dbPort ||
    !serviceName
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let conn;

  try {
    conn = await getConnection();

    // 1Check if API already exists
    const exists = await conn.execute(
      `SELECT 1 FROM procedures WHERE api_name = :apiName`,
      { apiName }
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'API already exists' });
    }

    //  Insert into procedures
    const oracledb = require('oracledb');

    const procResult = await conn.execute(
      `
  INSERT INTO procedures (api_name, procedure_name, status)
  VALUES (:apiName, :procedure, 'ACTIVE')
  RETURNING procedure_id INTO :id
  `,
      {
        apiName,
        procedure,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );


    const procedureId = procResult.outBinds.id[0];

    //  Insert DB config
    await conn.execute(
      `
      INSERT INTO procedure_db_config (
        procedure_id,
        db_httpMethod,
        db_user,
        db_password,
        db_host,
        db_port,
        db_service
      )
      VALUES (
        :procedureId,
        :httpMethod,
        :dbUser,
        :dbPassword,
        :dbHost,
        :dbPort,
        :serviceName
      )
      `,
      {
        procedureId,
        httpMethod,
        dbUser,
        dbPassword,
        dbHost,
        dbPort,
        serviceName
      }
    );

    await conn.commit();

    res.status(201).json({
      message: 'API created successfully',
      apiName
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create API' });
  } finally {
    if (conn) await conn.close();
  }
}


async function getApis(req, res) {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT
        p.api_name,
        p.procedure_name,
        d.db_user,
        d.db_host,
        d.db_port,
        d.db_service,
        p.status
      FROM procedures p
      JOIN procedure_db_config d
        ON p.procedure_id = d.procedure_id
      ORDER BY p.api_name
      `,
      {},
      { outFormat: conn.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load APIs' });
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  createApi,
  getApis
};
