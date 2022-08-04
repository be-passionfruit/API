require('dotenv').config();
const express = require('express');
const cors = require('cors');
const registerRoutes = require('./routes');

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));

registerRoutes(app);

app.get('/', (req, res) => {
    res.status(200).json({ping:'pong'});
});

app.use((req, res) => {
    res.status(404).json({error:'Page not Found'});
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});

const closeServer = () => {
    // db.disconnect();
    process.exit();
}

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());