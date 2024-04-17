const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const specs = require('./config/swagger-config');

const resortRouter = require('./routes/resort-routes');
const reservationRouter = require('./routes/reservation-routes');
const roomsRoutes = require('./routes/rooms-routes');
const employeesRoutes = require('./routes/employees-routes');
const inventory = require('./routes/inventory-routes');
const menuRoutes = require('./routes/menu-routes');
const facilityRoutes = require('./routes/facility-routes');
const reportAnalyticsRoutes = require('./routes/report-analytics-routes');
const authRoutes = require('./routes/auth-route');

const app = express();
const connectToDb = require('./db/DBCon');

// Swagger Setup
// const swaggerDefinition = swaggerJsdoc(specs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
const rootURL = "/api/v1";
app.use(`${rootURL}/guests`, resortRouter);
app.use(`${rootURL}/reservation`, reservationRouter);
app.use(`${rootURL}/rooms`, roomsRoutes);
app.use(`${rootURL}/employees`, employeesRoutes);
app.use(`${rootURL}/inventory`, inventory);
app.use(`${rootURL}/menus`, menuRoutes);
app.use(`${rootURL}/facilities`, facilityRoutes);
app.use(`${rootURL}/report-analytics`, reportAnalyticsRoutes);
app.use(`${rootURL}/auth`, authRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// DB Connection
const dbCon = async () => {
  try {
    await connectToDb();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

dbCon();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
