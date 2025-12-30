"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IUser } from "@/types/user";
import { TFilterType } from "@/components/table/DataTable";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    filterType?: TFilterType;
    hideFilter?: boolean;
  }
}

const columnHelper = createColumnHelper<IUser>();

export const createUserColumns = (onDelete?: (user: IUser) => void) => [
  columnHelper.accessor("name", {
    header: "Name",
    filterFn: "includesString",
    meta: {
      filterType: "text",
    },
    cell: (info) => (
      <Link
        href={`/users/${info.row.original.id}`}
        className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    filterFn: "includesString",
    meta: {
      filterType: "text",
    },
    cell: (info) => <span className="text-slate-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.company.name, {
    id: "company",
    header: "Company",
    filterFn: "includesString",
    meta: {
      filterType: "select",
    },
    cell: (info) => <span className="text-cyan-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.address.city, {
    id: "city",
    header: "City",
    filterFn: "includesString",
    meta: {
      filterType: "autocomplete",
    },
    cell: (info) => <span className="text-slate-400">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    meta: {
      hideFilter: true,
    },
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Link
          href={`/users/${info.row.original.id}`}
          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
          title="Edit user"
        >
          <EditOutlined />
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(info.row.original)}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Delete user"
          >
            <DeleteOutlined />
          </button>
        )}
      </div>
    ),
  }),
];

export const userColumns = createUserColumns();
