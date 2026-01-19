require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initOraclePool } = require('./config/oracle')

const apiRoutes = require('./routes/apiController-routes');
const authRoutes= require('./routes/auth-routes');
const adminApiRoutes= require('./routes/adminApi-routes');

const port = process.env.PORT || 7001;
const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    await initOraclePool();
  } catch (err) {
    console.error('Failed to initialize Oracle pool', err);
    process.exit(1); 
  }
})();

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminApiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});