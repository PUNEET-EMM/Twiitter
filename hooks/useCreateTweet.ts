import { graphqlClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: async (newTweet) => {
      await queryClient.cancelQueries({ queryKey: ['all-tweets'] });
      const previousTweets = queryClient.getQueryData(['all-tweets']);
      queryClient.setQueryData(['all-tweets'], (old: any) => ({
        ...old,
        getAllTweets: [newTweet, ...old.getAllTweets],
      }));
      return { previousTweets };
    },
    onError: (err, newTweet, context) => {
      toast.error("Error creating tweet");
      if (context && context.previousTweets) {
        queryClient.setQueryData(['all-tweets'], context.previousTweets);
      }
    },
    onSuccess: () => {
      toast.success("Tweet created successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['all-tweets'] });
    },
  });

  return mutation;
};
