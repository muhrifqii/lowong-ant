"use client";

import { JobDetailCard } from "@/components/job-detail";
import { SearchJobInput } from "@/components/search-job-input";
import { Card } from "@/components/ui/card";
import { useJobSearch } from "@/hooks/useUserJobs";
import { Job } from "@/types/job";
import Link from "next/link";
import { useEffect } from "react";

export default function JobsPage() {
  const {
    jobs,
    selected,
    setSelected,
    fetchFn,
  } = useJobSearch({
    pagination: { pageIndex: 0, pageSize: 20 },
  });

  useEffect(() => {
    console.log("effect", jobs, selected);
    if (jobs.length > 0 && !selected) {
      setSelected(jobs[0]);
    }
  }, []);

  return (
    <main className="">
      <div>
        <section className="w-full py-24 text-center bg-gradient-to-r from-background to-primary/20">
          <SearchJobInput asUrlSearch={false} onSubmit={fetchFn} />
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="space-y-2 md:col-span-1">
            {jobs.map((job) => (
              <Card
                key={job.id}
                onClick={() => setSelected(job)}
                className={`cursor-pointer p-4 border text-left transition hover:bg-muted rounded-xl ${
                  selected?.id === job.id ? "bg-muted" : ""
                }`}
              >
                <div className="font-semibold text-base text-foreground">{job.title}</div>
                <div className="text-xs text-muted-foreground">{job.company_name}</div>
              </Card>
            ))}
          </aside>
          <section className="md:col-span-2">
            <JobDetailCard job={selected as Job} />
          </section>
        </div>
      </div>
    </main>
  );
}
