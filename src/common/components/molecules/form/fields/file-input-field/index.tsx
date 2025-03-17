import { Input } from "@/common/components/atoms/ui/input";
import { Label } from "@/common/components/atoms/ui/label";
import { useId } from "react";

const FileInputField = () => {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>File input</Label>
      <Input
        id={id}
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file"
      />
    </div>
  );
};

export default FileInputField;
