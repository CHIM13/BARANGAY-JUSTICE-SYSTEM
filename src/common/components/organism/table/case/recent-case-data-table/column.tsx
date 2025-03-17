"use client";

import { Row, Table } from "@tanstack/react-table";
import { Checkbox } from "@/common/components/atoms/ui/checkbox";
import { Link } from "react-router-dom";
import { Case } from "@/feature/user/interface/case";
import { RecentCaseDataTableActionCell } from "./cells";

export const RecentCaseDataTableColumn = [
  {
    id: "select",
    header: ({ table }: { table: Table<Case> }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Case> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "caseNumber",
    header: "Case Number",
    cell: ({ row }: { row: Row<Case> }) => (
      <Link to={`/cases/${row.original.id}`}>
        <span className="font-semibold hover:underline">
          {row.original.caseNumber}
        </span>
      </Link>
    ),
  },
  {
    accessorKey: "caseType",
    header: "Case Type",
  },
  {
    accessorKey: "filingDate",
    header: "Filing Date",
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Case> }) => (
      <RecentCaseDataTableActionCell caseData={row.original} />
    ),
  },
];
