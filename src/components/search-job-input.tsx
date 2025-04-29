"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobType, JobTypeLabel } from "@/types/job";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Card } from "./ui/card";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

const searchSchema = z.object({
  position: z.string().min(3, "At least 3 characters long").max(50, "At most 50 characters long").optional(),
  location: z.string().min(3, "At least 3 characters long").max(50, "At most 50 characters long").optional().or(z.literal("")),
  jobType: z.array(z.nativeEnum(JobType)),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchJobInput() {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      position: "",
      location: "",
      jobType: [],
    },
  });

  function onSubmit(values: SearchFormValues) {
    const params = new URLSearchParams();
    if (values.position) params.append("position", values.position);
    if (values.location) params.append("location", values.location);
    if (values.jobType) params.append("jobType", values.jobType.join(","));
    router.push(`/jobs?${params.toString()}`);
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
                name="position"
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
                name="jobType"
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
                        {Object.values(JobType).map((type) => (
                          <DropdownMenuCheckboxItem
                            key={type}
                            checked={field.value?.includes(type)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), type]
                                : (field.value || []).filter((v) => v !== type);
                              field.onChange(newValue);
                            }}
                          >
                            {JobTypeLabel[type]}
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
