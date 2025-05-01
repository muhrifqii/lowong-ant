import { Database } from "./db"

export type JobType = Database["public"]["Enums"]["job_type"];

export const JobTypeLabel: Readonly<Record<JobType, string>> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
}

export type Job = Database["public"]["Tables"]["jobs"]["Row"];
export type CreateJob = Database["public"]["Tables"]["jobs"]["Insert"];
export type UpdateJob = Database["public"]["Tables"]["jobs"]["Update"];
