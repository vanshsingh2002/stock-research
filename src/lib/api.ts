import { Message } from "../types/chat";
import { STOCK_TICKERS } from "./constants";
import { generateHistoricalData, generateTimelineData } from "./mockData";


export const sendChatQuery = async (query: string): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const detectedTickers = STOCK_TICKERS.filter((ticker) =>
    new RegExp(`\\b${ticker}\\b`, "i").test(query)
  );

  if (detectedTickers.length > 0) {
    const ticker = detectedTickers[0];
    const chartRequested = 
      query.toLowerCase().includes("chart") || 
      query.toLowerCase().includes("graph") ||
      query.toLowerCase().includes("visual") ||
      query.toLowerCase().includes("show me");

    const timelineRequested = 
      query.toLowerCase().includes("timeline") ||
      query.toLowerCase().includes("history") ||
      query.toLowerCase().includes("milestones") ||
      query.toLowerCase().includes("events");

    if (chartRequested) {
      const chartType = 
        query.toLowerCase().includes("bar") ? "bar" :
        query.toLowerCase().includes("area") ? "area" : "line";

      return {
        text: `Here's the ${chartType} chart:`,
        sender: "bot",
        timestamp: new Date(),
        chartData: {
          data: generateHistoricalData(ticker),
          type: chartType,
        },
      };
    } else if (timelineRequested) {
      return {
        text: `Here's the historical timeline:`,
        sender: "bot",
        timestamp: new Date(),
        timelineData: generateTimelineData(ticker),
      };
    } else {
      return {
        text: `### ${ticker} Current Data
- **Price**: ₹${(Math.random() * 5000 + 100).toFixed(2)}
- **Change**: ${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 5).toFixed(2)}%
- **Volume**: ${Math.floor(Math.random() * 1000000).toLocaleString()}

Ask for a (line, bar, or area) chart to see historical trends or request a timeline of key events.`,
        sender: "bot",
        timestamp: new Date(),
      };
    }
  }

  return {
    text: `### Stock Research Assistant
I can help with stock market data. Try:

- "Show **RELIANCE** chart"
- "**TCS** bar graph"
- "**TATASTEEL** area chart"
- "What's the price of **INFY**?"
- "Show timeline for **HDFCBANK**"`,
    sender: "bot",
    timestamp: new Date(),
  };
};