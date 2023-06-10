import { Operation } from '@apollo/client'
import { GraphQLErrors } from '@apollo/client/errors'
import { message, notification } from 'antd'

interface RequestErrorProps {
  graphQLErrors: GraphQLErrors
  operation: Operation
}

export const handleRequestError = ({ graphQLErrors, operation }: RequestErrorProps) => {
  console.log(
    '🚀 ~ file: handleRequestError.tsx:11 ~ handleRequestError ~ graphQLErrors:',
    graphQLErrors
  )
  if (operation.operationName === 'refreshToken') return

  notification.error({
    message: graphQLErrors[0]?.message,
  })
}
