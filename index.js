require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const Pool = require('pg').Pool

const app = express()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'))

app.get('/', (request, response) => {
  response.sendFile('static/home.html', {root: __dirname})
})
app.get('/users', (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})
app.post('/register', (request, response) => {
  let name = request.body.name;
  pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name], (error, results) => {
    if (error) {
      throw error;
    }
    response.send('registered successfully');
  })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
