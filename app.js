const express = require('express');
const hbs = require('hbs');
const films = require('./data/films.json');
const tmdb = require('themoviedb-api-client')('you API key');
const bodyParser = require('body-parser')
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

tmdb.searchMovie({ query: 'spiderman' })
    .then(res=>{
         
        console.log(res.body.results)
        console.log(res.body.results[2].title)
    })
  .catch(function(error) {
    console.log(error)
  })

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  const name = 'jose';
  res.render('home', { name })
});

app.get('/films', (req, res, next) => {
  res.render('films', { films })
});

app.get('/apifilms', (req, resul, next) => {
  tmdb.searchMovie({ query: 'spiderman' })
  .then(res=>{
    var films2= res.body.results;
    resul.render('apifilms', { films2 })
      
    
  })
.catch(function(error) {
  console.log(error)
})

  
});

app.post('/apifilms', (req, resul, next) => {
  const data = req.body.name;
   tmdb.searchMovie({ query: data })
    .then(res=>{
        var films2= res.body.results;
        console.log(res.body.results);
        resul.render('apifilms', { films2 })
      
    
  })
.catch(function(error) {
  console.log(error)
})

  
});


app.listen(PORT, () => console.info(`Application listen at port ${PORT}`));
