import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToRequest } from "../molecules/NoteCreationForm";
import notesManager, { ToOptional } from "../services/notes";
import userLogin from "../services/userLogin";
import "./notecreation.css";

export default function NoteCreation() {
  const navigate = useNavigate();
  const params = useParams();

  const [touched, setTouched] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [showError, setShowError] = useState(false);
  const [note, setNote] = useState<Task | undefined>(undefined);
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    if (params.noteId) {
      setCreating(false);
      notesManager.get(params.noteId).then((note) => {
        if (note.state == "done") {
          navigate("/notes");
        }

        setTitle(note.title);
        setDescription(note.description);
        setVisibility(note.visibility);
        setNote(note);
      });
    }
  }, []);

  const saveNote = () => {
    if (!title.length) {
      setShowError(true);
      return;
    }

    const task: ToRequest<Task> = {
      authorId: userLogin.getUser()?.id ?? "",
      state: "todo",
      description,
      title,
      visibility,
    };

    notesManager.create(task);

    navigate("/notes");
  };

  const updateNote = () => {
    if (!title.length) {
      setShowError(true);
      return;
    }

    const task: ToOptional<Task> = {
      ...note,
      ...{ title, description, visibility },
    };
    notesManager.update(task);

    navigate("/notes");
  };

  return (
    <div className="note-creation-container">
      <span>
        Título:
        <input
          value={title}
          onChange={(evt) => {
            if (!touched) setTouched(true);
            setTitle(evt.target.value);
          }}
        />
        {showError && !title.length && (
          <small>Titulo não pode estar em branco!</small>
        )}
      </span>
      <span>
        Descrição:
        <textarea
          value={description}
          onChange={(evt) => {
            if (!touched) setTouched(true);
            setDescription(evt.target.value);
          }}
        ></textarea>
      </span>

      <div className="visibility-container">
        <input
          type="radio"
          name="visibility"
          id="public"
          checked={visibility == "public"}
          onChange={(evt) => {
            if (!touched) setTouched(true);
            setVisibility(evt.target.checked ? "public" : "private");
          }}
        />
        <label htmlFor="public">Pública</label>

        <input
          type="radio"
          name="visibility"
          id="private"
          checked={visibility == "private"}
          onChange={(evt) => {
            if (!touched) setTouched(true);
            setVisibility(evt.target.checked ? "private" : "public");
          }}
        />
        <label htmlFor="private">Privada</label>
      </div>
      <button
        onClick={creating ? saveNote : updateNote}
        className="note-save-btn"
      >
        Salvar nota
      </button>

      <button
        onClick={() => {
          if (touched) {
            const result = window.confirm("Mudanças nao salvas, cancelar?");

            if (result) navigate("/notes");
          } else {
            navigate("/notes");
          }
        }}
        className="note-cancel-btn"
      >
        Cancelar
      </button>
    </div>
  );
}
