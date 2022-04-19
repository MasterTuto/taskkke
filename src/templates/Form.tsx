import React from "react";
import "./form.css";

interface Props {
  onSubmit: () => void;
  submitBtnText: string;
  children: React.Component | React.Component[] | any;
}

export default function Form({ onSubmit, children, submitBtnText }: Props) {
  return (
    <div className="form-container">
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <button type="submit">{submitBtnText}</button>
      </form>
    </div>
  );
}
