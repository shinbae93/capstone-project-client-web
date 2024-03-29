import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Form, Input } from 'antd'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RoleId } from '../common/constants'
import { AuthContext } from '../context/auth.context'
import useAuthenication from '../hooks/useAuthentication'

const tutorMenu = [
  {
    key: '11',
    label: (
      <Link to="/profile/my-courses">
        <p className="px-1 text-sm my-1">My courses</p>
      </Link>
    ),
  },
  {
    key: '12',
    label: (
      <Link to="/profile/my-enrolments">
        <p className="px-1 text-sm my-1">My enrolments</p>
      </Link>
    ),
  },
]

const studentMenu = [
  {
    key: '21',
    label: (
      <Link to="/profile/my-enrolments">
        <p className="px-1 text-sm my-1">My enrolments</p>
      </Link>
    ),
  },
  {
    key: '22',
    label: (
      <Link to="/profile/my-payments">
        <p className="px-1 text-sm my-1">Payment history</p>
      </Link>
    ),
  },
  // {
  //   key: '23',
  //   label: (
  //     <Link to="/">
  //       <p className="px-1 text-sm my-1">Payment methods</p>
  //     </Link>
  //   ),
  // },
]

const Header = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string | null>(null)
  const { currentUser } = useContext(AuthContext)
  const { handleLogout } = useAuthenication()

  const isTutor = currentUser?.roleId === RoleId.TUTOR

  const handleSearch = () => {
    navigate(`/courses${search ? `?q=${search}` : ''}`)
  }

  return (
    <div className="flex flex-row justify-between px-28 py-5 min-w-full w-full bg-white sticky top-0 z-50">
      <Link to="/">
        <img src="../../logo-black-text.svg" alt="logo" className="w-40" />
      </Link>
      <div className="flex flex-row items-center">
        {currentUser?.roleId != RoleId.TUTOR && (
          <span className="px-6 text-base">
            <Link to="/become-teacher">
              <p>Become a Teacher</p>
            </Link>
          </span>
        )}
        <span className="px-6 text-base">
          <Link to="/courses">
            <p>Courses</p>
          </Link>
        </span>
        <span className="px-6 text-base">
          <Link to="/tutors">
            <p>Tutors</p>
          </Link>
        </span>
        <div>
          <Form onFinish={handleSearch}>
            <Form.Item className="mb-0">
              <Input
                placeholder="Search course..."
                suffix={<SearchOutlined onClick={handleSearch} className="hover:cursor-pointer" />}
                className="w-[30rem] h-10"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
        {currentUser ? (
          <Dropdown
            className="ml-5"
            placement="bottom"
            menu={{
              items: [
                {
                  key: '0',
                  label: (
                    <Link to="/profile/my-calendar">
                      <p className="px-1 text-sm my-1">My calendar</p>
                    </Link>
                  ),
                },
                ...(isTutor ? tutorMenu : studentMenu),
                {
                  key: '70',
                  label: (
                    <Link to="/profile/general">
                      <p className="px-1 text-sm my-1">Edit profile</p>
                    </Link>
                  ),
                },
                {
                  key: '80',
                  label: (
                    <Link to="/profile/change-password">
                      <p className="px-1 text-sm my-1">Change password</p>
                    </Link>
                  ),
                },
                {
                  key: '90',
                  danger: true,
                  label: <p className="px-1 text-sm my-1">Log out</p>,
                  onClick: handleLogout,
                },
              ],
            }}
          >
            <Avatar src={currentUser?.avatar} />
          </Dropdown>
        ) : (
          <Link to="/auth/login">
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
