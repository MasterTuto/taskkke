import React from "react";
import "./input.css";

interface Props {
  onChangeText: (t: string) => void;
  value: string;
  id: string;
  type?: string;
  label: string;
}

export default function Input({
  onChangeText,
  value,
  id,
  type = "text",
  label,
}: Props) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        id={id}
        autoComplete="off"
      />
    </div>
  );
}
