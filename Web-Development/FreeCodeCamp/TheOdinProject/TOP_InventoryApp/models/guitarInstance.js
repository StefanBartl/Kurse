var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuitarInstanceSchema = new Schema(
  {
    type: {type: String, required: true, minLength: 3, maxLength: 30},
    guitar: { type: Schema.Types.ObjectId, ref: 'Guitar', required: true }, //reference to the associated guitar
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for guitarinstance's URL
GuitarInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/guitarInstance/' + this._id;
});

//Export model
module.exports = mongoose.model('GuitarInstance', GuitarInstanceSchema, 'Inventory-App');
