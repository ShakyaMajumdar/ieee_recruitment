const express = require('express')
const bodyParser = require('body-parser');
const Pool = require('pg').Pool

const app = express()
const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 0,
})
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
  response.sendFile('static/home.html', {root: __dirname})
})

app.post('/register', (request, response) => {
  let name = request.body.name;
  console.log(`name: ${name}`);
  response.send(`registered ${name}`)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
