import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notesManager from "../services/notes";
import "./noteitem.css";

interface Props {
  note: Task;
  onRemove: (noteId: string) => void;
  readonly?: boolean;
}

export default function NoteItem({ note, onRemove, readonly }: Props) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(note.title);
  const [title, setTitle] = useState(note.title);
  const [done, setDone] = useState(note.state === "done");

  const visibilityTranslate = {
    public: "pública",
    private: "privada",
  };

  const noteClasses = "note-data " + (done ? "done" : "");
  const visibilityChipBackground = "";
  // note.visibility == "private" ? "red" : "green";

  const configureDone = (newValue: boolean) => {
    notesManager.setState(note, newValue).then((result) => {
      if (result) setDone(newValue);
    });
  };

  const saveTitle = () => {
    notesManager.update({ ...note, title: tempTitle }).then((res) => {
      if (res) setTitle(tempTitle);
    });
  };

  return (
    <div
      className="note-container"
      key={note.id}
      onClick={() => {
        if (!done) navigate(`/notes/${note.id}`, { state: note });
      }}
      onDoubleClick={() => configureDone(!done)}
    >
      {!readonly && (
        <input
          type="checkbox"
          checked={done}
          onClick={(e) => e.stopPropagation()}
          onChange={(evt) => configureDone(evt.target.checked)}
        />
      )}
      <div className={noteClasses}>
        {isEditing ? (
          <input
            value={tempTitle}
            onClick={(evt) => evt.stopPropagation()}
            onKeyDown={(evt) => {
              if (evt.key == "Enter") {
                saveTitle();
              }
            }}
            onChange={(evt) => setTempTitle(evt.target.value)}
          />
        ) : (
          <span className="note-title">{title}</span>
        )}

        <div
          className="note-visibility"
          style={{ backgroundColor: visibilityChipBackground }}
        >
          <div className="left"></div>
          <span>{visibilityTranslate[note.visibility]}</span>
          <div className="right"></div>
        </div>
      </div>

      {!done && (
        <button
          onClick={(evt) => {
            evt.stopPropagation();
            if (isEditing) {
              saveTitle();
            }
            setIsEditing(!isEditing);
          }}
          className="note-btn"
        >
          {isEditing ? "✅" : "✏️"}
        </button>
      )}

      {!readonly && (
        <button
          onClick={(evt) => {
            evt.stopPropagation();
            onRemove(note.id);
          }}
          className="note-btn"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
