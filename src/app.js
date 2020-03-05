const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const upload = require('express-fileupload')
const path = require('path')

//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'ene',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(flash())

app.use(upload())

//configs

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 4000)

//Global variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//routes

app.use('/', require('./routes/test.routes'))

//Static files

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app



