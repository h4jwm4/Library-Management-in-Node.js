const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
          validator: (value) => {
            // Validate email format
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return emailRegex.test(value);
          },
          message: 'Invalid email format'
        }
    },
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'book'
        },
        serialId: {
            type: Number
        }
      },
    ]
})

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  availableCopies: {
    type: Number,
    default: 0
  },
  totalCopies: {
    type: Number,
    default: 0
  },
  issuedTo: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
      },
      memberName: 
      {
        type: String
      },
      bookId: {
        type: String
      },
      bookTitle: {
        type: String
      },
      dueDate: {
        type: Date
      },
      serialId: {
        type: Number,
        unique: true
      }
    }
  ]
})

const Userdb = mongoose.model('userdb', schema);
const Member = mongoose.model('Member', memberSchema);
const Bookdb = mongoose.model('book', bookSchema);

module.exports = { Userdb, Member, Bookdb };
