const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.static('build'));
app.use(express.static('data'));
app.use(express.static('icons'));
app.use(express.static('js'));
app.use(express.static('lib'));
app.use(express.static('tasks'));

app.get('/', (req, res) => {
  res.render('play', { heading: 'Play \u2014 Harry Potter Tower Defense' });
});

app.get('/about', (req, res) => {
  res.render('about', { heading: 'About \u2014 Harry Potter Tower Defense' });
});

app.get('*', (req, res) => {
  res.render('404', { heading: '404' });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
