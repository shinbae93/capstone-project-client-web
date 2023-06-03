import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Header = () => {
  return (
    <div className="flex flex-row justify-between px-28 py-5 min-w-full w-full bg-white">
      <img src="../../logo-black-text.svg" alt="logo" className="w-40" />
      <div className="flex flex-row items-center">
        {/* <span className="px-6 text-base">
          <p>Home</p>
        </span> */}
        <span className="px-6 text-base">
          <p>Categories</p>
        </span>
        {/* <span className="px-6 text-base">
          <p>Courses</p>
        </span> */}
        <div className="px-8">
          <Input placeholder="Search..." suffix={<SearchOutlined />} className="w-96 h-9" />
        </div>
        <span className="px-6 text-base">
          <p>Become a Teacher</p>
        </span>
        <Button className="bg-primary text-white font-semibold hover:border-primary">Login</Button>
      </div>
    </div>
  )
}

export default Header
