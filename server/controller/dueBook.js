const { Bookdb, Member } = require('../model/model');

exports.findDueBooks = async (req, res) => {
  try {
    const currentDate = new Date();

    const Book = await Bookdb.find({
      'issuedTo.dueDate': { $lt: currentDate }
    });

    if (!Book.length) {
        return res.status(404).json({
          message: "No books are due today or overdue."
        });
    }

    const dueBooks = Book.map(book => {
        const overdueEntries = book.issuedTo.filter(issued => issued.dueDate <= currentDate);

        return {
            _id: book._id,
            title: book.title,
            author: book.author,
            overdueIssuedTo: overdueEntries
        }
    });

    res.status(200).json({
        message: "Overdue books:",
        books: dueBooks
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};