import React from "react";
import { useNavigate } from "react-router-dom";
import userLogin from "../services/userLogin";
import "./header.css";

import logo from "../logo.png";

export default function Header() {
  const navigate = useNavigate();

  const logOut = () => {
    userLogin.logout();
    navigate("/");
  };

  if (userLogin.isLoggedIn()) {
    return (
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <h4>
          Seja bem-vindo, {userLogin.getUser()?.name ?? "visitante"}. Deseja{" "}
          <span className="sairBtn" onClick={logOut}>
            sair
          </span>
          ?
        </h4>
      </div>
    );
  } else {
    return (
      <div className="header">
        <h3>Nao logado! </h3>
      </div>
    );
  }
}
