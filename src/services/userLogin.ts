import { apiUrl } from "../api";

type LoginResponse = {
  user: User;
  token: string;
};

const userLogin = {
  user: undefined as User | undefined,
  async login(email: string, password: string) {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result: LoginResponse = await response.json();

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    this.user = result.user;

    return result;
  },
  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result: LoginResponse = await response.json();

    localStorage.setItem("token", result.token);

    return result;
  },
  isLoggedIn() {
    return !!localStorage.getItem("token");
  },
  getUser() {
    if (this.isLoggedIn()) {
      if (!this.user) {
        const user = localStorage.getItem("user");
        if (user) {
          this.user = JSON.parse(user);
        }
      } else {
        return this.user;
      }
    }
  },
};

export default userLogin;
