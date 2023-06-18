import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { handleRefreshToken } from '../shared/handlers/handleRefreshToken'
import { handleRequestError } from '../shared/handlers/handleRequestError'
import { setRequestHeaders } from '../utils/auth'
import { getToken } from '../utils/token'
import { omitDeep } from '../utils/type'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()
  setRequestHeaders({ operation, token })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    if ((graphQLErrors[0]?.extensions?.originalError as any)?.statusCode === 401) {
      //  We assume we have both tokens needed to run the async request
      handleRefreshToken({ forward, operation })
    }
    handleRequestError({ graphQLErrors, operation })
  }
})

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (!operation.variables.file) {
    operation.variables = omitDeep(operation.variables, '__typename')
  }
  return forward(operation)
})

export const client = new ApolloClient({
  link: from([cleanTypenameLink, authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})
