// import {GraphQLClient} from "graphql-request"

// const isClient = typeof window !=="undefined"

// export const graphqlClient =new GraphQLClient("http://localhost:8000/graphql",{
//     headers: ()=>({
//             Authorization: isClient 
//          ?`Bearer ${window.localStorage.getItem("token")}`:"",

//     })
// });

import {GraphQLClient} from "graphql-request"

const isClient = typeof window !=="undefined"

export const graphqlClient =new GraphQLClient("https://server-twitter-s390.onrender.com/graphql",{
    headers: ()=>({
            Authorization: isClient 
         ?`Bearer ${window.localStorage.getItem("token")}`:"",

    })
});