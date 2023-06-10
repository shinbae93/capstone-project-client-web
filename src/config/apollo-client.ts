import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { get } from 'lodash'
import { handleRefreshToken } from '../shared/handlers/handleRefreshToken'
import { handleRequestError } from '../shared/handlers/handleRequestError'
import { setRequestHeaders } from '../utils/auth'
import { getToken } from '../utils/token'

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
    if (get(graphQLErrors[0], 'statusCode') === 401) {
      //  We assume we have both tokens needed to run the async request
      handleRefreshToken({ forward, operation })
    }
    handleRequestError({ graphQLErrors, operation })
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})
