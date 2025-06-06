import React, { useState, useEffect, useCallback } from "react";
import Icon from "../../../components/AppIcon";

const ThemeToggle = ({ size = "default" }) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && prefersDark.matches)
  );

  /* keep <html class="dark"> in sync with state */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  /* respond to OS-level theme changes */
  useEffect(() => {
    const handler = (e) => setIsDarkMode(e.matches);
    prefersDark.addEventListener("change", handler);
    return () => prefersDark.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((d) => !d);
  }, []);

  const buttonSize = size === "small" ? "p-2" : "p-3";
  const iconSize = size === "small" ? 18 : 20;

  return (
    <button
      onClick={toggleTheme}
      className={`${buttonSize} rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative">
        {/* Sun Icon */}
        <Icon
          name="Sun"
          size={iconSize}
          className={`transition-all duration-300 ${
            isDarkMode
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />

        {/* Moon Icon */}
        <Icon
          name="Moon"
          size={iconSize}
          className={`absolute inset-0 transition-all duration-300 ${
            isDarkMode
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
