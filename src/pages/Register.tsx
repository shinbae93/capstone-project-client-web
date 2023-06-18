import {
  ArrowRightOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
  notification,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Gender, RegisterInput, useRegisterMutation } from '../graphql/generated/graphql'
import { getDateInput } from '../utils/form'

const Register = () => {
  const navigate = useNavigate()
  const [form] = useForm()
  const [registerMutation] = useRegisterMutation()
  const [accepted, setAccepted] = useState<boolean>(false)

  const handleRegister = (input: RegisterInput) => {
    registerMutation({
      onCompleted: () => {
        notification.success({
          message: 'Register successfully',
        })
        navigate('/login')
      },
      variables: {
        input,
      },
    })
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold py-1">Create your account</h1>
        <p className="text-xs text-slate-500">Let's get started by filling out information below</p>
      </div>
      <Form layout="vertical" onFinish={handleRegister} form={form} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Full name' }}
              name="fullName"
              label={<p className="p-0">Full name</p>}
              className="mb-4"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter your full name"
                prefix={<UserOutlined className="align-middle" />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Gender' }}
              name="gender"
              label={<p className="p-0">Gender</p>}
              className="inline-block w-1/2 pr-2 mb-4"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select gender...">
                <Select.Option value={Gender.Male} key={1}>
                  Male
                </Select.Option>
                <Select.Option value={Gender.Female} key={2}>
                  Female
                </Select.Option>
                <Select.Option value={Gender.Other} key={3}>
                  Other
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              messageVariables={{ name: 'Birthday' }}
              name="birthday"
              label={<p className="p-0">Birthday</p>}
              valuePropName={'date'}
              className="inline-block w-1/2 pl-2 mb-4"
              getValueFromEvent={getDateInput}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker picker="date" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Phone number' }}
              name="phoneNumber"
              label={<p className="p-0">Phone number</p>}
              className="mb-4"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="align-middle" />}
                className="w-full"
                placeholder="Enter your phone number"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Email' }}
              name="email"
              label={<p className="p-0">Email</p>}
              className="mb-4"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                prefix={<MailOutlined className="align-middle" />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Password' }}
              name="password"
              label={<p>Password</p>}
              className="mb-4"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined className="align-middle" />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              messageVariables={{ name: 'Confirm Password' }}
              name="confirmPassword"
              label={<p>Confirm password</p>}
              className="mb-2"
              rules={[
                {
                  required: true,
                  validator: async (_, value) => {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject(new Error(`Confirm password and password don't match`))
                    }
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined className="align-middle" />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Checkbox onChange={() => setAccepted(!accepted)}>
                <p className="text-xs text-slate-700">
                  I agree with <a className="text-blue-500">Terms</a> and{' '}
                  <a className="text-blue-500">Privacy</a>
                </p>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Tooltip title={accepted ? undefined : 'You have to accept the terms and privacy'}>
                <Button
                  block
                  className="rounded-lg font-semibold bg-primary shadow-md"
                  htmlType="submit"
                  type="primary"
                  disabled={!accepted}
                >
                  <p className="text-white h-full">Sign Up</p>
                </Button>
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="text-center" span={24}>
            <div className="text-center mt-1 text-xs">
              <p className="inline-block pr-3">Already have an account?</p>
              <Link to="/register">
                <p className="font-semibold inline-block text-blue-500">
                  Sign in <ArrowRightOutlined />
                </p>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Register
