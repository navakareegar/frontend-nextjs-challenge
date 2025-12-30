'use client';

import { useState, useEffect, useRef } from 'react';

interface IAutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Autocomplete(props: IAutocompleteProps) {
  const {
    options,
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{ color: '#ffffff', backgroundColor: '#1e293b' }}
          className="w-full px-2 py-1.5 text-xs border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all pr-6"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
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
          </button>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors ${
                option.toLowerCase() === inputValue.toLowerCase()
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isOpen && filteredOptions.length === 0 && inputValue && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-lg">
          <div className="px-3 py-2 text-xs text-slate-500">
            No results found
          </div>
        </div>
      )}
    </div>
  );
}
