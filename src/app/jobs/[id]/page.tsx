import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { SlugParam } from "@/types/common";
import { JobDetailCard } from "@/components/job-detail";

export async function generateMetadata({ params }: SlugParam): Promise<Metadata> {
  const { id } = await params;
  const client = await createClient();
  const { data: job } = await client.from("jobs").select("title,company_name").eq("id", id).single();

  return {
    title: job ? `${job?.title} - ${job?.company_name}` : "Job Detail",
  };
}

export default async function JobDetailPage({ params }: SlugParam) {
  const { id } = await params;
  const client = await createClient();
  const { data: job } = await client.from("jobs").select("*").eq("id", id).single();

  if (!job) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <JobDetailCard job={job} />
    </main>
  );
}
