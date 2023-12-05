var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StuffInstanceSchema = new Schema(
  {
    type: {type: String, required: true, minLength: 3, maxLength: 30},
    stuff: { type: Schema.Types.ObjectId, ref: 'Stuff', required: true }, //reference to the associated stuff
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for stuffinstance's URL
StuffInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/stuffInstance/' + this._id;
});

//Export model
module.exports = mongoose.model('StuffInstance', StuffInstanceSchema, 'Inventory-App');
