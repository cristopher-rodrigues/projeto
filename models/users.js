const fs = require("fs");

const FILE_PATH = "./users.json";

const writeUsers = (users) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
  } catch (e) {
    console.log(e); // show user message
  }
};

const readUsers = () => {
  // function readUsers() {
  // const readUsers = function () {
  return JSON.parse(fs.readFileSync(FILE_PATH, { encoding: "utf-8" }));
};

module.exports = { readUsers, writeUsers };
