// Load dependencies
const util = require('util');
const express = require('express');
const expressValidator = require('express-validator');
const path = require('path');

// Initialize http server
const app = module.exports = express();

// App server listen to dynamic port or 3000
app.set('port', process.env.PORT || 3300);

// Serve static ressources
app.use(express.static(`${path.resolve()}/dist`));

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set views directory
app.set('views', `${path.resolve()}/app/views`);

// Routes
require('./app/routes/index');

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// Start the app server
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
