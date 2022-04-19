const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const { json } = require("express");

const server = jsonServer.create();
const router = jsonServer.router("bd.json");
const middlewares = jsonServer.defaults();

const { userLogin, userRegister } = require("./user.js");

server.use(middlewares);

server.use(json());
server.post("/login", (req, res) => userLogin(req, res, router));
server.post("/register", (req, res) => userRegister(req, res, router));
server.get("/authors/:userId/notes", (req, res) => {
  const { userId } = req.params;
  const token = req.query?.token;

  let userIdFromToken;
  try {
    userIdFromToken = jwt.verify(token, "secret")?.id ?? "";
  } catch (err) {
    userIdFromToken = "";
  }

  const notes = router.db.get("notes").value();

  const userNotes = notes.filter((note) => {
    if (userId == userIdFromToken) {
      return note.authorId === userId;
    } else {
      return note.authorId === userId && note.visibility == "public";
    }
  });

  res.json(userNotes);
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
