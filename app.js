// load config.env data into process.env
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

// Web server config
const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const createError = require('http-errors');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const indexRouter = require('./src/routes/index');
const itemsRouter = require('./src/routes/items');
const updateInventoryRouter = require('./src/routes/update_inventory');
const exportDataRouter = require('./src/routes/export_data')

app.use('/', indexRouter(db));
app.use('/add_item', itemsRouter(db));
app.use('/update_inventory', updateInventoryRouter(db));
app.use('/export_data', exportDataRouter(db))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});



module.exports = app;
