import React from "react";
import { TimelineItemType } from "../../types/chat";
import { useTheme } from "../../components/Theme/useTheme";

interface TimelineProps {
  items: TimelineItemType[];
}

export const TimelineComponent: React.FC<TimelineProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <div className="mt-4">
      {items.map((item) => (
        <div key={item.id} className="relative pb-8 pl-8 group">
          <div className={`absolute left-4 top-0 h-full w-0.5 ${theme.timelineLine} group-last:hidden`} />
          <div className={`absolute left-4 top-1 w-3 h-3 rounded-full ${theme.timelineDot} ${theme.timelineDotRing} ring-4 -translate-x-1/2 z-10`} />
          <div className="mb-1 flex flex-col items-start">
            <div className={`inline-flex h-6 px-2 items-center justify-center text-xs font-semibold uppercase rounded-md mb-2 ${theme.textSecondary}`}>
              {item.time}
            </div>
            <h3 className={`text-lg font-bold ${theme.textPrimary}`}>
              {item.title}
            </h3>
          </div>
          {item.description && (
            <p className={`text-sm mt-1 ${theme.textSecondary}`}>
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};