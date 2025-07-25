const express = require('express');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
console.log('__dirname =', __dirname);
app.use('/backend/avatar', express.static(path.join(__dirname, '../avatar'))); //Route for the uploading of avatar


app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
