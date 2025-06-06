import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAnalysisHistory } from "../../services/historyService";
import Icon from "../AppIcon";

const Header = ({ variant = "default" }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isCompact = variant === "compact";

  const lastAnalysisId = getAnalysisHistory()[0]?.id;

  const navigationItems = [
    { path: "/main-code-input-screen", label: "Code Input", icon: "Code" },
    {
      path: lastAnalysisId ? `/analysis/${lastAnalysisId}` : "#",
      label: "Analysis",
      icon: "FileText",
      disabled: !lastAnalysisId,
    },
    {
      path: "/history-saved-analyses-screen",
      label: "History",
      icon: "History",
    },
  ];

  return (
    <header
      className={`bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark ${
        isCompact ? "py-2" : "py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to content
          </a>

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/main-code-input-screen"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            >
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Code" size={isCompact ? 20 : 24} color="white" />
              </div>
              <span
                className={`font-bold text-text-primary-light dark:text-text-primary-dark ${
                  isCompact ? "text-lg" : "text-xl"
                }`}
              >
                CodeAnalyzer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {" "}
            {navigationItems.map((item) => {
              /* active when exact or any /analysis/:id */
              const isActive = item.disabled
                ? false
                : item.label === "Analysis"
                ? location.pathname.startsWith("/analysis")
                : location.pathname === item.path;

              const baseClasses =
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200";

              const activeClasses = isActive
                ? "bg-primary-light text-primary"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700";

              /* Disabled item rendered as <span> */
              return item.disabled ? (
                <span
                  key={item.label}
                  className={`${baseClasses} opacity-50 cursor-not-allowed`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${baseClasses} ${activeClasses} focus:outline-none focus:ring-2 focus:ring-primary`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
            </button>

            {/* User Menu */}
            <button className="flex items-center space-x-2 p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              <Icon name="User" size={20} />
              <span className="hidden sm:inline text-sm font-medium">
                Account
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border-light dark:border-border-dark pt-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    location.pathname === item.path
                      ? "bg-primary-light text-primary"
                      : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
