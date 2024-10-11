const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const { issueBook } = require('../controller/issueBook');
const { returnBook } = require('../controller/returnBook');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

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
route.get('/member', services.show_member);

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
route.get('/book', services.show_book);

/**
 *  @description for update book
 *  @method GET /update-book
 */
route.get('/update-book', services.update_book)

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

// API Book
route.post('/api/book', controller.createBook);
route.get('/api/book', controller.findBook);
route.put('/api/book/:id', controller.updateBook);
route.delete('/api/book/:id', controller.deleteBook);

// API Issue Books
route.post('/api/issueBook/:bookId/:memberId', issueBook);

// API Return Books
route.get('/api/returnBook', returnBook);

module.exports = route;