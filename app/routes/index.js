const app = require('../../server.js');

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Survey',
    page: 'survey',
  });
});

app.get('/survey/question-1', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Survey',
    page: 'age',
  });
});

app.get('/survey/question-2', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Survey',
    page: 'height',
  });
});

app.get('/survey/question-3', (req, res) => {
  res.render('index', {
    pageTitle: 'Improve - Survey',
    page: 'weight',
  });
});
