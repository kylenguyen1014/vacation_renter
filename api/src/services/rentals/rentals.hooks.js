const { authenticate } = require('@feathersjs/authentication').hooks;

const populate = require('feathers-populate-hook');
const isOwner = require('../../hooks/isOwner');

const linkUserToItem = require('../../hooks/link-user-to-item');


const getRating = require('../../hooks/get-rating');


module.exports = {
  before: {
    all: [ populate.compatibility() ],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      linkUserToItem(),
    ],
    update: [authenticate('jwt'), isOwner()],
    patch: [authenticate('jwt'), isOwner()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [populate({
      user: {
        service: 'users',
        f_key: '_id',
        one: true,
        query: {
          $select: ['_id', 'firstName', 'lastName', 'email']
        }
      },
    })],
    find: [getRating()],
    get: [getRating()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
