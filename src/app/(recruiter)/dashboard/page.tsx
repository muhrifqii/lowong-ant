"use client";

import { Button } from "@/components/ui/button";
import { useUserJobList } from "@/hooks/useUserJobs";
import { JobList, JobListProps } from "@/components/dashboard/job-list";
import { CreateJob, Job, UpdateJob } from "@/types/job";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { JobForm, SubmitJobFn } from "@/components/dashboard/job-form";
import { OnChangeFn, RouterlikeType, Updater } from "@/types/common";
import { useState } from "react";
import { getClientWithSession } from "@/lib/guard";
import { useRouter } from "next/navigation";

type ManageJobSheetProps = {
  mode: ModePayload,
  onOpenChange?: OnChangeFn<boolean>,
  onSubmit: SubmitJobFn,
  onSuccess?: () => void,
};

type ModePayload = {
  mode: "create" | "update" | null,
  job?: UpdateJob,
};

function ManageJobSheet({ mode, onOpenChange, onSubmit, onSuccess }: ManageJobSheetProps) {
  const open = !!mode.mode;
  const title = (mode.mode === "update") ? "Update Job" : "Post a New Job";
  const handleChange = (open: boolean) => {
    onOpenChange?.(open);
  };

  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Fill out the details and submit to publish your job listing.</SheetDescription>
        </SheetHeader>
        <div className="m-6">
          <JobForm mode={mode.mode ?? "create"} initialValues={mode.job} onSubmit={onSubmit} onSuccess={onSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const submitFn = (router: RouterlikeType) => async (
  {createJob, updateJob}
: {
  createJob?: CreateJob,
  updateJob?: UpdateJob,
}) => {
  const { client } = await getClientWithSession(router);
  if (!client) {
    return { error: Error("") };
  }

  if (createJob) {
    const result = await client.from("jobs").insert(createJob).select();
    return result;
  } else if (updateJob) {
    const result = await client.from("jobs").update(updateJob).select();
    return result;
  }
  return { error: null };
}

export default function DashboardPage() {
  const router = useRouter();
  const {
    jobs, count, loading,
    paging, setPaging,
    fetchFn,
  } = useUserJobList({
    pagination: { pageIndex: 0, pageSize: 10 }
  });
  const [mode, setMode] = useState<ModePayload>({ mode: null });

  const submit = submitFn(router);
  const actions: JobListProps["actions"] = {
    view: (item: Job) => {
      console.log('view', item);
    },
    edit: (item: Job) => {
      setMode({ mode: "update", job: item });
    },
    delete: (item: Job) => {
      console.log('delete', item);
    }
  };

  const create = () => {
    setMode({ mode: "create" });
  };

  const onSheetOpenChanged = (open: Updater<boolean>) => {
    if (!open) setMode({ mode: null });
  };

  const onSuccessChange = async () => {
    setMode({ mode: null });
    await fetchFn();
  };
  console.log("loading", loading, jobs)

  return (
    <main className="flex w-full flex-col justify-start gap-6">
      <ManageJobSheet
        mode={mode}
        onOpenChange={onSheetOpenChanged}
        onSubmit={submit}
        onSuccess={onSuccessChange}
        />
      <div className="relative flex flex-col gap-4 overflow-hidden px-4 lg:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Job Listing</h1>
          <Button className="ml-auto" onClick={create}>
            <Plus className="mr-2 h-4 w-4" /> New Job
          </Button>
        </div>
        <JobList
          jobs={jobs}
          loading={loading}
          totalItems={count}
          actions={actions}
          pagination={paging}
          onPaginationChange={setPaging}
        />
      </div>
    </main>
  );
}
