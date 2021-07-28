// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // const { images } = context.data;
    const user = context.params.user;
    context.data.user = user._id;
    return context;
  };
};
