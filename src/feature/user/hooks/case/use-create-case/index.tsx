import { useForm } from "react-hook-form";

const useCreateCase = () => {
  const form = useForm();

  return { form };
};

export default useCreateCase;
