import { Button, Checkbox, Input } from 'antd'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../graphql/generated/graphql'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()
  const { setCurrentUser } = useAuth()
  const { setItem } = useLocalStorage()

  const [loginMutation] = useLoginMutation()

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary"></div>
      <div className="flex flex-col self-center px-40 gap-6">
        <h1 className="text-2xl font-semibold mb-8">Login with your Edusm account</h1>
        <div>
          <p>Email</p>
          <Input
            placeholder="Enter your email"
            className="hover:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <Input.Password
            placeholder="Enter your password"
            className="hover:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Checkbox>
            <p>Remember me</p>
          </Checkbox>
          <Link to="/forgot-password">
            <p className="text-sm">Forgot password</p>
          </Link>
        </div>
        <Button
          className="bg-primary hover:text-white hover:border-primary h-10 my-3"
          onClick={async (e) => {
            e.preventDefault()

            const res = await loginMutation({
              variables: {
                email,
                password,
              },
            })

            if (res.data?.login?.accessToken) {
              setItem('token', res.data?.login?.accessToken)
            }

            navigate('/')
          }}
        >
          <p className="font-medium text-lg text-white">Login</p>
        </Button>
        <div className="text-center mt-3 text-sm">
          Don't have an account ?{' '}
          <Link to="register">
            <p className="font-semibold inline-block">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
