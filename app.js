const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// START EXPRESS APP
const app = express();

// Implement CORS
app.use(cors());

// COMPRESSION
app.use(compression());
// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// LIMIT request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// BODY PARSER. Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Data sanitizataion against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// ROUTES
app.use('/api/v1/books/', bookRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/reviews/', reviewRouter);
module.exports = app;
