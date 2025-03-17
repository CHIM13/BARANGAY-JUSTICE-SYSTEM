"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/atoms/ui/chart";

export interface ChartData<T> {
  [key: string]: T;
}

export interface MultipleBarChartProps<T> {
  data: ChartData<T>[];
  config: ChartConfig;
  xAxisKey: string;
  barKeys: string[];
  tickFormatter?: (value: any) => string;
  vertical?: boolean;
  radius?: number;
}

export function MultipleBarChart<T>({
  data,
  config,
  xAxisKey,
  barKeys,
  tickFormatter = (value) => value.slice(0, 3),
  vertical = false,
  radius = 4,
}: MultipleBarChartProps<T>) {
  return (
    <ChartContainer config={config}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={vertical} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={tickFormatter}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        {barKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={config[key]?.color || `hsl(var(--chart-${key}))`}
            radius={radius}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

export default MultipleBarChart;
