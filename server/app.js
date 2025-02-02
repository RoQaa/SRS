const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
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
app.use(helmet());
app.use(cors());
app.options('*', cors());

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
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

// 🔹 Serve Public Files (Images, etc.)
app.use('/api/public', express.static(path.join(__dirname, 'public')));

// 🔹 Test API Route
app.get('/api', (req, res) => {
  res.send('Hello World');
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

// 🔹 Serve Next.js Frontend
const frontendPath = path.join(__dirname,`${process.env.FRONT_PATH}`);
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'en.html'));
});

// 🔹 Handle Unknown Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the URL ${req.originalUrl} on this server`, 404));
});

// 🔹 Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
