import React, { useRef } from "react";
import { text } from "stream/consumers";
import Button from "../button/Button";
import useClickOutside from "../../hooks/useClickOutside";
import { dropPositionsTypes } from "./types";

export interface OptionProps {
  text: string;
  onClick: () => void;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "lightNeutral"
    | "neutral";
  textColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "neutral"
    | "white";
  startIcon?: string;
}

type DropProps = {
  options: OptionProps[];
  onClose: () => void;
  closeIconId: string;
  position?: "right" | "leftBottom";
  customPosition?: string;
};

export default function Drop({
  options,
  onClose,
  closeIconId,
  position = "right",
  customPosition,
}: DropProps) {
  const dropRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropRef, onClose, undefined, closeIconId);
  return (
    <div
      ref={dropRef}
      className={` flex flex-col min-w-40 absolute shadow-md bg-white ${dropPositionsTypes[position ]} ${customPosition}`}
    >
      {options.map((props, index) => (
        <Button
          key={index}
          text={props.text}
          color={props.color}
          onClick={() => {
            props.onClick();
            onClose();
          }}
        />
      ))}
    </div>
  );
}
