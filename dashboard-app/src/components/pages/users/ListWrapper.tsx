"use client";

import { useQuery } from "@tanstack/react-query";
import List from "./List";
import { fetchUsers } from "@/api/user";
import Loading from "@/app/users/loading";
import NotFound from "@/components/pages/NotFound";
import Error from "@/app/error";

export default function UsersListPage() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  if (!users || users.length === 0) return <NotFound />;

  return <List users={users} />;
}
