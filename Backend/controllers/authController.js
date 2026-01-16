const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/oracle');
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  try {
    const { emp_name, password } = req.body;

    if (!emp_name || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const connection = await getConnection();

    const result = await connection.execute(
      `
      SELECT emp_name, password_hash, role, status
      FROM employees
      WHERE emp_name = :emp_name
      `,
      { emp_name }
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No such user' });
    }

    const { EMP_NO,
      EMP_NAME,
      PASSWORD_HASH,
      ROLE,
      STATUS } = result.rows[0];

    if (STATUS !== 'ACTIVE') {
      return res.status(403).json({ message: 'User is inactive' });
    }

    const isMatch = await bcrypt.compare(password, PASSWORD_HASH);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { EMP_NO, ROLE },
      process.env.JWT_SECRET,
      { expiresIn: '7h' }
    );

    console.log("login successful");

    res.status(200).json({ accessToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const register = async (req, res) => {
  try {
    const { emp_name, password } = req.body;

    if (!emp_name || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hash = await bcrypt.hash(password, 10);

    const connection = await getConnection();

    const result = await connection.execute(
      `
      INSERT INTO employees (
        emp_no, emp_name, password_hash, role, status
      )
      VALUES (
        emp_no_seq.NEXTVAL, :emp_name, :password_hash, :role, :status
      )
      RETURNING emp_no INTO :emp_no
      `,
      {
        emp_name,
        password_hash: hash,
        role: 'USER',
        status: 'ACTIVE',
        emp_no: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER }
      },
      { autoCommit: true }
    );

    await connection.close();

    res.status(201).json({
      message: 'User registered successfully',
      emp_no: result.outBinds.emp_no[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, register };
