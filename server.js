const express = require('express');
const session = require('express-session');

let app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'counterific',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', function(request, response){
    request.session.page_views++;
    response.render('index');
})

app.post('/result', function(request, response){
    response.render('result',{
        name: request.body.name,
        location: request.body.location,
        language: request.body.language,
        comment: request.body.comments
    });
})

app.get('/', function(request, response){
    response.redirect('/');
})

app.listen(8000, function(){
    console.log('Listening on port 8000');
})