import { error } from "console";
import React from "react";
interface ButtonProps {
  type?: "submit" | "button";
  text?: string;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  textColor?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'white';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'lightNeutral' | 'neutral'
  endIcon?: string,
  startIcon?: string,
  customclass?: string
}

export default function Button(props: ButtonProps) {
  const { type = 'button', text, onClick, variant = "contained", textColor, endIcon, startIcon, color = "secondary", customclass } = props;

  const VariantStyle = {
    contained: "",
    outlined: "border border-teal-500 hover:text-teal-500",
    text: "",
  };

  const TextStyle = {
    primary: "text-primary  hover:text-teal-500 ",
    secondary: "text-secondary  hover:text-teal-500 ",
    tertiary: "text-tertiary  hover:text-teal-500",
    error: "text-red-500  hover:text-red-600 ",
    white: "text-white  hover:text-neutral-300 ",
    neutral: "text-neutral-500  hover:text-neutral-600",
  };

  const ColorStyle = {
    primary: "bg-primary  hover:bg-teal-500 text-white",
    secondary: "bg-secondary  hover:bg-teal-500 text-neutral-800",
    tertiary: "bg-tertiary  hover:bg-teal-500 text-white",
    error: "bg-red-500  hover:bg-red-600 text-white",
    lightNeutral: "bg-neutral-200  hover:bg-neutral-300 text-neutral-800",
    neutral: "bg-neutral-500  hover:bg-neutral-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${customclass} ${VariantStyle[variant]} ${textColor && TextStyle[textColor]} ${variant == 'contained' && ColorStyle[color]}  ${textColor} rounded py-2 px-4 font-medium text-base ${(startIcon || endIcon) && "flex items-center gap-2"}`}
    >
      {startIcon && <span className="material-symbols-outlined">{startIcon}</span>}
      {text}
      {endIcon && <span className="material-symbols-outlined">{endIcon}</span>}
    </button>
  );
}
