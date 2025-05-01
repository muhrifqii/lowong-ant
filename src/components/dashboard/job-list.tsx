import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Job, JobTypeLabel } from "@/types/job";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PagingView } from "@/components/paging-view";
import { OnChangeFn } from "@/types/common";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export type JobListProps = {
  jobs: Job[],
  loading: boolean,
  actions: {
    view: (item: Job) => void,
    edit: (item: Job) => void,
    delete: (item: Job) => void,
  },
  totalItems: number,
  pagination: PaginationState,
  onPaginationChange: OnChangeFn<PaginationState>,
}

function prepareColumns(action: JobListProps["actions"]): ColumnDef<Job>[] {
  const columns: ColumnDef<Job>[] = [
    {
      accessorKey: "title",
      header: "Title",
      size: 400,
    },
    {
      accessorKey: "company_name",
      header: "Company",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "job_type",
      header: "Type",
      cell: ({ row }) => JobTypeLabel[row.original.job_type],
    },
    {
      id: "actions",
      size: 60,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => action.view(item)}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => action.edit(item)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className={cn("text-destructive hover:text-destructive")}>
                      Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the job post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => action.delete(item)}>
                        Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
}


export function JobList({ jobs, loading, actions, pagination, onPaginationChange, totalItems, }: JobListProps) {

  const columns = useMemo(() => prepareColumns(actions), [actions]);
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton className="h-4 w-full" />
            )
          }))
        : columns,
    [loading, columns]
  );
  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : jobs),
    [loading, jobs]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    defaultColumn: {
      minSize: 10,
      maxSize: 2000,
    },
    rowCount: totalItems,
    initialState: {
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} sizing={header.column.columnDef}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length || loading ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} sizing={cell.column.columnDef}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PagingView table={table} />
    </div>
  );
}
