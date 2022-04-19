import React, { useState } from "react";
import notes from "../services/notes";
import userLogin from "../services/userLogin";

import "./notecreationform.css";

interface Props {
  onSubmit: (note: Task) => void;
}

type ApplyRequestRule<T, F> = T extends "id"
  ? never
  : F extends string
  ? T extends F
    ? `${F}Id`
    : T
  : T;

export type ToRequest<Type> = {
  [Property in keyof Type as ApplyRequestRule<
    Property,
    "author"
  >]: Type[Property];
};

export default function NoteCreationForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);

  const switchVisibleText = visible ? "🙉" : "🙈";

  const submitNote = async () => {
    const visibility = visible ? "public" : "private";
    const user = userLogin.getUser();
    console.error(user);

    const noteWithoutId: ToRequest<Task> = {
      state: "todo",
      title,
      visibility,
      description: "",
      authorId: user?.id ?? "",
    };

    console.warn(noteWithoutId);

    const note = await notes.create(noteWithoutId);
    console.warn(note);

    onSubmit(note);
    setTitle("");
  };

  return (
    <div className="note-form-container">
      <input
        type="button"
        value={switchVisibleText}
        onClick={() => setVisible(!visible)}
      />
      <input
        type="text"
        className="note-title-container"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            submitNote();
          }
        }}
      />
      <button type="submit" onClick={submitNote}>
        ➕
      </button>
    </div>
  );
}
