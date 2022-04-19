const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function userLogin(req, res, router) {
  const { email, password } = req.body;

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  try {
    const author = router.db
      .get("authors")
      .value()
      .find(
        (author) => author.email === email && author.password === hashedPassword
      );

    if (!author) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      const { id, name, email } = author;
      const token = jwt.sign({ id }, "secret");

      res.status(200).jsonp({
        user: { id, name, email },
        token,
      });
    }
  } catch (err) {
    res.status(500).jsonp({
      error: err.message,
    });
  }
}

function userRegister(req, res, router) {
  const { name, email, password } = req.body;

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  try {
    const author = router.db
      .get("authors")
      .value()
      .find((author) => author.email === email);

    if (author) {
      res.status(401).json({ error: "Email already exists" });
    } else {
      const newAuthor = {
        id: `${Math.floor(Math.random() * 100_000_000_000)}`,
        name,
        email,
        password: hashedPassword,
      };

      router.db.get("authors").push(newAuthor).write();

      res.status(200).jsonp({
        user: newAuthor,
        token: jwt.sign({ id: newAuthor.id }, "secret"),
      });
    }
  } catch (err) {
    res.status(500).jsonp({
      error: err.message,
    });
  }
}

module.exports = { userLogin, userRegister };
