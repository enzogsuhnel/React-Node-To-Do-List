import React from "react";
interface ButtonProps {
  type: "submit" | "button";
  text: string;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text" | "containedWhite";
  textColor?: string;
}

export default function Button(props: ButtonProps) {
  const { type, text, onClick, variant = "contained", textColor } = props;

  const VariantStyle = {
    contained: "bg-orange-600 hover:bg-orange-700",
    outlined: "border border-orange-600 hover:text-orange-200",
    text: "",
    containedWhite: "bg-orange-600 hover:bg-orange-700 text-neutral-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${VariantStyle[variant]} ${textColor} rounded-lg p-2 font-semibold text-base`}
    >
      {text}
    </button>
  );
}
