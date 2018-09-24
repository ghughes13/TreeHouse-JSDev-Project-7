const express = require('express');
const { data } = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get("/", (req, res) => {
  res.render('index', { projects })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get("/project:num", (req, res) => {
  res.render('project', {
    title: projects[req.params.num].project_name,
    desc : projects[req.params.num].description,
    tech : projects[req.params.num].technologies,
    live : projects[req.params.num].live_link,
    git : projects[req.params.num].github_link,
    imgLarge: projects[req.params.num].image_urls[0]
  });
});

app.use((req, res, next) => {
  const err = new Error('Whoops! Something went wrong...');
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  // res.status(err.status);
  res.render('error');
});


app.listen(3000);
