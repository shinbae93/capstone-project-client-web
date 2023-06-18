import { Operation } from '@apollo/client'
import { GraphQLErrors } from '@apollo/client/errors'
import { notification } from 'antd'

interface RequestErrorProps {
  graphQLErrors: GraphQLErrors
  operation: Operation
}

export const handleRequestError = ({ graphQLErrors, operation }: RequestErrorProps) => {
  if (operation.operationName === 'refreshToken') return

  notification.error({
    message: graphQLErrors[0]?.message,
  })
}
