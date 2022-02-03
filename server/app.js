const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests.
const dbURI = "mongodb+srv://azizulhasan:azizulhasan@mern.b6fud.mongodb.net/mern?retryWrites=true&w=majority"

// mongodb+srv://hasan:hasan@cluster0.lvsbw.mongodb.net/Cluster0?retryWrites=true&w=majority


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(4000))
  .catch(err => console.log(err));

// register view engine.
app.set('view engine', 'ejs');

// middleware & static files folder declare
app.use(express.static('public'));
/**
 * This middleware is used for recognizing request object as string or array.
 * and "express.json()" function recognize request object as json format.
 */
app.use(express.urlencoded({ extended: true }));
/**
 * This middleware is used to console errors more elegent way.
 */
app.use(morgan('dev'));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

/**
 * Routes start
 */
app.get('/', (req, res) => {
  
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

/**
 * Blog routes start
 */
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});