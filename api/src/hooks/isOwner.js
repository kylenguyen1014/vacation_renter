// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {ObjectId} = require('mongodb');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, id, params, path } = context;
    const user = params.user;

    if (id) {
      let owner;
      if (path !== 'users') {
        const resp = await app.service(path).get(id);
        owner = resp.user;
      } else {
        owner = await app.service(path).get(id);
      }
      if (owner && ObjectId(user._id).toString() !== ObjectId(owner._id).toString() ) {
        throw new Error(`User do not own this ${path}`);
      }
    }

    return context;
  };
};
