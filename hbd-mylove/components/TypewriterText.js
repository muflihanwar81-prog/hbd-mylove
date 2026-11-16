"use client";

import { useState, useEffect } from "react";

export default function TypewriterText({ text = "", speed = 40, delay = 300, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTyping(true);

    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-[2px] h-[1em] ml-1 bg-[#102B5C] animate-pulse align-middle" />
      )}
    </span>
  );
}
