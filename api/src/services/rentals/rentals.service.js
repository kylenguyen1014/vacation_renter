// Initializes the `rentals` service on path `/rentals`
const { Rentals } = require('./rentals.class');
const createModel = require('../../models/rentals.model');
const hooks = require('./rentals.hooks');

const multer = require('multer');
const { storage } = require('../../../cloudinary');
// const uploadToCloudinary = multer({ dest: 'uploads/' });
const uploadToCloudinary = multer({ storage: storage });

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  // app.use('/rentals', new Rentals(options, app));
  app.use('/rentals',
    // authenticate('jwt'),
    uploadToCloudinary.array('images'),
    (req, res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        req.body.geometry = JSON.parse(req.body.geometry);
        req.body.spec = JSON.parse(req.body.spec);
        req.body.images = req.files.map(file => ({url : file.path, fileName: file.filename}));
      }
      next();
    }, new Rentals(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rentals');

  service.hooks(hooks);
};
