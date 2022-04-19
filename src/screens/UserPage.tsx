import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteListing from "../molecules/NoteListing";
import notesManager from "../services/notes";
import userLogin from "../services/userLogin";

import "./userpage.css";

export default function UserPage() {
  const [notes, setNotes] = useState<Task[]>([]);
  const params = useParams() as unknown as { userId: string };
  const navigate = useNavigate();

  if (!userLogin.isLoggedIn()) navigate("/");

  const sameUser = params.userId === userLogin.getUser()?.id;

  useEffect(() => {
    notesManager.fromUser(params.userId).then((notes) => setNotes(notes));
  }, [params.userId]);

  return (
    <div className="user-page-container">
      <h2>Notas do usuário {params.userId}</h2>
      <NoteListing data={notes} deleteNote={() => {}} readonly={!sameUser} />
    </div>
  );
}
