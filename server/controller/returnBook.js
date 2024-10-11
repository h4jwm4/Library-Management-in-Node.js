const { Bookdb, Member } = require('../model/model');

exports.returnBook = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const memberId  = req.query.memberId;
    const serialId  = req.query.serialId;
    
    // Find the book and member
    const book = await Bookdb.findById(bookId);
    const member = await Member.findById(memberId);

    // Check if the book exits and is issued to the member
    if (!book || !member || !book.issuedTo.find(issued => issued.serialId == serialId && issued.memberId.equals(memberId))) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    // Update book
    book.availableCopies++;
    const indexOfMemberId = book.issuedTo.findIndex(issued => issued.serialId == serialId && issued.memberId.equals(memberId));
    if (indexOfMemberId !== -1)
    {
        book.issuedTo.splice(indexOfMemberId, 1);
    }
    await book.save();

    // Update member
    const indexOfBookId = member.borrowedBooks.findIndex(borrowed => borrowed.serialId == serialId && borrowed.bookId.equals(bookId));
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