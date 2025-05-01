"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobType, JobTypeLabel, SearchFilter } from "@/types/job";
import { type UnionToTuple } from "type-fest"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Card } from "./ui/card";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

const searchSchema = z.object({
  title: z.string().min(3, "At least 3 characters long").max(50, "At most 50 characters long").optional().or(z.literal("")),
  location: z.string().min(3, "At least 3 characters long").max(50, "At most 50 characters long").optional().or(z.literal("")),
  job_type: z.array(z.enum<string, UnionToTuple<JobType>>(["FULL_TIME", "PART_TIME", "CONTRACT"])),
});

type SearchFormValues = z.infer<typeof searchSchema>;

type SearchJobInputProp = {
  onSubmit?: (search?: SearchFilter) => void,
  asUrlSearch?: boolean,
};

export function SearchJobInput({ asUrlSearch = true, onSubmit: handleSubmit }: SearchJobInputProp) {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      title: "",
      location: "",
      job_type: [],
    },
  });

  function onSubmit(values: SearchFormValues) {
    if (asUrlSearch) {
      const params = new URLSearchParams();
      if (values.title) params.append("title", values.title);
      if (values.location) params.append("location", values.location);
      if (values.job_type.length > 0) params.append("job_type", values.job_type.join(","));
      router.push(`/jobs?${params.toString()}`);
      return;
    }
    if (handleSubmit) {
      if (!values.title && !values.location && values.job_type.length === 0) {
        handleSubmit();
      } else {
        handleSubmit({...values, title: values.title ?? ""});
      }
    }
  }

  return (
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="p-6 md:p-8 shadow-md border border-border rounded-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col min-[900px]:flex-row items-start gap-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormControl>
                      <Input
                        placeholder="Job title or keyword"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full min-[900px]:max-w-[200px]">
                    <FormControl>
                      <Input placeholder="Location" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem className="w-full min-[900px]:w-[200px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full h-12 justify-between text-sm font-medium")}
                          >
                            {field.value?.length
                              ? `${field.value.length} Selected`
                              : (<span className="text-muted-foreground">Select job types</span>)}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-[900px]:w-[200px] w-[300px]" align="end">
                        {Object.keys(JobTypeLabel).map((type) => (
                            <DropdownMenuCheckboxItem
                            key={type}
                            checked={field.value?.includes(type as JobType)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                              ? [...(field.value || []), type as JobType]
                              : (field.value || []).filter((v) => v !== type);
                              field.onChange(newValue);
                            }}
                            >
                            {JobTypeLabel[type as JobType]}
                            </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" className="w-full min-[900px]:w-12 h-12" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </Card>
      </div>
  );
}
