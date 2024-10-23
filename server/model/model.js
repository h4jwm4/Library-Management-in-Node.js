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
    phoneNumber: {
      type: String,
      unique: true, // Ensure phone numbers are unique
      required: true, // Make it a required field
      validate: {
          validator: (value) => {
              // Validate phone number format (optional)
              const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Example: E.164 format
              return phoneRegex.test(value);
          },
          message: 'Invalid phone number format'
      }
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
        bookTitle: {
          type: String
        },
        author: {
          type: String
        },
        dueDate: {
          type: Date
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
      memberName: {
        type: String
      },
      memberEmail: {
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
        type: Number
      }
    }
  ]
})

const Userdb = mongoose.model('userdb', schema);
const Member = mongoose.model('Member', memberSchema);
const Bookdb = mongoose.model('book', bookSchema);

module.exports = { Userdb, Member, Bookdb };
