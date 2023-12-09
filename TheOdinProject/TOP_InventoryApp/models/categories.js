var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategoriesSchema = new Schema(
  {
    type: {type: String, required: true, minLength: 3, maxLength: 30}, 
    name: {type: String, required: true, minLength: 3, maxLength: 30}
  }
);

// Virtual for categories's URL
CategoriesSchema
.virtual('url')
.get(function () {
  return '/catalog/categories/' + this._id;
});

//Export model
module.exports = mongoose.model('Categories', CategoriesSchema, 'Inventory-App');
