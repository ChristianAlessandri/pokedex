"use client";

import { useState } from "react";
import { FaX } from "react-icons/fa6";

const Disclaimer = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full flex justify-between items-start">
      <header className="flex flex-col items-start justify-center bg-amber-200 w-full md:w-1/2 p-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-neutral-950 text-xl font-semibold">Disclaimer</h1>
          <button onClick={() => setVisible(false)}>
            <FaX className="w-4 h-4" />
          </button>
        </div>
        <p className="text-neutral-950 text-sm">
          This is a personal project and is not affiliated with or endorsed by
          The Pokémon Company, Nintendo, or Game Freak. All Pokémon images and
          names are copyrighted by their respective owners.
        </p>
      </header>
    </div>
  );
};

export default Disclaimer;
