import { ReactNode } from "react";
import Button from "../button/Button";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  message: string | ReactNode;
  effectMessage?: string;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "lightNeutral"
    | "neutral";
};

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  message,
  effectMessage,
  color,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-gray-800 text-lg">
        {message}
        <p className="text-red-700 text-md">{effectMessage}</p>
        {onClose && onConfirm && (
          <div className="mt-6 flex justify-end space-x-4">
            <Button onClick={onClose} color={"lightNeutral"} text="Cancelar" />
            <Button onClick={onConfirm} color={color} text="Confirmar" />
          </div>
        )}
      </div>
    </div>
  );
}
