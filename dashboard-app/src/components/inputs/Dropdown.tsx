"use client";

import { useState, useRef, useEffect } from "react";

interface IDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown(props: IDropdownProps) {
  const {
    options,
    value,
    onChange,
    placeholder = "Select...",
    className = "",
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: "#1e293b" }}
        className="w-full px-2 py-1.5 text-xs border border-slate-600 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all flex items-center justify-between gap-1"
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <span
              onClick={handleClear}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          )}
          <svg
            className={`w-3 h-3 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          <button
            onClick={() => handleSelect("")}
            className={`w-full px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700`}
          >
            {placeholder}
          </button>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors ${
                option === value ? "bg-emerald-500/20 text-emerald-400" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
