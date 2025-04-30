import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Job } from "@/types/job";

type Props = {
  ascending?: boolean
  sortColumn?: keyof Job
}

export function useUserJobList({
    ascending = false,
    sortColumn = "created_at",
}: Props) {
  const supabase = createClient();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchFn = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/auth");
      toast.error("Session Expired");
      return;
    }

    setLoading(true);
    setError(false);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", session.user.id)
      .order(sortColumn, { ascending });

    if (error) {
      setError(true);
    } else if (data) {
      setJobs(data);
    }
    setLoading(false);
  }, [ascending, sortColumn, supabase, router]);

  useEffect(() => {
    void fetchFn();
  }, [fetchFn]);

  return { jobs, loading, error, fetchFn };
}
