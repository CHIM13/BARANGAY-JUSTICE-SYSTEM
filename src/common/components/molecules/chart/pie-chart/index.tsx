"use client";

import { LabelList, Pie, PieChart as RechartsPieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/atoms/ui/chart";
import { cn } from "@/common/lib/utils";

export interface PieChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export interface PieChartProps {
  data: PieChartData[];
  config: ChartConfig;
  className?: string;
  dataKey?: string;
  labelKey?: string;
}

const formatLabel = (config: ChartConfig) => (value: keyof typeof config) => {
  return config[value]?.label;
};

export function PieChart({
  data,
  config,
  className = "mx-auto aspect-square max-h-[300px]",
  dataKey = "visitors",
  labelKey = "browser",
}: PieChartProps) {
  return (
    <div className="flex-1 pb-0">
      <ChartContainer config={config} className={cn(className)}>
        <RechartsPieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey={dataKey} hideLabel />}
          />
          <Pie data={data} dataKey={dataKey}>
            <LabelList
              dataKey={labelKey}
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={formatLabel(config)}
            />
          </Pie>

          <ChartLegend
            content={<ChartLegendContent nameKey={labelKey} />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </RechartsPieChart>
      </ChartContainer>
    </div>
  );
}

export default PieChart;
