// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const {  app, method, result } = context;

    const addRating = async rental => {
      const rating = await app.service('reviews').Model.aggregate([
        {$match : {rental : rental._id }},
        {$group: {
          _id: '$rental',
          rating: {$avg: '$rating'}
        }}
      ]);

      return {
        ...rental,
        rating: rating[0] ? rating[0].rating : ''
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addRating));
    } else {
      context.result = await addRating(result);
    }

    return context;
  };
};
