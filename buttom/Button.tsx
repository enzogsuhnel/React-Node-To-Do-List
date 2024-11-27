import React from "react";
interface ButtonProps {
  type: "submit" | "button";
  text: string;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  textColor?: string;
}

export default function Button(props: ButtonProps) {
  const { type, text, onClick, variant = "contained", textColor } = props;

  const VariantStyle = {
    contained: "bg-teal-400 hover:bg-teal-500",
    outlined: "border border-teal-500 hover:text-teal-500",
    text: "",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${VariantStyle[variant]} ${textColor} rounded py-2 px-4 font-medium text-base`}
    >
      {text}
    </button>
  );
}
