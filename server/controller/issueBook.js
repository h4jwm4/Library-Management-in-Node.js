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

    const dueDate = calculateDueDate();
    const serialId = await getSerialId(memberId);
    const issuedToData = {
      memberId: memberId,
      memberName: member.name,
      memberEmail: member.email,
      bookId: book._id,
      bookTitle: book.title,
      dueDate: dueDate,
      serialId: await getSerialId(memberId)
    };

    const borrowedBooksData = {
      bookId: bookId,
      bookTitle: book.title,
      author: book.author,
      dueDate: dueDate,
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
  if (member.borrowedBooks.length == 0)
  {
    // Return serial id as 1 because there are no records
    return 1;
  }
  else {
    const serialId = member.borrowedBooks.pop().serialId;
    // Increment the serialId and return 0 if the borrowed books is empty
    const newSerialId = serialId ? serialId + 1 : 0;
    return newSerialId;
  }  
}