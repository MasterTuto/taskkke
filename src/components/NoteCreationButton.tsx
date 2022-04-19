import React from "react";
import { useNavigate } from "react-router-dom";

import "./notecreationbutton.css";

export default function NoteCreationButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/notes/new")} className="note-add-btn">
      ➕
    </div>
  );
}
