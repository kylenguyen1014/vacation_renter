const { authenticate } = require('@feathersjs/authentication').hooks;

const isOwner = require('../../hooks/isOwner');
const populate = require('feathers-populate-hook');

const linkUserToItem = require('../../hooks/link-user-to-item');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), linkUserToItem()],
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
      }
    })],
    find: [],
    get: [],
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
