// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { cloudinary } = require('../../cloudinary');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // console.log(context.data);
    // console.log(context.params);
    return context;
    // return {context, images : context.data.images.map(image => ({url: image.path, fileName :image.fileName}))};
  };
};
