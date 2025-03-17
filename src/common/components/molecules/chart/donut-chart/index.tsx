"use client";
import * as React from "react";
import { Label, Pie, PieChart as RechartsDonutChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/atoms/ui/chart";
import { cn } from "@/common/lib/utils";

export interface Props {
  data: Record<string, any>[];
  config: ChartConfig;
  className?: string;
  dataKey?: string;
  labelKey?: string;
}

const DonutChart = ({
  data,
  config,
  className,
  dataKey = "visitors",
  labelKey = "browser",
}: Props) => {
  const totalCount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr[dataKey], 0);
  }, [data, dataKey]);

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto aspect-square max-h-[250px]", className)}
    >
      <RechartsDonutChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey={dataKey} hideLabel />}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={labelKey}
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalCount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {config[dataKey]?.label || "Total"}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </RechartsDonutChart>
    </ChartContainer>
  );
};

export default DonutChart;
