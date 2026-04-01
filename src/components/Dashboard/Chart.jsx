import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  AreaChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import theme from "../../theme/theme";

const Chart = ({ 
  data = [], 
  type = "bar", 
  xKey = "name", 
  yKeys = ["value"], 
  colors = [theme.colors.primary],
  height = 300 
}) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    const commonElements = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#E7E7E7" />
        <XAxis
          dataKey={xKey}
          tick={{
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fill: theme.colors.textColor,
          }}
        />
        <YAxis
          tick={{
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fill: theme.colors.textColor,
          }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: theme.colors.white,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif'
          }}
        />
        {yKeys.length > 1 && <Legend />}
      </>
    );

    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            {commonElements}
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index] || theme.colors.primary}
                strokeWidth={3}
                dot={{ fill: colors[index] || theme.colors.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            {commonElements}
            {yKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index] || theme.colors.primary}
                fill={`${colors[index] || theme.colors.primary}40`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case "bar":
      default:
        return (
          <BarChart {...commonProps}>
            {commonElements}
            {yKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, entryIndex) => (
                  <Cell 
                    key={`cell-${entryIndex}`} 
                    fill={entry.color || colors[index] || theme.colors.primary} 
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default Chart;