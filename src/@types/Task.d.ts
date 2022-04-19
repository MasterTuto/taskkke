type Task = {
  id: string;
  title: string;
  description: string;
  state: "done" | "todo";
  visibility: "public" | "private";
  author: string;
};
