import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCreationButton from "../components/NoteCreationButton";
import NoteCreationForm from "../molecules/NoteCreationForm";
import NoteListing from "../molecules/NoteListing";
import notesManager from "../services/notes";
import userLogin from "../services/userLogin";

import "./notes.css";

export default function Notes() {
  const [notes, setNotes] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin.isLoggedIn()) {
      navigate("/");
    }

    const user = userLogin.getUser();
    if (user) {
      console.log(user);
      notesManager.fromUser(user.id).then((n) => setNotes(n));
    }
  }, [navigate]);

  const addNote = (note: Task) => {
    setNotes([...notes, note]);
  };

  const removeNote = (noteId: string) => {
    notesManager.delete(noteId).then((succ) => {
      if (succ) {
        const newNotes = [...notes];
        const noteIndex = newNotes.findIndex((note) => note.id === noteId);
        newNotes.splice(noteIndex, 1);

        setNotes(newNotes);
      }
    });
  };

  return (
    <div className="notes-container">
      <NoteListing data={notes} deleteNote={removeNote} />

      <NoteCreationButton />
    </div>
  );
}
