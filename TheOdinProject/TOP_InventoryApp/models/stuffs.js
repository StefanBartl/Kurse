var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StuffsSchema = new Schema(
  {
    type: {type: String, required: true, minLength: 3, maxLength: 30},
    category_type: {type: String, required: true, maxLength: 30},
  }
);

// Virtual for guitar's URL
StuffsSchema
.virtual('url')
.get(function () {
  return '/catalog/stuffs/' + this._id;
});

//Export model
module.exports = mongoose.model('Stuffs', StuffsSchema, 'Inventory-App');
