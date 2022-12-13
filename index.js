const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const deleteChildren = require("./controllers/children").deleteChildren;
// const usersForm = require("./controllers/users").usersForm;
// const usersList = require("./controllers/users").usersList;
const UsersController = require("./controllers/users");
const readUsers = require("./models/users").readUsers;
const writeUsers = require("./models/users").writeUsers;

const redirectToList = (response) => response.redirect("/users-list");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/delete-children/:index/:childrenIndex", deleteChildren);

app.get("/users-form", UsersController.usersForm);

app.get("/users-edit/:index/new-children", (request, response) => {
  response.render("new-children", { index: request.params.index });
});

app.post("/new-children/:index", (request, response) => {
  const users = readUsers();
  users[request.params.index].children.push(request.body.childrenName);

  writeUsers(users);

  redirectToList(response);
});

app.get("/users-list", UsersController.usersList);

app.get("/delete/:index", (request, response) => {
  const users = readUsers();

  users.splice(request.params.index, 1);

  writeUsers(users);

  redirectToList(response);
});

app.get("/users-edit/:index", (request, response) => {
  const users = readUsers();
  const user = users[request.params.index];

  response.render("edit", { user, index: request.params.index });
});

app.post("/edit/:index", (request, response) => {
  const users = readUsers();

  users[request.params.index].userName = request.body.userName;
  users[request.params.index].userPhone = request.body.userPhone;

  writeUsers(users);

  redirectToList(response);
});

app.post("/submit", (request, response) => {
  const users = readUsers();

  users.push(request.body);

  writeUsers(users);

  redirectToList(response);
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
