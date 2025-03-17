import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { ChartConfig } from "@/common/components/atoms/ui/chart";
import MultipleBarChart from "@/common/components/molecules/chart/multiple-bar-chart";

const barchartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const barchartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TotalCaseBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Case</CardTitle>
      </CardHeader>
      <CardContent>
        <MultipleBarChart
          data={barchartData}
          config={barchartConfig}
          xAxisKey="month"
          barKeys={["desktop", "mobile"]}
        />
      </CardContent>
    </Card>
  );
};

export default TotalCaseBarChart;
