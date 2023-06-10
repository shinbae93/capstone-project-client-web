import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import useAuthenication from '../hooks/useAuthentication'

const Login = () => {
  const { handleLogin, loginLoading } = useAuthenication()

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary"></div>
      <div className="flex flex-col self-center px-40 gap-6">
        <h1 className="text-2xl font-semibold mb-8">Login with your Edusm account</h1>
        <Form layout="vertical" onFinish={handleLogin} scrollToFirstError>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Form.Item
                messageVariables={{ name: 'Email' }}
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
              >
                <div>
                  <p>Email</p>
                  <Input className="rounded-lg pr-[1.875rem] mt-1" placeholder="Enter your email" />
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                messageVariables={{ name: 'Password' }}
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <div>
                  <p>Password</p>
                  <Input.Password className="rounded-lg mt-1" placeholder="Enter your password" />
                </div>
              </Form.Item>
            </Col>
            <Col className="mt-2" span={24}>
              <div className="flex flex-row justify-between">
                <Checkbox>
                  <p>Remember me</p>
                </Checkbox>
                <Link className="primary" to="/forgot-password">
                  Forgot password
                </Link>
              </div>
              <Form.Item>
                <Button
                  block
                  className="rounded-lg font-semibold bg-primary hover:text-white hover:border-primary mt-5"
                  htmlType="submit"
                  loading={loginLoading}
                  type="primary"
                >
                  <p className="text-white h-full">Login</p>
                </Button>
              </Form.Item>
            </Col>
            <Col className="text-center" span={24}>
              <div className="text-center mt-4 text-sm">
                Don't have an account ?{' '}
                <Link to="register">
                  <p className="font-semibold inline-block">Sign up</p>
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Login
