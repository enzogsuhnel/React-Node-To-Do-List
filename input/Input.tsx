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
      className=" focus:border-teal-500 outline-none py-2 text-md border-b-2 border-neutral-400"
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={(e: any) => onChange(e)}
    />
  );
}
