import { Message, StockTicker } from "../types/chat";

export const STOCK_TICKERS: StockTicker[] = [
  "RELIANCE",
  "TATASTEEL",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "BHARTIARTL",
  "LT",
  "HINDUNILVR",
  "ITC",
  "BATAINDIA",
  "ASIANPAINT",
  "MARUTI",
  "SUNPHARMA",
  "ONGC",
  "NTPC",
  "POWERGRID",
  "COALINDIA",
  "IOC",
  "BPCL",
];

export const INITIAL_MESSAGES: Message[] = [
  {
    text: "### Stock Research Assistant\nI can help with stock market data. Try:\n\n- \"Show **RELIANCE** chart\"\n- \"**TCS** bar graph\"\n- \"**TATASTEEL** area chart\"\n- \"What's the price of **INFY**?\"\n- \"Show timeline for **HDFCBANK**\"",
    sender: "bot",
    timestamp: new Date(),
  },
];