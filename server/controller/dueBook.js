const { Bookdb, Member } = require('../model/model');

exports.findDueBooks = async (req, res) => {
  if (req.query.limit) {
      try {
        const limit = Number(req.query.limit);
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
            return overdueEntries;
        });

        res.status(200).send(dueBooks.flat().slice(0, limit));
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
  }
  else {
    try {
      const currentDate = new Date();

      const Book = await Bookdb.find({
        'issuedTo.dueDate': { $lt: currentDate }
      });

      if (!Book.length) {
          return res.status(200).json();
      }

      const dueBooks = Book.map(book => {
          const overdueEntries = book.issuedTo.filter(issued => issued.dueDate <= currentDate);
          return overdueEntries;
      });

      res.status(200).send(dueBooks.flat());
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};