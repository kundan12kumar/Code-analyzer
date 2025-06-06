import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Icon from "../../../components/AppIcon";
const CodeEditor = forwardRef(
  (
    {
      value = "",
      onChange,
      language = "javascript",
      placeholder = "",
      height = "400px",
      readOnly = false,
    },
    ref
  ) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);


    useImperativeHandle(ref, () => textareaRef.current, []);

    const handleChange = (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleKeyDown = (e) => {
      // Handle tab key for indentation
      if (e.key === "Tab") {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const newValue =
          value.substring(0, start) + "  " + value.substring(end);

        if (onChange) {
          onChange(newValue);
        }

        // Set cursor position after the inserted spaces
        requestAnimationFrame(() => {
          const el = textareaRef.current;
          if (el) el.selectionStart = el.selectionEnd = start + 2;
        });
      }
    };

    const handleScroll = () => {
      if (lineNumbersRef.current && textareaRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    // Calculate line numbers
    const lines = value.split("\n");
    const lineNumbers = Array.from(
      { length: Math.max(lines.length, 20) },
      (_, i) => i + 1
    );

    const getLanguageIcon = (lang) => {
      const iconMap = {
        javascript: "FileCode",
        typescript: "FileCode",
        python: "FileCode",
        java: "FileCode",
        cpp: "FileCode",
        html: "FileCode",
        css: "FileCode",
        sql: "Database",
      };
      return iconMap[lang] || "FileCode";
    };

    return (
      <div
        className="relative bg-code-bg-light dark:bg-code-bg-dark"
        style={{ height }}
      >
        {/* Editor Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-editor-gutter-light dark:bg-editor-gutter-dark border-b border-border-light dark:border-border-dark z-10">
          <div className="flex items-center space-x-2">
            <Icon
              name={getLanguageIcon(language)}
              size={16}
              color="var(--color-text-secondary-light)"
            />
            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase">
              {language}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Lines: {lines.length}
            </span>
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Chars: {value.length}
            </span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex h-full pt-10">
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="flex-shrink-0 w-12 bg-editor-gutter-light dark:bg-editor-gutter-dark border-r border-border-light dark:border-border-dark overflow-hidden"
            style={{ height: `calc(${height} - 40px)` }}
          >
            <div className="py-3 px-2 text-right">
              {lineNumbers.map((num) => (
                <div
                  key={num}
                  className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-6 font-mono"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Code Input Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onScrollCapture={handleScroll} 
              placeholder={placeholder}
              readOnly={readOnly}
              className="w-full h-full p-3 bg-transparent text-text-primary-light dark:text-text-primary-dark font-mono text-sm leading-6 resize-none border-none outline-none placeholder-text-secondary-light dark:placeholder-text-secondary-dark"
              style={{
                height: `calc(${height} - 40px)`,
                minHeight: `calc(${height} - 40px)`,
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            {/* Placeholder overlay when empty */}
            {!value && placeholder && (
              <div className="absolute top-3 left-3 pointer-events-none">
                <div className="text-text-secondary-light dark:text-text-secondary-dark font-mono text-sm leading-6 whitespace-pre-wrap">
                  {placeholder.split("\n").slice(0, 5).join("\n")}
                  {placeholder.split("\n").length > 5 && "\n..."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-editor-gutter-light dark:bg-editor-gutter-dark border-t border-border-light dark:border-border-dark">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Ready
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={12} color="var(--color-success)" />
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Syntax highlighting enabled
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
