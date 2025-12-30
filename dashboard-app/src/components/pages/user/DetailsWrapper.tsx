"use client";

import { useQuery } from "@tanstack/react-query";
import Details from "./Details";
import { fetchUser } from "@/api/user";
import Loading from "@/app/users/[id]/loading";
import Error from "@/app/error";
import NotFound from "@/components/pages/NotFound";

interface IDetailsWrapperProps {
  userId: string;
}

export default function DetailsWrapper(props: IDetailsWrapperProps) {
  const { userId } = props;
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  if (!user) return <NotFound />;

  return <Details user={user} />;
}
