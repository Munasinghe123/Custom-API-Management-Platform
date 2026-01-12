const express = require('express');
require('dotenv').config();
const cors = require('cors');

const apiRoutes = require('./routes/apiRegistry-routes');

const port = process.env.PORT || 7001;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api',apiRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});