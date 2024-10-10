const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  });
  
  const Memberv1 = mongoose.model('Memberv1', memberSchema);
  module.exports = Memberv1;