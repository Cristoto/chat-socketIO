const express = require('express');
const path = require('path');
const routes = require('./routes');
const exhbs = require('express-handlebars');
const morgan = require('morgan');

const app = express();

//Settings
app.set('port', 3000 || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.us

//Middleware
app.use(morgan('dev'));

//Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/index'));

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server running on port:', app.get('port'));
});