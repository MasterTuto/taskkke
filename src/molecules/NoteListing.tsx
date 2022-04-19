import React from "react";
import NoteItem from "../components/NoteItem";
import "./notelisting.css";

interface Props {
  data: Task[];
  deleteNote: (noteId: string) => void;
  readonly?: boolean;
}

export default function NoteListing({ data, deleteNote, readonly }: Props) {
  return (
    <div className="note-listing-container">
      {data.length ? (
        data.map((note) => {
          return (
            <NoteItem
              note={note}
              onRemove={deleteNote}
              key={note.id}
              readonly={readonly}
            />
          );
        })
      ) : (
        <h3>Não existem notas cadastradas</h3>
      )}
    </div>
  );
}
