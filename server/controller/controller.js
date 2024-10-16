var { Userdb, Member, Bookdb } = require('../model/model');

// create and save new user
exports.createUser = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.findUser = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new identified user by user id
exports.updateUser = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.deleteUser = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

// Create and save a member
exports.createMember = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new member
    const member = new Member({
        name : req.body.name,
        address : req.body.address,
        phoneNumber: req.body.phoneNumber,
        email : req.body.email
    })

    // save member in the database
    member
        .save(member)
        .then(data => {
            //res.send(data)
            res.redirect('/add-member');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// Delete a member with specified user id in the request
exports.deleteMember = (req, res)=>{
    const id = req.params.id;

    Member.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Member was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Member with id=" + id
            });
        });
}

// Find Member
exports.findMember = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Member.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found Member with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })
    }
    else if (req.query.limit) {
        const limit = Number(req.query.limit);
        Member.find().limit(limit)
        .then(member => {
            res.send(member)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving Member information" })
        })
    } else {
        Member.find()
            .then(member => {
                res.send(member)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving Member information" })
            })
    }
}

// Update a Member
exports.updateMember = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update Member with ${id}. Maybe member not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update Member information"})
        })
}

// Create and save a book
exports.createBook = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new book
    const book = new Bookdb({
        title : req.body.title,
        author : req.body.author,
        category : req.body.category,
        availableCopies: req.body.availableCopies,
        totalCopies: req.body.totalCopies
    })

    // save book in the database
    book
        .save(book)
        .then(data => {
            //res.send(data)
            res.redirect('/add-book');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// Find book
exports.findBook = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Bookdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found Book with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving book with id " + id})
        })
    }
    else if (req.query.limit) {
        const limit = Number(req.query.limit);
        Bookdb.find().limit(limit)
            .then(book => {
                res.send(book)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving Book information" })
            })
    }
    else{
        Bookdb.find()
            .then(book => {
                res.send(book)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving Book information" })
            })
    }
}

// Update a book 
exports.updateBook = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Bookdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update book with ${id}. Book not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update book information"})
        })
}

// Delete a book 
exports.deleteBook = (req, res)=>{
    const id = req.params.id;

    Bookdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete book with id ${id}. Maybe book id is wrong`})
            }else{
                res.send({
                    message : "Book was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
}