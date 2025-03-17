import InputField from "@/common/components/molecules/form/fields/input-field";
import SelectField from "@/common/components/molecules/form/fields/select-field";
const CompliantInfoStep = () => {
  return (
    <div className="space-y-2 mt-4">
      <InputField
        label="Full Name"
        name="compliantFullName"
        placeholder="Enter compliant full name"
      />

      <InputField
        type="email"
        label="Email"
        name="compliantEmail"
        placeholder="Enter compliant email"
      />

      <InputField
        type="number"
        label="Age"
        name="compliantAge"
        placeholder="Enter compliant age"
      />

      <InputField
        type="tel"
        label="Phone Number"
        name="compliantPhoneNumber"
        placeholder="Enter compliant phone number"
      />

      <SelectField
        label="Gender"
        placeholder="Select compliant gender"
        options={[{ label: "Male", value: "male" }]}
      />

      <InputField
        label="Address"
        name="compliantAddress"
        placeholder="Enter Compliant Address"
      />
    </div>
  );
};

export default CompliantInfoStep;
