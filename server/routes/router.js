const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const { issueBook } = require('../controller/issueBook');
const { returnBook } = require('../controller/returnBook');
const { findDueBooks } = require('../controller/dueBook')

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/dashboard', services.dashboardRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

/**
 *  @description add members
 *  @method GET /add-member
 */
route.get('/add-member', services.add_member);

/**
 *  @description show members
 *  @method GET /show-member
 */
route.get('/members', services.show_member);

/**
 *  @description show members details
 *  @method GET /show-member
 */
route.get('/member-details', services.show_member_details);

/**
 *  @description for update member
 *  @method GET /update-member
 */
route.get('/update-member', services.update_member)


/**
 *  @description add book
 *  @method GET /add-book
 */
route.get('/add-book', services.add_book)

/**
 *  @description show book
 *  @method GET /show-book
 */
route.get('/books', services.show_book);

/**
 *  @description show book
 *  @method GET /show-book
 */
route.get('/book-details', services.show_book_details);

/**
 *  @description for update book
 *  @method GET /update-book
 */
route.get('/update-book', services.update_book)

/**
 *  @description show due books
 *  @method GET /show-due-books
 */
route.get('/due-books', services.show_due_books);

/**
 *  @description show book
 *  @method GET /show-book
 */
route.get('/issue-book', services.issue_book);

// API for users
route.post('/api/users', controller.createUser);
route.get('/api/users', controller.findUser);
route.put('/api/users/:id', controller.updateUser);
route.delete('/api/users/:id', controller.deleteUser);

// API Members
route.post('/api/member', controller.createMember);
route.get('/api/member', controller.findMember);
route.put('/api/member/:id', controller.updateMember);
route.delete('/api/member/:id', controller.deleteMember);
route.get('/api/totalMembers', controller.findTotalMembers);

// API Book
route.post('/api/book', controller.createBook);
route.get('/api/book', controller.findBook);
route.put('/api/book/:id', controller.updateBook);
route.delete('/api/book/:id', controller.deleteBook);
route.get('/api/totalBooks', controller.findTotalBooks);
route.get('/api/totalIssuedBooks', controller.findTotalIssuedBooks);

// API Issue Books
route.post('/api/issueBook/:bookId/:memberId', issueBook);

// API Return Books
route.get('/api/returnBook', returnBook);

// API Due Books
route.get('/api/findDueBooks', findDueBooks);

module.exports = route;