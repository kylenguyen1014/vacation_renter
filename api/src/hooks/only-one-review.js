// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { params, app, data } = context;
    const user = params.user;
    if (!data.rental) {
      throw new BadRequest('Rental id is required to leave a review.');
    }
    const reviews = await app.service('reviews').find({ query : {user : user, rental: data.rental}});

    if (reviews.total > 0) {
      throw new BadRequest('User has already left a review for this rental.');
    }

    return context;
  };
};
