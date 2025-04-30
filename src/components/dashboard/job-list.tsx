import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Job } from "@/types/job";

export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <li key={job.id} className="border p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-muted-foreground">
                {job.company_name} \u2022 {job.location} \u2022 {job.job_type}
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
  );
}
