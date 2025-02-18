import React, { useEffect } from "react";

export default function useClickOutside(
  elementRef: React.RefObject<HTMLDivElement>,
  callback: () => void,
  closeRef?: React.RefObject<HTMLDivElement | HTMLButtonElement>,
  closeId?: string
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const closeElement = closeRef
        ? closeRef.current
        : closeId
        ? document.getElementById(closeId)
        : null;

      if (
        closeElement
          ? !elementRef.current?.contains(target) &&
            !closeElement.contains(target)
          : !elementRef.current?.contains(target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, callback, closeRef]);
}
