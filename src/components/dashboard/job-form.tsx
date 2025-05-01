"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateJob, JobType, JobTypeLabel, UpdateJob } from "@/types/job";
import { toast } from "sonner";
import { UnionToTuple } from "type-fest";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  company_name: z.string().min(2),
  location: z.string().min(2),
  job_type: (z.enum<string, UnionToTuple<JobType>>(["FULL_TIME", "PART_TIME", "CONTRACT"])),
  description: z.string().min(10),
});

export type JobFormValues = z.infer<typeof formSchema>;
export type SubmitJobArg = { createJob?: CreateJob, updateJob?: UpdateJob, id?: string };
export type SubmitJobFn = (value: SubmitJobArg) => Promise<{error: Error | null}>;

export type JobFormProps = {
  mode: "create" | "update",
  initialValues?: UpdateJob,
  onSubmit: SubmitJobFn,
  onSuccess?: () => void,
};

export function JobForm({ mode, initialValues, onSubmit, onSuccess }: JobFormProps) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: '',
      company_name: '',
      location: '',
      job_type: undefined,
      description: '',
    },
  });

  const handleSubmit = async (values: JobFormValues) => {
    let err: Error | null;
    if (mode === "update") {
      const { title, description, job_type, location, company_name } = form.formState.dirtyFields;
      const updateJob: UpdateJob = {};
      if (title) {
        updateJob.title = values.title;
      }
      if (description) {
        updateJob.description = values.description;
      }
      if (job_type) {
        updateJob.job_type = values.job_type;
      }
      if (location) {
        updateJob.location = values.location;
      }
      if (company_name) {
        updateJob.company_name = values.company_name;
      }
      const { error } = await onSubmit({ updateJob, id: initialValues?.id });
      err = error;
    } else {
      const { error } = await onSubmit({ createJob: values });
      err = error;
    }
    if (err) toast.error(err.message);
    else {
      toast.success(`Job ${mode === "create" ? "created" : "updated"} successfully`);
      onSuccess?.();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Remote, Jakarta, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(JobTypeLabel).map((typeStr) => {
                    const type = typeStr as JobType;
                    return (
                      <SelectItem key={typeStr} value={type}>{JobTypeLabel[type]}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={10} placeholder="Describe the job role, requirements, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          disabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
          className="w-full">
          {mode === "create" ? "Post Job" : "Update Job"}
        </LoadingButton>
      </form>
    </Form>
  );
}
