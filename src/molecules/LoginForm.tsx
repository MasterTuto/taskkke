import React from "react";
import Input from "../components/Input";

interface Pair {
  email: string;
  password: string;
}

interface Props {
  logInData: Pair;
  setLogInData: (p: Pair) => void;
  switchForm: () => void;
}

export default function LogonForm({
  logInData,
  setLogInData,
  switchForm,
}: Props) {
  return (
    <>
      <Input
        id="email"
        label="e-mail"
        onChangeText={(s) => setLogInData({ ...logInData, ...{ email: s } })}
        value={logInData.email}
        type="text"
      />
      <Input
        id="password"
        label="senha"
        onChangeText={(s) => setLogInData({ ...logInData, ...{ password: s } })}
        value={logInData.password}
        type="password"
      />
      <p className="form-switcher" onClick={switchForm}>
        Não possui conta?
      </p>
    </>
  );
}
