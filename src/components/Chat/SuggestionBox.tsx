import React from 'react';
import { useTheme } from '../../components/Theme/useTheme';

interface SuggestionBoxProps {
  show: boolean;
  tickers: string[];
  onClick: (ticker: string) => void;
}

export const SuggestionBox: React.FC<SuggestionBoxProps> = ({ show, tickers, onClick }) => {
  const { theme } = useTheme();

  if (!show || tickers.length === 0) {
    return null;
  }

  return (
    <div className={`absolute bottom-full mb-2 w-full max-h-60 overflow-auto rounded-lg shadow-lg z-10 border ${
      theme.suggestionsBg
    } ${theme.suggestionsText} ${theme.suggestionsBorder}`}>
      {tickers.map((ticker) => (
        <div
          key={ticker}
          className={`px-4 py-2 cursor-pointer ${theme.suggestionsHover}`}
          onClick={() => onClick(ticker)}
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur
        >
          {ticker}
        </div>
      ))}
    </div>
  );
};