const app = require('../../server.js');

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'homepage',
    page: 'home',
  });
});
