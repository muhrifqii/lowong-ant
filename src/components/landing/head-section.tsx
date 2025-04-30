import Link from "next/link";
import { Button } from "../ui/button";
import { SearchJobInput } from "../search-job-input";

export function HeadSection() {
  return (
    <section className="w-full py-24 text-center bg-gradient-to-r from-background to-primary/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Find Your Next Opportunity Effortlessly
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Discover startup and tech jobs with ease. Post or find a job in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/jobs/new">Post a Job</Link>
          </Button>
        </div>
      </div>
      <SearchJobInput />
    </section>
  );
}
