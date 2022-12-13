const readUsers = require("../models/users").readUsers;
const writeUsers = require("../models/users").writeUsers;

const deleteChildren = (request, response) => {
  const users = readUsers();

  users[request.params.index].children.splice(request.params.childrenIndex, 1);

  writeUsers(users);

  // redirectToList(response);

  response.redirect("/users-list");
};

module.exports = { deleteChildren };
