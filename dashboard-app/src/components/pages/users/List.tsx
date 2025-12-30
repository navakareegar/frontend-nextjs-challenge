"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { IUser } from "@/types/user";
import DataTable from "@/components/table/DataTable";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { createUserColumns } from "./Columns";
import { deleteUser } from "@/api/user";
import { userGlobalFilterFn } from "@/cnfs/UserForm";

interface IListProps {
  users: IUser[];
}

export default function List(props: IListProps) {
  const { users } = props;
  const queryClient = useQueryClient();
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setUserToDelete(null);
    },
  });

  const cityOptions = useMemo(() => {
    const cities = users.map((user) => user.address.city);
    return [...new Set(cities)].sort();
  }, [users]);

  const companyOptions = useMemo(() => {
    const companies = users.map((user) => user.company.name);
    return [...new Set(companies)].sort();
  }, [users]);

  const columns = useMemo(
    () => createUserColumns((user: IUser) => setUserToDelete(user)),
    []
  );

  const handleDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Users
            </h1>
            <p className="text-slate-400">
              Manage and view all registered users
            </p>
          </div>
          <Link
            href="/users/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300"
          >
            <PlusOutlined />
            Add User
          </Link>
        </div>

        <DataTable
          data={users}
          columns={columns}
          globalFilterFn={userGlobalFilterFn}
          searchPlaceholder="Search by name, email, company, or city..."
          emptyMessage="No users found matching your criteria"
          columnFilters={{
            city: { options: cityOptions },
            company: { options: companyOptions },
          }}
        />
      </div>

      <ConfirmModal
        isOpen={!!userToDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setUserToDelete(null)}
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  );
}
