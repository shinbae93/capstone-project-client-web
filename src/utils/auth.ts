import { Operation } from '@apollo/client'
import { ErrorResponse } from '@apollo/client/link/error'

interface Props {
  operation: ErrorResponse['operation'] | Operation
  token?: string | null
}

export const setRequestHeaders = ({ operation, token }: Props) => {
  const { headers } = operation.getContext()
  operation.setContext({
    headers: {
      ...headers,
      ...(token && {
        authorization: `Bearer ${token}`,
      }),
    },
  })
}
