import { apiUrl } from "../api";
import { ToRequest } from "../molecules/NoteCreationForm";

export type ToOptional<Type> = {
  [Key in keyof Type]?: Type[Key];
};

const notesManager = {
  async create(note: ToRequest<Task>) {
    const token = localStorage.getItem("token");

    const resp = await fetch(
      `${apiUrl}/authors/${note.authorId}/notes?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );
    const respJson = await resp.json();

    return respJson as Task;
  },
  async fromUser(userId: string) {
    const token = localStorage.getItem("token");

    const resp = await fetch(
      `${apiUrl}/authors/${userId}/notes` + (token ? `?token=${token}` : "")
    );
    const respJson = await resp.json();
    console.log(respJson);

    return respJson as Task[];
  },
  async setState(note: Task, checked: boolean) {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${apiUrl}/notes/${note.id}?token=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: checked ? "done" : "todo" }),
    });
    const respJson = await resp.json();

    return respJson as Task;
  },
  async delete(noteId: string) {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${apiUrl}/notes/${noteId}?token=${token}`, {
      method: "DELETE",
    });

    return resp.ok && resp.status === 200;
  },
  async get(noteId: string) {
    const token = localStorage.getItem("token");

    const resp = await fetch(
      `${apiUrl}/notes/${noteId}` + (token ? `?token=${token}` : "")
    );
    const respJson = await resp.json();

    return respJson as Task;
  },
  async update(note: ToOptional<Task>) {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${apiUrl}/notes/${note.id}?token=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const respJson = await resp.json();

    return respJson as Task;
  },
};

export default notesManager;
