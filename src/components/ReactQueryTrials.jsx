import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

//create a new client
const queryClient = new QueryClient()

//pass the client to the app using queryclientprovider
export default function ReactQueryTrials(){
    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <Example />
            </QueryClientProvider>                
        </div>
    )
}

//access the client through separate component
function Example(){
    const { isLoading, error, data } = useQuery('repoData', ()=>
        fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res=>{
            return(res.json())
        }
    )
    )
    if(isLoading) return 'loading'
    if(error) return 'an error has occured. :' + error.message
    //Queries
    //const query = useQuery('query', api)
    //query in this case has a key 'query', followed by a promise which returns data or throws err
    //key must be unique and is used for refetching, caching etc.
    //same key can be used for different queries. just need to be specified in an array.
    // useQuery(['queryKey', variable], ()=>fetchWithVariable(variable))
    
    //has the states 'isLoading', 'isError', 'isSuccess' and 'isIdle' to keep track of information
    //has secondary states 'data', 'error', 'isFetching' to keep track of resulting data.

    //Mutations
    //const mutation = useMutation(api, {onSuccess:()=>{queryClient.invalidateQueries('query')}})
    //invalidate and re fetch the query with key 'query' when done.

    //can be used with asynchronous data fetching too, like graphql
    return(
        <div>
        </div>
    )
}


// export default ReactQueryTrials;