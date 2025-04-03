import { TimelineItemType } from "../types/chat";

export const generateHistoricalData = (ticker: string) => {
  const data = [];
  let price = Math.random() * 5000 + 100;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    price += (Math.random() - 0.5) * 100;
    price = Math.max(50, price);
    
    data.push({
      date: date.toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000),
      change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
    });
  }
  
  return data;
};

export const generateTimelineData = (ticker: string): TimelineItemType[] => {
  return [
    {
      id: 1,
      title: `${ticker} IPO Launch`,
      description: `${ticker} went public with an initial offering price.`,
      time: "2000-2005",
    },
    {
      id: 2,
      title: `${ticker} Major Acquisition`,
      description: `${ticker} acquired a competitor to expand market share.`,
      time: "2010-2015",
    },
    {
      id: 3,
      title: `${ticker} Stock Split`,
      description: `${ticker} announced a 2:1 stock split to improve liquidity.`,
      time: "2020",
    },
    {
      id: 4,
      title: `${ticker} Record Earnings`,
      description: `${ticker} reported highest quarterly earnings in company history.`,
      time: "2022",
    },
  ];
};