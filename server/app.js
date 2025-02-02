const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const newRouter = require('./routes/newRouter');
const counterRouter = require('./routes/counterRouter');
const slideRouter = require('./routes/slideRouter');
const productRouter = require('./routes/productRouter');
const projectRouter = require('./routes/projectRouter');
const middleSectionRouter = require('./routes/middleSectionRouter');
const valuesSectionRouter = require('./routes/valuesSectionRouter');
const scopeRouter = require('./routes/scopeRouter');
const mediaRouter = require('./routes/mediaRouter');
const seoRouter = require('./routes/seoRouter');

const app = express();

// 🔹 Security Middleware
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use('/api/public', express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());


// 🔹 Logging (Only in Development Mode)
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

// 🔹 Rate Limiting
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again later',
});
app.use('/api', limiter);

// 🔹 Security: Prevent NoSQL Injection & XSS Attacks
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index');
});


app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
// 🔹 API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/edit-website/news', newRouter);
app.use('/api/edit-website/counter', counterRouter);
app.use('/api/edit-website/slide', slideRouter);
app.use('/api/edit-website/products', productRouter);
app.use('/api/edit-website/projects', projectRouter);
app.use('/api/edit-website/middle-section', middleSectionRouter);
app.use('/api/edit-website/values', valuesSectionRouter);
app.use('/api/edit-website/scopes', scopeRouter);
app.use('/api/edit-website/media', mediaRouter);
app.use('/api/seo', seoRouter);


// 🔹 Handle Unknown Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the URL ${req.originalUrl} on this server`, 404));
});

// 🔹 Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
