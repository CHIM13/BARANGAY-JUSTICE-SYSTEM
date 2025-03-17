import InputField from "@/common/components/molecules/form/fields/input-field";
import SelectField from "@/common/components/molecules/form/fields/select-field";

const RespondentInfoStep = () => {
  return (
    <div className="space-y-2 mt-4">
      <InputField
        label="Full Name"
        name="respondentFullName"
        placeholder="Enter respondent full name"
      />

      <InputField
        type="email"
        label="Email"
        name="respondentEmail"
        placeholder="Enter respondent email"
      />

      <InputField
        type="number"
        label="Age"
        name="respondentAge"
        placeholder="Enter respondent age"
      />

      <InputField
        type="tel"
        label="Phone Number"
        name="respondentPhoneNumber"
        placeholder="Enter respondent phone number"
      />

      <SelectField
        label="Gender"
        placeholder="Select respondent gender"
        options={[{ label: "Male", value: "male" }]}
      />

      <InputField
        label="Address"
        name="respondentAddress"
        placeholder="Enter respondent Address"
      />
    </div>
  );
};

export default RespondentInfoStep;
