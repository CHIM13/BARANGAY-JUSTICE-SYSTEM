import useSuspenseFetch from "@/common/hooks/query/useSuspenseFetch";
import { Profile } from "../../interfaces/account.interface";
import { SuccessResponse } from "@/feature/shared/other/interface/server.interface";

const useFetchProfile = () => {
  return useSuspenseFetch<SuccessResponse<Profile>>("/account/profile");
};

export default useFetchProfile;
