const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const populate = require('feathers-populate-hook');
const isOwner = require('../../hooks/isOwner');

module.exports = {
  before: {
    all: [],
    find: [ ],
    get: [ ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt'), isOwner() ],
    patch: [ hashPassword('password'),  authenticate('jwt') , isOwner()],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
