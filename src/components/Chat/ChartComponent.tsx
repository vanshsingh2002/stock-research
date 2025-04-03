import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../components/Theme/useTheme";

interface ChartProps {
  data: any[];
  type: "line" | "bar" | "area";
  onChartTypeChange: (type: "line" | "bar" | "area") => void;
}

export const ChartComponent: React.FC<ChartProps> = ({ 
  data, 
  type,
  onChartTypeChange 
}) => {
  const { theme } = useTheme();

  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  return (
    <div className="space-y-2">
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
            <XAxis dataKey="date" stroke={theme.chartText} />
            <YAxis stroke={theme.chartText} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.chartTooltipBg,
                borderColor: theme.chartGrid,
                color: theme.chartText,
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke={theme.chartLine}
              activeDot={{ r: 8 }}
              name="Price (₹)"
            />
          </LineChart>
        ) : type === "bar" ? (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
            <XAxis dataKey="date" stroke={theme.chartText} />
            <YAxis stroke={theme.chartText} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.chartTooltipBg,
                borderColor: theme.chartGrid,
                color: theme.chartText,
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Bar
              dataKey="price"
              fill={theme.chartBar}
              name="Price (₹)"
            />
          </BarChart>
        ) : (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
            <XAxis dataKey="date" stroke={theme.chartText} />
            <YAxis stroke={theme.chartText} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.chartTooltipBg,
                borderColor: theme.chartGrid,
                color: theme.chartText,
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="price"
              stroke={theme.chartArea}
              fill={theme.chartArea}
              fillOpacity={0.3}
              name="Price (₹)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onChartTypeChange("line")}
          className={`text-xs px-2 py-1 cursor-pointer rounded ${theme.buttonPrimary} ${theme.buttonPrimaryText}`}
        >
          Line
        </button>
        <button
          onClick={() => onChartTypeChange("bar")}
          className={`text-xs px-2 py-1 cursor-pointer rounded ${theme.buttonPrimary} ${theme.buttonPrimaryText}`}
        >
          Bar
        </button>
        <button
          onClick={() => onChartTypeChange("area")}
          className={`text-xs px-2 py-1 cursor-pointer rounded ${theme.buttonPrimary} ${theme.buttonPrimaryText}`}
        >
          Area
        </button>
      </div>
    </div>
  );
};