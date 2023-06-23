import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/token'
import Loading from '../components/Loading'
import { AuthContext } from '../../context/auth.context'
import { User, useGetMeLazyQuery } from '../../graphql/generated/graphql'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { setCurrentUser } = useContext(AuthContext)
  const [getMe] = useGetMeLazyQuery()
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const accessToken = getToken()
      if (!accessToken) {
        navigate('/auth/login', {
          replace: true,
        })
      }
      getMe({
        onCompleted: (data) => {
          setCurrentUser((data?.getMe as User) || null)
        },
      })
      setLoading(false)
    })()
  }, [navigate])

  if (loading) return <Loading />

  return children
}

export default PrivateRoute
