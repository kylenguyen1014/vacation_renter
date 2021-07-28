// rentals-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'rentals';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const ImageSchema = new Schema({
    url: { type: String },
    fileName: { type: String }
  });

  const schema = new Schema({
    name: { type: String, required: true },
    image: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    spec : {
      bed: {
        type: Number,
        required: true,
        min: 1
      },
      bath: {
        type: Number,
        required: true,
        min: 1
      },
    },
    description: {type : String, default: ''},
    user : {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  }, {
    timestamps: true
  });
  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};