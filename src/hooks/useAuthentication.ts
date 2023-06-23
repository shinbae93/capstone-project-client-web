import { useNavigate } from 'react-router-dom'
import {
  LoginInput,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '../graphql/generated/graphql'
import {
  clearRefreshToken,
  clearToken,
  getRefreshToken,
  setRefreshToken,
  setToken,
} from '../utils/token'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const useAuthenication = () => {
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(AuthContext)

  const [loginMutation, { loading: loginLoading }] = useLoginMutation()
  const [refreshTokenMutation, { loading: refreshTokenLoading }] = useRefreshTokenMutation()
  const [logoutMutation, { loading: logoutLoading }] = useLogoutMutation()

  const handleLogin = (input: LoginInput) => {
    loginMutation({
      onCompleted: async (res) => {
        setToken(res.login.accessToken)
        setRefreshToken(res.login.refreshToken)
        navigate('/')
      },
      variables: {
        input,
      },
    })
  }

  const refreshToken = () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      refreshTokenMutation({
        onCompleted: (res) => {
          setToken(res.refreshToken)
        },
        variables: {
          token: refreshToken,
        },
      })
    }
  }

  const handleLogout = () => {
    logoutMutation({
      onCompleted: () => {
        clearToken()
        clearRefreshToken()
        setCurrentUser(null)
        navigate('/auth/login')
      },
    })
  }

  return {
    handleLogin,
    handleLogout,
    loginLoading,
    logoutLoading,
    refreshToken,
    refreshTokenLoading,
  }
}

export default useAuthenication
