require('dotenv').config();

const express = require('express');
const cors = require('cors');


const apiRoutes = require('./routes/apiController-routes');
const authRoutes= require('./routes/auth-routes');
const adminApiRoutes= require('./routes/adminApi-routes');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());


app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminApiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});