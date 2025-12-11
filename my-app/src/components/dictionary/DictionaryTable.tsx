"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    VisibilityState,
} from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpenText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutGrid } from "lucide-react";
import DeleteEntry from "@/components/ui/entry/DeleteEntry";
import { useEntries } from "@/hooks/entries/useEntries";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function DictionaryTable({ dictionaryId }: { dictionaryId: number }) {
    const t = useTranslations("Dashboard");
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        description: false,
    });

    const { data: entries = [], isLoading } = useEntries(session, dictionaryId);

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "original_name",
                header: "Mot",
            },
            {
                accessorKey: "translation",
                header: "Définition",
            },
            {
                accessorKey: "description",
                header: "Description",
            },
        ],
        []
    );

    const table = useReactTable({
        data: entries,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <Tabs defaultValue="entries" className="w-full flex-col gap-6 mt-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-2">
                    <BookOpenText className="text-primary" />
                    <h3 className="text-lg font-semibold">{t("Dictionary entries")}</h3>
                </div>
                <TabsList className="hidden @4xl/main:flex">
                    <TabsTrigger value="entries">{t("entries")}</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <LayoutGrid className="mr-2 h-4 w-4" />
                                {t("columns")}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter((column: any) => column.getCanHide())
                                .map((column: any) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        className="capitalize"
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <TabsContent value="entries" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                ) : table.getRowModel().rows.length === 0 ? (
                    <div className="text-muted-foreground text-sm">{t("Loading")}</div>
                ) : (
                    <div className="rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header: any) => (
                                            <TableHead key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row: any) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell: any) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <DeleteEntry
                                                entryId={row.original.id}
                                                onDeleted={(id) => {
                                                    queryClient.setQueryData<any[]>(
                                                        ["entries", session?.accessToken, dictionaryId],
                                                        (old = []) => old.filter((e) => e.id !== id)
                                                    );
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {!isLoading && (
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8 hidden lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8 hidden lg:flex"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>

                            <Select
                                value={String(table.getState().pagination.pageSize)}
                                onValueChange={(value) => table.setPageSize(Number(value))}
                            >
                                <SelectTrigger className="w-[72px]" size="sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <SelectItem key={size} value={String(size)}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}
