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

    // Update book and member
    book.availableCopies -= 1;
    book.issuedTo.push(memberId);
    //book.dueDate = calculateDueDate(); // Implement your calculation logic

    await book.save();
    member.borrowedBooks.push(bookId);
    await member.save();

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Function to calculate due date based on library policies
function calculateDueDate() {
  // ... your logic here ...
  return new Date(); // Replace with your calculated date
}