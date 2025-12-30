'use client';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
} from '@tanstack/react-table';
import { useState, useCallback } from 'react';
import {
  SearchOutlined,
  CloseOutlined,
  FilterOutlined,
  ReloadOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import Autocomplete from '@/components/inputs/Autocomplete';
import Dropdown from '@/components/inputs/Dropdown';

export type TFilterType = 'text' | 'autocomplete' | 'select';

type TPendingFilters = Record<string, string>;

function ColumnFilter({
  columnId,
  placeholder,
  type,
  options,
  value,
  onChange,
}: {
  columnId: string;
  placeholder: string;
  type: TFilterType;
  options?: string[];
  value: string;
  onChange: (columnId: string, value: string) => void;
}) {
  const filterType = type ?? 'text';

  const handleChange = (newValue: string) => {
    onChange(columnId, newValue);
  };

  switch (filterType) {
    case 'autocomplete':
      return (
        <Autocomplete
          options={options ?? []}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      );

    case 'select':
      return (
        <Dropdown
          options={options ?? []}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      );

    case 'text':
    default:
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          style={{ color: '#ffffff', backgroundColor: '#1e293b' }}
          className="w-full px-2 py-1.5 text-xs border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        />
      );
  }
}

interface IDataTableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  globalFilterFn?: FilterFn<T>;
  searchPlaceholder?: string;
  emptyMessage?: string;
  showSearch?: boolean;
  showColumnFilters?: boolean;
  columnFilters?: Record<string, { options?: string[] }>;
}

export default function DataTable<T>(props: IDataTableProps<T>) {
  const {
    data,
    columns,
    globalFilterFn,
    searchPlaceholder = 'Search...',
    emptyMessage = 'No results found',
    showSearch = true,
    showColumnFilters = true,
    columnFilters: columnFilterConfigs = {},
  } = props;

  const [pendingGlobalFilter, setPendingGlobalFilter] = useState('');
  const [pendingColumnFilters, setPendingColumnFilters] =
    useState<TPendingFilters>({});

  const [appliedGlobalFilter, setAppliedGlobalFilter] = useState('');
  const [appliedColumnFilters, setAppliedColumnFilters] =
    useState<ColumnFiltersState>([]);

  const handlePendingFilterChange = useCallback(
    (columnId: string, value: string) => {
      setPendingColumnFilters((prev) => ({
        ...prev,
        [columnId]: value,
      }));
    },
    []
  );

  const handleApplyFilters = useCallback(() => {
    setAppliedGlobalFilter(pendingGlobalFilter);

    const newColumnFilters: ColumnFiltersState = Object.entries(
      pendingColumnFilters
    )
      .filter(([, value]) => value !== '')
      .map(([id, value]) => ({ id, value }));

    setAppliedColumnFilters(newColumnFilters);
  }, [pendingGlobalFilter, pendingColumnFilters]);

  const handleResetFilters = useCallback(() => {
    setPendingGlobalFilter('');
    setPendingColumnFilters({});
    setAppliedGlobalFilter('');
    setAppliedColumnFilters([]);
  }, []);

  const defaultGlobalFilterFn: FilterFn<T> = (
    row: Row<T>,
    _columnId: string,
    filterValue: string
  ) => {
    const search = filterValue.toLowerCase();
    const values = Object.values(row.original as object);
    return values.some((val) => {
      if (typeof val === 'string') {
        return val.toLowerCase().includes(search);
      }
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).some(
          (nestedVal) =>
            typeof nestedVal === 'string' &&
            nestedVal.toLowerCase().includes(search)
        );
      }
      return false;
    });
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: appliedGlobalFilter,
      columnFilters: appliedColumnFilters,
    },
    globalFilterFn: globalFilterFn ?? defaultGlobalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const hasPendingChanges =
    pendingGlobalFilter !== appliedGlobalFilter ||
    JSON.stringify(
      Object.entries(pendingColumnFilters).filter(([, v]) => v !== '')
    ) !==
      JSON.stringify(appliedColumnFilters.map(({ id, value }) => [id, value]));

  return (
    <>
      {showSearch && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              type="text"
              value={pendingGlobalFilter}
              onChange={(e) => setPendingGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            {pendingGlobalFilter && (
              <button
                onClick={() => setPendingGlobalFilter('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <CloseOutlined />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm text-slate-400">
          Showing{' '}
          <span className="text-emerald-400 font-medium">
            {table.getRowModel().rows.length}
          </span>{' '}
          of <span className="text-white font-medium">{data.length}</span>{' '}
          results
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Apply Filters"
            onClick={handleApplyFilters}
            className={`p-2 border rounded-lg transition-all duration-200 ${
              hasPendingChanges
                ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-400 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 hover:text-emerald-300'
            }`}
          >
            <FilterOutlined />
          </button>

          <button
            type="button"
            title="Reset All Filters"
            onClick={handleResetFilters}
            className="p-2 bg-slate-700/50 text-slate-400 border border-slate-600 rounded-lg hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
          >
            <ReloadOutlined />
          </button>
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full min-w-[600px]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-slate-700/50"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        {showColumnFilters &&
                          !header.column.columnDef.meta?.hideFilter && (
                            <ColumnFilter
                              columnId={header.column.id}
                              placeholder="Filter..."
                              type={
                                (header.column.columnDef.meta
                                  ?.filterType as TFilterType) ?? 'text'
                              }
                              options={
                                columnFilterConfigs[header.column.id]?.options
                              }
                              value={
                                pendingColumnFilters[header.column.id] ?? ''
                              }
                              onChange={handlePendingFilterChange}
                            />
                          )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-700/20 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.getRowModel().rows.length === 0 && (
          <div className="py-12 text-center">
            <InboxOutlined className="text-5xl text-slate-600 mb-4" />
            <p className="text-slate-400">{emptyMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
