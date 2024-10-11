const { Bookdb, Member } = require('../model/model');

exports.issueBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const memberId  = req.params.memberId;
    
    // Find the book and member
    const book = await Bookdb.findById(bookId);
    const member = await Member.findById(memberId);

    // Check if the book is available
    if (book.availableCopies == 0) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    const issuedToData = {
      memberId: memberId,
      dueDate: calculateDueDate(),
      serialId: await getSerialId(memberId)
    };

    const borrowedBooksData = {
      bookId: bookId,
      serialId: await getSerialId(memberId)
    };

    // Update book and member
    await book.issuedTo.push(issuedToData);
    book.availableCopies -= 1;
    await book.save();

    await member.borrowedBooks.push(borrowedBooksData);
    await member.save();

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Function to calculate due date based on library policies
function calculateDueDate() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 3);
  return currentDate;
}

// Generate serial id
async function getSerialId(memberId) {
  const member = await Member.findById(memberId);
  const borrowedBooks = member.borrowedBooks;
  // Increment the serialId
  const newSerialId = borrowedBooks.length + 1;
  return newSerialId;
}