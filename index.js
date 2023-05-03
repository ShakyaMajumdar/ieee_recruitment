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
// app.get('/users', (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// })
app.post('/contact', (request, response, next) => {
  let {name, ieeeId, college, year, team, email, skills} = request.body;
  console.log(request.body)
  pool.query(
    'INSERT INTO users (name, ieee_id, college, year, team, email, skills) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
    [name, ieeeId, college, year, team, email, skills], 
    (error, results) => {
      if (error) {
        next(error);
      }
      response.sendFile('static/acknowledgement.html', {root: __dirname});
  })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
