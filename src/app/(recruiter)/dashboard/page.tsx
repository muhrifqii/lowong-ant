"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
}

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!session || sessionError) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, company_name, location, job_type")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, [router, supabase]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Jobs</h1>
        <Link
          href="/dashboard/jobs/new"
          className={buttonVariants({ variant: "default" })}
        >
          + New Job
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading your jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-muted-foreground">You haven’t posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {job.company_name} • {job.location} • {job.job_type}
                  </p>
                </div>
                <Link
                  href={`/dashboard/jobs/${job.id}/edit`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
