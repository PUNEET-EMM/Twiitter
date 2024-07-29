import { graphqlClient } from "@/clients/api";
import { getAllTweetQuery } from "@/graphql/query/tweet";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Tweet {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  // Add other tweet fields here
}

interface GetAllTweetsData {
  getAllTweets: Tweet[];
}

export const useGetAllTweets = (): UseQueryResult<GetAllTweetsData, Error> & { tweets: Tweet[] | undefined } => {
  const query = useQuery<GetAllTweetsData, Error>({
    queryKey: ['all-tweets'],
    queryFn: () => graphqlClient.request<GetAllTweetsData>(getAllTweetQuery),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  return {
    ...query,
    tweets: query.data?.getAllTweets,
  };
};
