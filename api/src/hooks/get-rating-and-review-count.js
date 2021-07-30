// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const {  app, method, result } = context;

    const addRating = async rental => {
      const ratingAndReviewCount = await app.service('reviews').Model.aggregate([
        {$match : {rental : rental._id }},
        {$group: {
          _id: '$rental',
          reviewCount : { $sum: 1 },
          rating: {$avg: '$rating'},
        }}
      ]);
      return {
        ...rental,
        rating: ratingAndReviewCount[0] ? ratingAndReviewCount[0].rating : '',
        numberReviews: ratingAndReviewCount[0] ? ratingAndReviewCount[0].reviewCount : 0,
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
