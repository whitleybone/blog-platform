import React, { useEffect, useState } from "react";
import "./ScrollingQuotes.css";

const ScrollingQuotes = ({ theme }) => {
  const quotes = [
    "The earth has music for those who listen. - Shakespeare",
    "Not all who wander are lost. - J.R.R. Tolkien",
    "Dream big, live simply, and follow your heart.",
    "Let your soul shine brighter than the sun.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className={`quote-container ${theme}`}>
      <div className="quote">{quotes[currentIndex]}</div>
    </div>
  );
};

export default ScrollingQuotes;