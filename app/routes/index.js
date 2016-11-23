const app = require('../../server.js');

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Survey',
    page: 'survey',
  });
});

app.get('/home', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Home',
    page: 'home',
  });
});
