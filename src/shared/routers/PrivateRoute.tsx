import { useEffect, useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/token'
import Loading from '../components/Loading'
import { User, useGetMeLazyQuery } from '../../graphql/generated/graphql'
import { AuthContext } from '../../context/auth.context'

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(AuthContext)

  const [getMe] = useGetMeLazyQuery()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const token = getToken()
      if (!token) {
        navigate('/login', {
          replace: true,
        })
      }

      const me = await getMe()
      setCurrentUser(me.data?.getMe as User)

      setLoading(false)
    })()
  }, [navigate])

  if (loading) return <Loading />

  return <Outlet />
}

export default PrivateRoute
