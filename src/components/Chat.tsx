"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { clsx } from "clsx";
import debounce from 'lodash.debounce';
import { Message } from "../types/chat";
import { STOCK_TICKERS } from "../lib/constants";
import { TimelineComponent } from "../components/Chat/TimelineComponent";
import { ChartComponent } from "../components/Chat/ChartComponent";
import { SuggestionBox } from "../components/Chat/SuggestionBox";
import { sendChatQuery } from "../lib/api";
import { MemoizedMarkdownMessage } from "./Chat/MarkDownMessage";
import { useTheme } from "./Theme/useTheme";
import { ThemeProvider } from "./Theme/ThemeProvider";

const ChatInner = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { theme, toggleDarkMode } = useTheme();

  // Memoize message list to prevent unnecessary re-renders
  const messageList = useMemo(() => messages, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList]);

  // Debounce the ticker filtering
  const filterTickersDebounced = useMemo(() => 
    debounce((inputValue: string) => {
      if (inputValue.length > 1) {
        const filtered = STOCK_TICKERS.filter(ticker =>
          ticker.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredTickers(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }, 200),
    []
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      filterTickersDebounced.cancel();
    };
  }, [filterTickersDebounced]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    filterTickersDebounced(value);
  }, [filterTickersDebounced]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const newMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const botResponse = await sendChatQuery(input);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleSuggestionClick = useCallback((ticker: string) => {
    setInput(ticker);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const handleChartTypeChange = useCallback((type: "line" | "bar" | "area") => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.chartData) {
      setMessages(prev => [...prev, {
        text: `Show ${type} chart`,
        sender: "user",
        timestamp: new Date(),
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: `Here's the ${type} chart:`,
          sender: "bot",
          timestamp: new Date(),
          chartData: {
            data: lastMessage.chartData?.data || [],
            type,
          },
        }]);
      }, 500);
    }
  }, [messages]);

  const renderMessageContent = useCallback((message: Message) => {
    if (message.chartData) {
      return (
        <div className="space-y-2">
          <MemoizedMarkdownMessage content={message.text} />
          <ChartComponent 
            data={message.chartData.data} 
            type={message.chartData.type}
            onChartTypeChange={handleChartTypeChange}
          />
        </div>
      );
    }
    
    if (message.timelineData) {
      return (
        <div className="space-y-2">
          <MemoizedMarkdownMessage content={message.text} />
          <TimelineComponent items={message.timelineData} />
        </div>
      );
    }
    
    return <MemoizedMarkdownMessage content={message.text} />;
  }, [handleChartTypeChange]);

  return (
    <div className={`flex flex-col h-screen ${theme.bgSecondary}`}>
      <div className={`p-4 border-b ${theme.borderPrimary} ${theme.bgPrimary} flex justify-between items-center`}>
        <h1 className={`text-xl font-semibold ${theme.textPrimary}`}>
          Stock Research Assistant
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearChat}
            className={`p-2 rounded-full cursor-pointer ${theme.bgTertiary} ${theme.textSecondary} hover:${theme.borderSecondary} transition`}
            title="Clear chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${theme.bgTertiary} ${theme.textSecondary} hover:${theme.borderSecondary} transition`}
            title={theme.darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme.darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messageList.map((msg, index) => (
          <div
            key={index}
            className={clsx(
              "p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-2xl xl:max-w-3xl",
              msg.sender === "user"
                ? `ml-auto ${theme.userMessageBg} ${theme.userMessageText}`
                : `mr-auto ${theme.botMessageBg} ${theme.botMessageText}`
            )}
          >
            {renderMessageContent(msg)}
            <div className="text-xs opacity-70 mt-1">
              {msg.timestamp?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        {loading && (
          <div className={`mr-auto ${theme.botMessageBg} ${theme.botMessageText} p-3 rounded-lg max-w-xs md:max-w-md`}>
            Analyzing...
          </div>
        )}
      </div>

      <div className={`p-4 border-t ${theme.borderPrimary} ${theme.bgPrimary}`}>
  <div className="flex gap-2">
    <div className="relative flex-1">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className={`w-full px-4 py-2 border rounded-lg ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent`}
        placeholder="Ask about stocks (e.g., 'Show RELIANCE area chart')..."
        onFocus={() => input.length > 1 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      <SuggestionBox 
        show={showSuggestions}
        tickers={filteredTickers}
        onClick={handleSuggestionClick}
      />
    </div>
    <button
      onClick={handleSendMessage}
      className={`px-4 py-2 h-[42px] cursor-pointer rounded-lg disabled:opacity-50 ${theme.buttonPrimary} ${theme.buttonPrimaryHover} ${theme.buttonPrimaryText}`}
      disabled={loading || !input.trim()}
    >
      Send
    </button>
  </div>
  <div className={`text-xs mt-2 ${theme.textTertiary}`}>
    Try: "RELIANCE line chart", "TATASTEEL timeline", or "INFY price"
  </div>
</div>
    </div>
  );
};

export default function Chat() {
  return (
    <ThemeProvider>
      <ChatInner />
    </ThemeProvider>
  );
}