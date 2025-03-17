// UpdatePartySheet.tsx
import { Button } from "@/common/components/atoms/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/common/components/atoms/ui/sheet";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { XStack } from "@/common/components/atoms/ui/stack";
import InputField from "@/common/components/molecules/form/fields/input-field";
import SelectField from "@/common/components/molecules/form/fields/select-field";

interface Props {
  label?: string;
  partyType: "compliant" | "respondent";
  compliantId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdatePartySheet = memo(function UpdatePartySheet({
  partyType,
  open,
  onOpenChange,
}: Props) {
  // Added defaultValues to form
  const form = useForm({
    defaultValues: {
      compliantFullName: "",
      compliantEmail: "",
      compliantAge: "",
      compliantPhoneNumber: "",
      gender: "",
      compliantAddress: "",
    },
  });

  // Added form submission handler
  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    onOpenChange(false);
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>Update {partyType} Information</span>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2 mt-4">
              <InputField
                label="Full Name"
                name="compliantFullName"
                placeholder={`Enter ${partyType} full name`}
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
                name="gender"
                placeholder="Select compliant gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />

              <InputField
                label="Address"
                name="compliantAddress"
                placeholder="Enter Compliant Address"
              />
            </div>

            <SheetFooter>
              <XStack className="justify-between space-x-2">
                <Button type="submit">Submit</Button>
              </XStack>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
});

export default UpdatePartySheet;
