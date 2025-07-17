const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
