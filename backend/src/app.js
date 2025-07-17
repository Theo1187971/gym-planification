const express = require('express');
const cors = require('cors');
const connection = require('./databaseConexion/dbConnexion');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

connection.on('error', (err) => {
  console.error(err);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
