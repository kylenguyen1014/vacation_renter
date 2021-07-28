// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const multer = require('multer');
const { storage, cloudinary } = require('../../cloudinary');
const uploadToCloudinary = multer({ storage: storage});

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // console.log(uploadToCloudinary.array('images'));
    console.log(context.data);
    console.log(context.params);
    // let images = [];
    // try {
    //   for (let image of context.data.images) {
    //     console.log(JSON.stringify(image));
    //     console.log(image);
    //     const result = cloudinary.uploader.upload(image.path, )
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    return context;
  };
};
