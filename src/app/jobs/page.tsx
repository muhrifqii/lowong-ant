/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { JobDetailCard } from "@/components/job-detail";
import { SearchJobInput } from "@/components/search-job-input";
import { Card } from "@/components/ui/card";
import { useJobSearch } from "@/hooks/useUserJobs";
import { mapSearchParamToJobSearchFilter } from "@/lib/mapper";
import { Job } from "@/types/job";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function JobWithQueryHandler() {
  const {
    jobs,
    selected,
    setSelected,
    fetchFn,
  } = useJobSearch();
  const params = useSearchParams();

  useEffect(() => {
    if (params.size === 0) {
      fetchFn();
    }
  }, []);
  useEffect(() => {
    const query = mapSearchParamToJobSearchFilter(params);
    if (query.title || query.location || query.job_type.length > 0) {
      fetchFn(query);
      window.history.replaceState(null, '', '/jobs');
    }
  }, [params]);
  return (
    <main className="">
      <div>
        <section className="w-full py-24 text-center bg-gradient-to-r from-background to-primary/20">
          <SearchJobInput asUrlSearch={false} onSubmit={fetchFn} />
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {
          jobs.length > 0 ?
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
          :
          <div className="text-center text-4xl">No Result Found</div>
        }
      </div>
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense>
      <JobWithQueryHandler />
    </Suspense>
  );
}
