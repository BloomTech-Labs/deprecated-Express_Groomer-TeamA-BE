const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const animalRouter = require('./animal/animalRouter');
const serviceRouter = require('./service/serviceRouter');
const animalServiceRouter = require('./animal_service/animalServiceRouter');
const locationRouter = require('./location/locationRouter');
const locationServiceRouter = require('./location_service/locationServiceRouter');
const customerPetRouter = require('./customer_pet/customerPetRouter');
const groomerSearchRouter = require('./groomer_search/groomerSearchRouter');
const appointmentsRouter = require('./appointments/appointmentsRouter');
const businessProfileRouter = require('./business_profile/businessProfileRouter');
const certificationsRouter = require('./certifications/certificationsRouter');

const app = express();

app.use(cors());

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use(['/animal', '/animals'], animalRouter);
app.use(['/service', '/services'], serviceRouter);
app.use(['/animalservice', '/animalservices'], animalServiceRouter);
app.use(['/location', '/locations'], locationRouter);
app.use(['/locationservice', '/locationservices'], locationServiceRouter);
app.use(['/customerPet', '/customerPets'], customerPetRouter);
app.use('/groomerSearch', groomerSearchRouter);
app.use(['appointment', '/appointments'], appointmentsRouter);
app.use(['/businessProfile', '/businessProfiles'], businessProfileRouter);
app.use('/certifications', certificationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
