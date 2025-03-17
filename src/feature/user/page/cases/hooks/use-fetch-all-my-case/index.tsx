import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";
import { CasePaginationResponse } from "../../types/query.types";
import useAccountStore from "@/feature/public/auth/store/account.store";
import { ResponseDTO } from "@/feature/shared/other/interface/server.interface";
import { useSearchParams } from "react-router-dom";

const useFetchAllCases = () => {
  const { account } = useAccountStore();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  console.log(type);

  const { data } = useSuspenseFetch<ResponseDTO<CasePaginationResponse>>(
    `/case/${account?._id}/all?type=${type}`
  );

  return {
    result: data.payload,
  };
};

export default useFetchAllCases;
