import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { DataTable } from "@/common/components/molecules/table/data-table";
import { Case } from "@/feature/user/interface/case";
import { FormProvider, useFormContext } from "react-hook-form";
import { RecentCaseDataTableColumn } from "./column";

const RecentCaseTable = () => {
  const form = useFormContext();

  const data: Case[] = [
    {
      id: "1",
      caseNumber: "CASE-2024-001",
      caseType: "civilCases",
      civilCaseType: "UTANG O PAG KAKAUTANG",
      filingDate: "2024-01-15",
      caseDescription: "Sample civil case description",
      compliantName: "John Doe",
      compliantEmail: "john@example.com",
      respondentName: "Jane Smith",
      respondentEmail: "jane@example.com",
    },
    {
      id: "2",
      caseNumber: "CASE-2024-002",
      caseType: "criminalCases",
      criminalCaseType: "THREATS",
      filingDate: "2024-01-16",
      caseDescription: "Sample criminal case description",
      compliantName: "Bob Wilson",
      compliantEmail: "bob@example.com",
      respondentName: "Alice Brown",
      respondentEmail: "alice@example.com",
    },
  ];

  const filterOptions = [
    { label: "All", value: "" },
    { label: "Civil Cases", value: "civilCases" },
    { label: "Criminal Cases", value: "criminalCases" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Case</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <DataTable
            data={data}
            columns={RecentCaseDataTableColumn}
            filterOptions={filterOptions}
          />
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default RecentCaseTable;
