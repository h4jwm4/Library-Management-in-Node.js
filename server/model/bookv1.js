const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  status: { type: String, default: 'available' }, // 'available', 'issued'
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  dueDate: Date,
});

const Bookv1 = mongoose.model('Bookv1', bookSchema);
module.exports = Bookv1;