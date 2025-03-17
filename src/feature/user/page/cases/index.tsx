import { DataTable } from "@/common/components/molecules/table/data-table";
import useCreateCase from "../../hooks/case/use-create-case";
import { FormProvider } from "react-hook-form";
import caseColumns from "./config/column.config";
import caseActionConfig from "./config/action.config";
import useFetchAllCases from "./hooks/use-fetch-all-my-case";
import CreateScheduleCaseSheet from "@/common/components/organism/sheet/case/create-schedule-case-sheet";

export default function CasesPage() {
  const { form } = useCreateCase();
  const { result } = useFetchAllCases();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-4xl font-bold">Cases</h3>
      </div>
      <FormProvider {...form}>
        <DataTable
          data={result as any}
          columns={caseColumns}
          actions={caseActionConfig}
          createAction={<CreateScheduleCaseSheet />}
        />
      </FormProvider>
    </div>
  );
}
