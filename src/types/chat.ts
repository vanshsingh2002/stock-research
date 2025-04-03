export interface Message {
    text: string;
    sender: "user" | "bot";
    timestamp?: Date;
    chartData?: {
      data: any[];
      type: "line" | "bar" | "area";
    };
    timelineData?: TimelineItemType[];
  }
  
  export interface TimelineItemType {
    id: number;
    title: string;
    description?: string;
    time: string;
  }
  
  export type StockTicker = 
    "RELIANCE" | "TATASTEEL" | "TCS" | "INFY" | "HDFCBANK" | 
    "ICICIBANK" | "BHARTIARTL" | "LT" | "HINDUNILVR" | "ITC" | 
    "BATAINDIA" | "ASIANPAINT" | "MARUTI" | "SUNPHARMA" | "ONGC" | 
    "NTPC" | "POWERGRID" | "COALINDIA" | "IOC" | "BPCL";