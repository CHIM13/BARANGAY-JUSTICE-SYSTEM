import CasesBadge from "@/common/components/molecules/badge/case/cases-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { ChartConfig } from "@/common/components/atoms/ui/chart";
import DonutChart from "@/common/components/molecules/chart/donut-chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const UnsettledCasePieChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Unsettled Case</CardTitle>
        <CardDescription>
          This is the number of cases that are not settled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DonutChart data={chartData} config={chartConfig} />
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-2 gap-4 w-full">
            <CasesBadge label="Civil Case" count={100} />
            <CasesBadge label="Civil Case" count={100} />
            <CasesBadge label="Civil Case" count={100} />
            <CasesBadge label="Civil Case" count={100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnsettledCasePieChart;
