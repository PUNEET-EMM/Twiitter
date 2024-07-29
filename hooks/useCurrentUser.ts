import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Avoid refetching on window focus
    retry: 1, // Retry once on failure
  });

  return {
    user: query.data?.getCurrentUser,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

