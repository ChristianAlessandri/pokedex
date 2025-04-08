"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { motion } from "framer-motion";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "dark" | "light";

const STORAGE_KEY = "yourvibes-starter-theme";
const modes: ColorSchemePreference[] = ["dark", "light"];

export const NoFOUCScript = (storageKey: string) => {
  const [DARK, LIGHT] = ["dark", "light"];

  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? LIGHT;
    const classList = document.documentElement.classList;
    if (mode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };

  window.updateDOM();
};

const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ??
        "light") as ColorSchemePreference
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.textContent = `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.updateDOM) {
      localStorage.setItem(STORAGE_KEY, mode);
      window.updateDOM();
    }
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  const getIcon = () => {
    const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length];
    switch (nextMode) {
      case "light":
        return (
          <FaMoon
            aria-label="Switch the theme to dark mode"
            className="w-8 h-8 rounded-full dark:text-neutral-50 text-neutral-950"
          />
        );
      case "dark":
        return (
          <FaSun
            aria-label="Switch the theme to light mode"
            className="w-8 h-8 rounded-full dark:text-neutral-50 text-neutral-950"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.button
        className="fixed block md:hidden bottom-4 left-4 z-50 "
        initial={{ rotate: 180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        whileHover={{
          rotate: 270,
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        onClick={handleModeSwitch}
      >
        {getIcon()}
      </motion.button>
      <motion.button
        className="fixed hidden md:block top-8 right-8 z-50"
        initial={{ rotate: 180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        whileHover={{
          rotate: 270,
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        onClick={handleModeSwitch}
      >
        {getIcon()}
      </motion.button>
    </>
  );
};

export const ThemeSwitcher = () => {
  return <Switch />;
};

export default ThemeSwitcher;
