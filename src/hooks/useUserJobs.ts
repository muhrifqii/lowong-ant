"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateJob, Job, JobType, UpdateJob } from "@/types/job";
import { getPagination } from "@/lib/paging";
import { getClientWithSession } from "@/lib/guard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/db";
import { createClient } from "@/lib/supabase/client";

export type SearchFilter = {
  title: string,
  location?: string,
  job_type: JobType[],
}

type Props = {
  ascending?: boolean,
  sortColumn?: keyof Job,
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

export function useJobSearch({
  pagination,
}: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState<Job | null>(null);
  const [error, setError] = useState(false);
  const [paging, setPaging] = useState(pagination);
  const [, setLastSearch] = useState(null as SearchFilter | null);

  const fetchFn = useCallback(async (search?: SearchFilter) => {
    const client = createClient();

    setLoading(true);
    setError(false);

    let pageIndex = paging.pageIndex;
    setLastSearch((prev) => {
      if (JSON.stringify(prev ?? {}) !== JSON.stringify(search ?? {})) {
        pageIndex = 0;
        setPaging({ pageIndex: 0, pageSize: 20 });
        setSelected(null);
        return search ?? null;
      }
      return prev;
    });
    const { from, to } = getPagination(pageIndex, 20);
    const queryBuilder = client
      .from("jobs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      if (search.title) {
        queryBuilder.ilike("title", search.title);
      }
      if (search.job_type.length > 0) {
        queryBuilder.in("job_type", search.job_type);
      }
      if (search.location) {
        queryBuilder.ilike("location", search.location);
      }
    }

    const { data, count, error } = await queryBuilder;

    if (error) {
      setError(true);
    } else if (data) {
      setJobs(data);
      setCount(count ?? 0);
    }
    setLoading(false);
  }, [paging.pageIndex]);

  useEffect(() => {
    const cleanup = fetchFn();
    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [fetchFn]);

  return {
    jobs, loading, count,
    selected, setSelected,
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
