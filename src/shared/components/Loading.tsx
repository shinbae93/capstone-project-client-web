import { Space, Spin } from 'antd'

const Loading = () => {
  return (
    <Space className="h-screen w-screen flex justify-center">
      <Spin size="large" className="text-center" />
    </Space>
  )
}

export default Loading
