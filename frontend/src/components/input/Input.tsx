import React, { ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: any) => void;
  className?: string;
}

export default function Input(props: InputProps) {
  const { name, placeholder, type, value, onChange, className } = props;
  return (
    <input
      className=" focus:outline-orange-600 rounded-lg py-2 px-4 text-md "
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={(e: any) => onChange(e)}
    />
  );
}
