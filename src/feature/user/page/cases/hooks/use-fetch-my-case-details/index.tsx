import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";
import { Case } from "../../types/query.types";
import { SuccessResponse } from "@/feature/shared/other/interface/server.interface";

const useFetchMyCaseDetails = (id: string) => {
  if (!id) {
    throw new Error("ID is required");
  }
  return useSuspenseFetch<SuccessResponse<Case>>(`/case/details/${id}`);
};

export default useFetchMyCaseDetails;
