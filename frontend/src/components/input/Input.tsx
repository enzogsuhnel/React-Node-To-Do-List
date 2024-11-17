import React, { ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: any) => void;
}

export default function Input(props: InputProps) {
  const { name, placeholder, type, value, onChange } = props;
  return (
    <input
      className=" focus:outline-primary rounded-lg py-2 px-10"
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={(e: any) => onChange(e)}
    />
  );
}
