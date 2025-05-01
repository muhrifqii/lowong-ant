import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateJob, Job, UpdateJob } from "@/types/job";
import { getPagination } from "@/lib/paging";
import { getClientWithSession } from "@/lib/guard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/db";

type Props = {
  ascending?: boolean
  sortColumn?: keyof Job
  pagination: { pageIndex: number, pageSize: number },
}

export function useUserJobList({
    ascending = false,
    sortColumn = "created_at",
    pagination,
}: Props) {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [paging, setPaging] = useState(pagination);

  const fetchFn = useCallback(async () => {
    let isMounted = true;

    const { client, userId } = await getClientWithSession(router);

    if (!client && !userId) {
      return;
    }

    setLoading(true);
    setError(false);
    const { from ,to } = getPagination(paging.pageIndex, paging.pageSize);
    const { data, count, error } = await client
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order(sortColumn, { ascending })
      .range(from, to);

    if (!isMounted) return;

    if (error) {
      setError(true);
    } else if (data) {
      setJobs(data);
      setCount(count ?? 0);
    }
    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, [router, paging.pageIndex, paging.pageSize, sortColumn, ascending]);

  useEffect(() => {
    const cleanup = fetchFn();
    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [fetchFn]);

  return {
    jobs, loading, count,
    error,
    fetchFn,
    paging,
    setPaging,
  };
}


export function userJobCRUD(client: SupabaseClient<Database>) {

  const create = async (createJob: CreateJob) => {
    return await client.from("jobs").insert(createJob).select();
  }

  const read = async (id: string) => {
    return await client.from("jobs").select("*").eq("id", id);
  }

  const update = async (updateJob: UpdateJob, id: string) => {
    return await client.from("jobs").update(updateJob).eq("id", id).select();
  }

  const remove = async (id: string) => {
    return await client.from("jobs").delete().eq("id", id);
  }

  return { create, read, update, remove }
}
