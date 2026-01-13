const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { initOraclePool } = require('./config/oracle')
const registry = require('./config/api-config.json');

const apiRoutes = require('./routes/apiRegistry-routes');

const port = process.env.PORT || 7001;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);


(async () => {

  const firstApi = Object.values(registry)[0];

  if (!firstApi) {
    console.warn('No APIs found to initialize Oracle pool');
    return;
  }

  await initOraclePool(firstApi.db);
})();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});