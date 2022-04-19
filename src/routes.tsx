import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoteCreation from "./screens/NoteCreation";
import Notes from "./screens/Notes";
import UserPage from "./screens/UserPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="notes" element={<Notes />} />
      <Route path="users/:userId" element={<UserPage />} />
      <Route path="notes/new" element={<NoteCreation />} />
      <Route path="notes/:noteId" element={<NoteCreation />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
