const readUsers = require("../models/users").readUsers;
const writeUsers = require("../models/users").writeUsers;

// const usersForm = (request, response) => {
//   response.render("form");
// };

// const usersList = (request, response) => {
//   const users = readUsers();

//   response.render("list", {
//     users,
//   });
// };

// module.exports = { usersForm, usersList };

class UsersController {
  static usersForm(request, response) {
    response.render("form");
  }

  static usersList(request, response) {
    const users = readUsers();

    response.render("list", {
      users,
    });
  }
}

module.exports = UsersController;
