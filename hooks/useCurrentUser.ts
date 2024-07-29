// import { graphqlClient } from "@/clients/api";
// import { getCurrentUserQuery } from "@/graphql/query/user";
// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { GetCurrentUserQuery } from "@/graphql/generated";

// interface CurrentUserData {
//   getCurrentUser: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

// export const useCurrentUser = (): UseQueryResult<CurrentUserData, Error> & { user: CurrentUserData['getCurrentUser'] | undefined } => {
//   const query = useQuery({
//     queryKey: ["current-user"],
//     queryFn: () => graphqlClient.request<GetCurrentUserQuery>(getCurrentUserQuery),
//     // staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
//     // retry: 2, // Retry failed requests up to 2 times
//   });

//   return {
//     ...query,
//     user: query.data?.getCurrentUser,
//   };
// };


import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import {  useQuery } from "@tanstack/react-query"

export const useCurrentUser =()=>{
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn :()=> graphqlClient.request(getCurrentUserQuery)

    })
    return {...query,user: query.data?.getCurrentUser}
}
