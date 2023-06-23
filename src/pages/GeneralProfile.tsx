import { Button, Form, Input, InputNumber, Select } from 'antd'
import { Gender, useGetMeQuery } from '../graphql/generated/graphql'
import { UserOutlined } from '@ant-design/icons'

//  id: string
//  email: string
//  fullName: string
//  avatar: string
//  phoneNumber: string
//  gender: number
//  birthday: Date

const GeneralProfile = () => {
  const { data } = useGetMeQuery()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="w-[30vw]">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name={['fullName']} label="Full name" rules={[{ required: true }]}>
          <Input
            placeholder="Enter your full name"
            prefix={<UserOutlined className="align-middle" />}
          />
        </Form.Item>
        <Form.Item name={['email']} label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['phoneNumber']} label="Phone number">
          <Input />
        </Form.Item>
        <Form.Item name={['website']} label="Website">
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
        <Form.Item name={['introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default GeneralProfile
