// Initializes the `rentals` service on path `/rentals`
const { Rentals } = require('./rentals.class');
const createModel = require('../../models/rentals.model');
const hooks = require('./rentals.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rentals', new Rentals(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rentals');

  service.hooks(hooks);
};
