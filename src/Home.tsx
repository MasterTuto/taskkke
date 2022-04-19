import "./Home.css";

import logo from "./logo.png";
import Form from "./templates/Form";
import { useNavigate } from "react-router-dom";
import LoginForm from "./molecules/LoginForm";
import userLogin from "./services/userLogin";
import { useState } from "react";
import { useEffect } from "react";
import LogonForm from "./molecules/LogonForm";

function Home() {
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const [logOnData, setLogOnData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin.isLoggedIn()) {
      navigate("/notes");
    }
  }, [navigate]);

  const onLogIn = () => {
    const { email, password } = logInData;
    if (!email.length || !password.length) return;

    userLogin.login(email, password).then((result) => {
      if (result?.user) {
        console.log(result);
        navigate("/notes");
      } else {
        alert("Verify your credentials!");
      }
    });
  };

  const onLogOn = () => {
    const { email, name, password, passwordConfirmation } = logOnData;
    if (
      !email.length ||
      !name.length ||
      !password.length ||
      passwordConfirmation !== password
    )
      return;

    userLogin.register(name, email, password).then((result) => {
      if (result?.user) {
        navigate("/notes");
      } else {
        alert("An error ocurred, please verify your data");
      }
    });
  };

  const switcher = () => {
    if (login) {
      setLogInData({ email: "", password: "" });
    } else {
      setLogOnData({
        email: "",
        name: "",
        password: "",
        passwordConfirmation: "",
      });
    }
    setLogin(!login);
  };

  return (
    <div className="Home">
      <div className="login-container">
        <img className="header" src={logo} alt="logo" />

        {login ? (
          <Form submitBtnText="Entrar" onSubmit={onLogIn}>
            <LoginForm
              logInData={logInData}
              setLogInData={setLogInData}
              switchForm={switcher}
            />
          </Form>
        ) : (
          <Form submitBtnText="Cadastre-se" onSubmit={onLogOn}>
            <LogonForm
              logOnData={logOnData}
              setLogOnData={setLogOnData}
              switchForm={switcher}
            />
          </Form>
        )}
      </div>
    </div>
  );
}

export default Home;
