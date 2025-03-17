import HeroWidget from "@/common/components/atoms/widget/hero-widget";
import TotalCaseBarChart from "@/common/components/organism/chart/case/total-case-bar-chart";
import UnsettledCasePieChart from "@/common/components/organism/chart/case/unsettled-case-pie-chart";

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <HeroWidget />
      <div className="grid grid-cols-[auto_35%] gap-4">
        <TotalCaseBarChart />
        <UnsettledCasePieChart />
      </div>

      <div className="mt-4">{/* <RecentCaseTable /> */}</div>
    </div>
  );
};

export default UserDashboard;
