const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const port = 3000;

var users = [];

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", (request, response) => {
  response.render("form");
});

app.get("/users-list", (request, response) => {
  response.render("list", {
    users,
  });
});

app.get("/delete/:index", (request, response) => {
  users.splice(request.params.index, 1);

  response.redirect("/users-list");
});

app.get("/users-edit/:index", (request, response) => {
  const user = users[request.params.index];

  response.render("edit", { user, index: request.params.index });
});

app.post("/edit/:index", (request, response) => {
  users[request.params.index].userName = request.body.userName;
  users[request.params.index].userPhone = request.body.userPhone;

  response.redirect("/users-list");
});

app.post("/submit", (request, response) => {
  users.push(request.body);

  response.redirect("/users-list");
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
