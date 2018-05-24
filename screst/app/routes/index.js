const tmkRoutes = require('./tmk-routes');

module.exports = function(app, db) {
  tmkRoutes(app,db);
  // Other route groups could go here, in the future
};
