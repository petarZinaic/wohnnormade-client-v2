"use client";

import { useState, useEffect, useRef } from "react";
import { LocationService, LocationSuggestion } from "@/services";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  error?: string;
  className?: string;
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  label,
  error,
  className = "",
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const suggestions = await LocationService.searchLocations(query);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions(value);
    }, 500); // Increased debounce to be respectful to the free API

    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    onChange(suggestion.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        ref={inputRef}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        } ${className}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {showSuggestions && (value.length >= 2 || isLoading) && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-3 text-gray-500 text-center">
              Loading suggestions...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="font-medium">{suggestion.name}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.fullName}
                  </div>
                </li>
              ))}
            </ul>
          ) : value.length >= 2 ? (
            <div className="p-3 text-gray-500 text-center">
              No suggestions found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
