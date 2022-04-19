import React from "react";
import Input from "../components/Input";

interface LogOnData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  logOnData: LogOnData;
  setLogOnData: (p: LogOnData) => void;
  switchForm: () => void;
}

export default function LogonForm({
  logOnData,
  setLogOnData,
  switchForm,
}: Props) {
  return (
    <>
      <Input
        id="name"
        label="nome"
        onChangeText={(s) => setLogOnData({ ...logOnData, ...{ name: s } })}
        value={logOnData.name}
        type="text"
      />
      <Input
        id="email"
        label="e-mail"
        onChangeText={(s) => setLogOnData({ ...logOnData, ...{ email: s } })}
        value={logOnData.email}
        type="text"
      />
      <Input
        id="password"
        label="senha"
        onChangeText={(s) => setLogOnData({ ...logOnData, ...{ password: s } })}
        value={logOnData.password}
        type="password"
      />
      <Input
        id="passwordConfirmation"
        label="confirmação de senha:"
        onChangeText={(s) =>
          setLogOnData({ ...logOnData, ...{ passwordConfirmation: s } })
        }
        value={logOnData.passwordConfirmation}
        type="password"
      />
      <p className="form-switcher" onClick={switchForm}>
        Já possui conta?
      </p>
    </>
  );
}
