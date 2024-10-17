const axios = require('axios');


// exports.homeRoutes = (req, res) => {
//     // Make a get request to /api/users
//     axios.get('http://localhost:3000/api/users')
//         .then(function(response){
//             res.render('index', { users : response.data });
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }

exports.homeRoutes = async (req, res) => {
  try {
    const [usersResponse, membersResponse, booksResponse] = await Promise.all([
      axios.get('http://localhost:3000/api/users'),
      axios.get('http://localhost:3000/api/member'),
      axios.get('http://localhost:3000/api/book'),
    ]);

    // Handle successful responses and extract data
    const users = usersResponse.data;
    const members = membersResponse.data;
    const book = booksResponse.data;

    // Render the index template with all fetched data
    res.render('index', { users, members, book });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data.');
  }
};

exports.dashboardRoutes = async (req, res) => {
    try {
      const [usersResponse, membersResponse, booksResponse, dueBooksResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/users'),
        axios.get('http://localhost:3000/api/member?limit=4'),
        axios.get('http://localhost:3000/api/book?limit=4'),
        axios.get('http://localhost:3000/api/findDueBooks?limit=4')
      ]);
  
      // Handle successful responses and extract data
      const users = usersResponse.data;
      const members = membersResponse.data;
      const book = booksResponse.data;
      const dueBooks = dueBooksResponse.data;
  
      // Render the index template with all fetched data
      res.render('dashboard', { users, members, book, dueBooks });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('An error occurred while fetching data.');
    }
  };

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_member = (req, res) => {
    res.render('add_member');
}

exports.show_member = (req, res) => {
    axios.get('http://localhost:3000/api/member')
    .then(function(response){
        res.render('members', { members : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.update_member = (req, res) =>{
    axios.get('http://localhost:3000/api/member', { params : { id : req.query.id }})
        .then(function(memberData){
            res.render("update_member", { member : memberData.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_book = (req, res) =>{
    res.render('add_book');
}

exports.show_book = (req, res) => {
    axios.get('http://localhost:3000/api/book')
    .then(function(response){
        res.render('books', { book : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.update_book = (req, res) =>{
    axios.get('http://localhost:3000/api/book', { params : { id : req.query.id }})
        .then(function(bookData){
            res.render("update_book", { book : bookData.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

