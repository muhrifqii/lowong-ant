import { AuthWithPasswordResponse } from "@/types/auth";
import { JobType, JobTypeLiterals, SearchFilter } from "@/types/job";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/auth-js"
import { ReadonlyURLSearchParams } from "next/navigation";

export function mapAuthResponse({data, error}: AuthTokenResponsePassword | AuthResponse): AuthWithPasswordResponse {
  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error,
  } as AuthWithPasswordResponse;
}

const comparer: string[] = [...JobTypeLiterals];

export function mapSearchParamToJobSearchFilter(param: ReadonlyURLSearchParams): SearchFilter {
  const typesArr = (param.get("job_type") ?? "")
    .split(",")
    .filter((x) => comparer.includes(x))
    .map((x) => x as JobType);

  return {
    title: param.get("title") ?? "",
    job_type: typesArr,
    location: param.get("location") ?? "",
  }
}
