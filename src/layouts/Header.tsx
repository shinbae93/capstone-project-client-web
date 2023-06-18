import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Form, Input } from 'antd'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import useAuthenication from '../hooks/useAuthentication'

const Header = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string | null>(null)
  const { currentUser } = useContext(AuthContext)
  const { handleLogout } = useAuthenication()

  const handleSearch = () => {
    navigate(`/courses${search ? `?q=${search}` : ''}`)
  }

  return (
    <div className="flex flex-row justify-between px-28 py-5 min-w-full w-full bg-white sticky top-0 z-50">
      <Link to="/">
        <img src="../../logo-black-text.svg" alt="logo" className="w-40" />
      </Link>
      <div className="flex flex-row items-center">
        <span className="px-6 text-base">
          <Link to="/courses">
            <p>Courses</p>
          </Link>
        </span>
        <div>
          <Form onFinish={handleSearch}>
            <Form.Item className="mb-0">
              <Input
                placeholder="Search..."
                suffix={<SearchOutlined onClick={handleSearch} className="hover:cursor-pointer" />}
                className="w-[30rem] h-10"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
        <span className="px-6 text-base">
          <p>Become a Teacher</p>
        </span>
        {currentUser ? (
          <Dropdown
            placement="bottom"
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <Link to="/profile/my-learning">
                      <p className="px-1 text-sm my-1">My learning</p>
                    </Link>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <Link to="/">
                      <p className="px-1 text-sm my-1">Payment history</p>
                    </Link>
                  ),
                },
                {
                  key: '3',
                  label: (
                    <Link to="/">
                      <p className="px-1 text-sm my-1">Payment methods</p>
                    </Link>
                  ),
                },
                {
                  key: '4',
                  label: (
                    <Link to="/">
                      <p className="px-1 text-sm my-1">Edit profile</p>
                    </Link>
                  ),
                },
                {
                  key: '5',
                  danger: true,
                  label: <p className="px-1 text-sm my-1">Log out</p>,
                  onClick: handleLogout,
                },
              ],
            }}
          >
            <Avatar src={currentUser.avatar} />
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button className="bg-primary text-white font-semibold hover:border-primary">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
