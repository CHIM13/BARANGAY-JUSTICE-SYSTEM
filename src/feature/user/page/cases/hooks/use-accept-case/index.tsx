import api from "@/api/client";
import { toast } from "@/common/components/atoms/ui/sonner";
import useMutate from "@/common/hooks/query/useMutate";

const useAcceptCase = () => {
  return useMutate({
    mutationFn: (caseId: string) => {
      return api.post(`/case/${caseId}/accept`);
    },
    onSuccess: () => {
      toast.success("Case accepted successfully");
    },
    onError: () => {
      toast.error("Failed to accept case");
    },
  });
};

export default useAcceptCase;
