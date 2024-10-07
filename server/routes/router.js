const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

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
 *  @description add members
 *  @method GET /add-member
 */
route.get('/member', services.show_member);

/**
 *  @description for update member
 *  @method GET /update-member
 */
route.get('/update-member', services.update_member)

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

module.exports = route;