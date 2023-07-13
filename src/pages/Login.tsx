import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import useAuthenication from '../hooks/useAuthentication'

const Login = () => {
  const { handleLogin, loginLoading } = useAuthenication()

  return (
    <>
      <Row align="middle" justify="start">
        <img src="../logo-black-text.svg" alt="Logo" className="w-36" />
      </Row>
      <Row align="middle" justify="start">
        <h1 className="text-2xl font-semibold mb-8">Login with your Edusm account</h1>
      </Row>
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
                <p className="font-semibold">Email</p>
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
                <p className="font-semibold">Password</p>
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
                <p>Forgot password</p>
              </Link>
            </div>
            <Form.Item>
              <Button
                block
                className="rounded-lg font-semibold bg-primary mt-5 shadow-md"
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
              <p className="inline-block pr-3">Don't have an account?</p>
              <Link to="/register">
                <p className="font-semibold inline-block text-primary">Sign up</p>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Login
