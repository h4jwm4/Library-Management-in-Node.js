const { Bookdb, Member } = require('../model/model');

exports.returnBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const memberId  = req.params.memberId;
    
    // Find the book and member
    const book = await Bookdb.findById(bookId);
    const member = await Member.findById(memberId);

    // Check if the book is issued
    if (!book || book.issuedTo.includes(bookId)) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    // Update book
    book.availableCopies += 1;
    const indexOfMemberId = book.issuedTo.filter(id => id == memberId);
    if (indexOfMemberId !== -1)
    {
        book.issuedTo.splice(indexOfMemberId, 1);
    }
    await book.save();

    // Update member
    const indexOfBookId = member.borrowedBooks.findIndex(id => id == bookId);
    if (indexOfBookId !== -1) {
      member.borrowedBooks.splice(indexOfBookId, 1);
    }
    await member.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};