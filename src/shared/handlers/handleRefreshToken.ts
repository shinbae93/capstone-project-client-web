import { fromPromise, Observable } from '@apollo/client'
import { ErrorResponse } from '@apollo/client/link/error'
import { LogoutDocument, RefreshTokenDocument } from '../../graphql/generated/graphql'
import { clearRefreshToken, clearToken, getRefreshToken, setToken } from '../../utils/token'
import { client } from '../../config/apollo-client'
import { setRequestHeaders } from '../../utils/auth'
import { MyWindow } from '../../utils/type'
import { notification } from 'antd'

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
              input: {
                refreshToken,
              },
            },
          })
          .then((res) => {
            const token = res.data?.refreshToken?.token
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
            ;(window as unknown as MyWindow).pushLogin()
            client.mutate({
              mutation: LogoutDocument,
              variables: {
                input: {
                  refreshToken,
                },
              },
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
