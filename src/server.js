const express = require('express');
const expHbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 8023);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'become',
    resave: true,
    saveUninitialized: true
}));

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server initialization
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});