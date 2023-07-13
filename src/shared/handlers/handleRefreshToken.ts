import { fromPromise, Observable } from '@apollo/client'
import { ErrorResponse } from '@apollo/client/link/error'
import { notification } from 'antd'
import { client } from '../../config/apollo-client'
import { RefreshTokenDocument } from '../../graphql/generated/graphql'
import { setRequestHeaders } from '../../utils/auth'
import { clearRefreshToken, clearToken, getRefreshToken, setToken } from '../../utils/token'

type CallbackFunction = (value?: unknown) => void

let isRefreshing = false
let pendingRequests: CallbackFunction[] = []

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}

const addPendingRequest = (pendingRequest: CallbackFunction) => {
  pendingRequests.push(pendingRequest)
}

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback())
  pendingRequests = []
}

export const handleRefreshToken = ({ forward, operation }: ErrorResponse) => {
  const refreshToken = getRefreshToken()
  if (!isRefreshing) {
    try {
      setIsRefreshing(true)
      return fromPromise(
        client
          .mutate({
            mutation: RefreshTokenDocument,
            variables: {
              token: refreshToken,
            },
          })
          .then((res) => {
            const token = res.data.refreshToken
            if (token) {
              setToken(token)
              setRequestHeaders({ operation, token })
              resolvePendingRequests()
              setIsRefreshing(false)
              return forward(operation)
            }
          })
          .catch(() => {
            clearToken()
            clearRefreshToken()
            notification.error({
              message: 'Your session is expired.',
            })
          })
      ).flatMap(() => {
        resolvePendingRequests()
        setIsRefreshing(false)
        return forward(operation) as unknown as Observable<unknown>
      })
    } catch (error) {
      setIsRefreshing(false)
      return fromPromise(
        new Promise((resolve) => {
          addPendingRequest(resolve)
        })
      )
    }
  }
}
