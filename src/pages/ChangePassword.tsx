import { Button, Form, Input } from 'antd'

const ChangePassword = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="w-[20vw]">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name={['currentPassword']} label="Current password" rules={[{ required: true }]}>
          <Input placeholder="Enter your current password" />
        </Form.Item>
        <Form.Item name={['newPassword']} label="New password" rules={[{ required: true }]}>
          <Input placeholder="Enter your new password" />
        </Form.Item>
        <Form.Item
          name={['confirmNewPassword']}
          label="Confirm new password"
          rules={[{ required: true }]}
        >
          <Input placeholder="Confirm new password" />
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

export default ChangePassword
