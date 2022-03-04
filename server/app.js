const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const path = require('path')

/**
 * Routes
 */
const blogRoutes = require("./routes/blogRoutes");
const heroRoutes = require("./routes/heroRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const summeryRoutes = require("./routes/summeryRoutes");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const contactFormRoutes = require("./routes/contactFormRoutes");
const loginRoutes = require("./routes/loginRoutes");

// express app
const app = express();

app.use(cors());
app.use(express.json());
// connect to mongodb & listen for requests.
const dbURI = process.env.DB_URL
  
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// register view engine.
app.set("view engine", "ejs");

// middleware & static files folder declare
app.use(express.static("public"));
/**
 * This middleware is used for recognizing request object as string or array.
 * and "express.json()" function recognize request object as json format.
 */
app.use(express.urlencoded({ extended: true }));
/**
 * This middleware is used to console errors more elegent way.
 */
app.use(morgan("dev"));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

/**
 * Routes start
 */
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

/**
 * Blog routes start
 */
app.use("/blogs", blogRoutes);

/**
 * Hero Routs
 */
app.use("/api/hero", heroRoutes);

/**
 * About Routes
 */
app.use("/api/about", aboutRoutes);

/**
 * Skills Routes
 */
app.use("/api/skills", skillsRoutes);

/**
 * Summery Routes
 */
app.use("/api/summery", summeryRoutes);

/**
 * Education Routes
 */
app.use("/api/education", educationRoutes);
/**
 * Experience Routes
 */
app.use("/api/experience", experienceRoutes);

/**
 * Experience Routes
 */
app.use("/api/contact", contactRoutes);
/**
 * Contact form Routes
 */
 app.use("/api/contact_form", contactFormRoutes);
 /**
 * Login Routes
 */
  app.use("/api/login", loginRoutes);

app.post("/api/test", (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

/**
 * Read file from url
 */
app.use('/uploads', express.static(__dirname + '/uploads'));



// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} else {
  
  app.get('/', (req, res) => res.send('Please set to production'))
}

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
