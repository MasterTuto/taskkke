const jwt = require("jsonwebtoken");

function notesFromUser(req, res, router) {
  const { userId } = req.params;
  const notes = router.db.get("notes").value();

  const userNotes = notes.filter(
    (note) => note.authorId === userId && note.visibility == "public"
  );

  res.json(userNotes);
}
