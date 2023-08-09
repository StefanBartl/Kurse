var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AmpSchema = new Schema(
  {
    type: {type: String, required: true, minLength: 3, maxLength: 30}, 
    name: {type: String, required: true, maxLength: 30},
    manufactor: {type: String, required: true, maxLength: 30},
    description: {type: String, required: true, maxLength: 300},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: [{type: Schema.Types.ObjectId, ref: 'Categories'}],
  }
);

// Virtual for amp's URL
AmpSchema
.virtual('url')
.get(function () {
  return '/catalog/amp/' + this._id;
});

//Export model
module.exports = mongoose.model('Amp', AmpSchema, 'Inventory-App');
