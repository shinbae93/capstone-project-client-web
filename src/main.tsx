import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization:
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwNGQ5MDY1LWRmM2QtNDNhMC1hNDM3LTkxMjBmODRlMDk4MyIsImZ1bGxuYW1lIjoiSHVuZyBOZ3V5ZW4iLCJlbWFpbCI6InNpbmUuaHVuZ25ndXllbkBnbWFpbC5jb20iLCJyb2xlIjoiMzMzNThkYmYtNzY5Ny00MzI0LWJjY2QtMzM0YTM2OTFiODRiIiwiaWF0IjoxNjg1Nzg0MTEzLCJleHAiOjE2ODU4MjczMTN9.nYZ-1ZVs5q9N7OPDu35-HC19vbtKqs0GOELaqQalCCc',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
