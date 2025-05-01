import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";
import { Job, JobTypeLabel } from "@/types/job";
import { format } from 'date-fns';

export function JobDetailCard({ job }: { job: Job }) {
  const { company_name, location, job_type, description, title, created_at } = job;

  return (
    <div className="w-full">
      <section className="mb-10 border border-border rounded-2xl p-6 shadow-sm bg-background">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 text-foreground flex items-center gap-2">
          {title}
        </h1>
        <div className="grid gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-lg font-medium">{company_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{JobTypeLabel[job_type]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Posted on <span className="">{format(created_at, "iiii, dd MMM yyyy 'at' HH:mm OOO")}</span>
          </div>
        </div>
      </section>

      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Job Description</h2>
        <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {description}
        </div>
      </section>
    </div>
  );
}
