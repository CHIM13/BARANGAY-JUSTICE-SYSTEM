import InputField from "@/common/components/molecules/form/fields/input-field";
import SelectField from "@/common/components/molecules/form/fields/select-field";
import TextAreaField from "@/common/components/molecules/form/fields/text-area-field";
import { useFormContext } from "react-hook-form";
import { CivilCaseType, CriminalCaseType } from "../../../cases.data";
const OtherInfoStep = () => {
  const { watch } = useFormContext();
  const caseType = watch("caseType");

  return (
    <div className="space-y-2 mt-4">
      <SelectField
        label="Type of Cases"
        name="caseType"
        placeholder="Enter Case Type"
        options={[
          {
            label: "Civil Cases",
            value: "civilCases",
          },
          {
            label: "Criminal Cases",
            value: "criminalCases",
          },
        ]}
      />

      {caseType && (
        <SelectField
          label={`${
            caseType === "civilCases" ? "Civil Case Type" : "Criminal Case Type"
          }`}
          name={`${
            caseType === "civilCases" ? "civilCaseType" : "criminalCaseType"
          }`}
          placeholder={`Select ${
            caseType === "civilCases" ? "Civil" : "Criminal"
          } Case Type`}
          options={caseType === "civilCases" ? CivilCaseType : CriminalCaseType}
        />
      )}

      <InputField
        type="date"
        label="Date of Filing"
        name="filingDate"
        placeholder="Enter Date of Filing"
      />

      <TextAreaField
        label="Case Description"
        name="caseDescription"
        placeholder="Enter the case description"
        className="h-32"
      />
    </div>
  );
};

export default OtherInfoStep;
