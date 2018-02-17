const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err){
            console.log('unable to write');
        }
    });
/*
    res.render('working.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'welcome to my website'
        
    });
    */
    next();
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs',{
      pageTitle: 'Home page',
      welcomeMessage: 'welcome to my website'
      
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
        
    });
});

app.get('/bad', (req, res) => {
    res.send({
      erroMessage: 'unable to connect'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs',{
      pageTitle: 'this is My portfolio',
      welcomeMessage: 'all my project'
    });
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});