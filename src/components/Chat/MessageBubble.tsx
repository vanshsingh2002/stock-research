import React from "react";
import { Message } from "../../types/chat";
import { ChartComponent } from "./ChartComponent";
import { TimelineComponent } from "./TimelineComponent";
import { useTheme } from "../../components/Theme/useTheme";
import { MemoizedMarkdownMessage } from "./MarkDownMessage";

interface MessageBubbleProps {
  message: Message;
  onChartTypeChange: (type: "line" | "bar" | "area") => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message,
  onChartTypeChange
}) => {
  const { theme } = useTheme();

  if (message.chartData) {
    return (
      <div className="space-y-2">
        <MemoizedMarkdownMessage content={message.text} />
        <ChartComponent 
          data={message.chartData.data} 
          type={message.chartData.type}
          onChartTypeChange={onChartTypeChange}
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
};