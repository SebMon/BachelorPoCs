import { useEffect } from "react";

const Shortcut = ({ onPress }: { onPress: VoidFunction }) => {
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => e.ctrlKey && e.key === "a"; // Change keys here
    //const shortcut = (e: KeyboardEvent) => e.ctrlKey && e.shiftKey && e.code === "KeyC"; // Change keys here
    //const shortcut = (e: KeyboardEvent) => e.key === "F11"; // Change keys here

    const handler = (e: KeyboardEvent) => {
        if (shortcut(e)) onPress();
    };

    const ignore = (e: KeyboardEvent) => {
        if (shortcut(e)) e.preventDefault();
    };

    
    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);

    return () => {
        window.removeEventListener("keyup", handler);
        window.removeEventListener("keydown", ignore);
    };
  });

  return null;
};

export default Shortcut;