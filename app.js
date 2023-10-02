const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import the PostgreSQL library

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'postgres', // Update host to the service name defined in Docker Compose
    database: 'postgres',
    password: 'pass', // Use the password you set when running the Docker container
    port: 5432,
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
    const name = req.body.name;
    try {
        // Insert the submitted name into the database
        const insertQuery = 'INSERT INTO names (name) VALUES ($1)';
        await pool.query(insertQuery, [name]);
        res.send(`Hello, ${name}! Your name has been submitted and saved.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while saving your name.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
