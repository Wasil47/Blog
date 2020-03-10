const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
// set static files, folder public
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req,res)=>{
  res.render('home');
});


app.get('/test', (req,res)=>{
  res.send('test');
});


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}.`);  
});