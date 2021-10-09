const express = require('express')
const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@cluster0.ao5g6.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded()); 

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next();
});

app.get('/', function(req, res) {
  res.send();
})

const todoRouter = require('./routes/todo');
app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
