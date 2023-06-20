import { AuditOutlined, BookOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ProfileBreadcrumb from '../features/profile/components/Breadcrumb'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { RoleId } from '../common/constants'

const ProfileLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log('🚀 ~ file: ProfileLayout.tsx:14 ~ ProfileLayout ~ location:', location)
  const { currentUser } = useContext(AuthContext)

  return (
    <div>
      <ProfileBreadcrumb />
      <Space className="px-28">
        <Layout className="my-12">
          <Sider className="bg-white">
            <Menu
              mode="vertical"
              defaultSelectedKeys={['0']}
              className="profile-menu"
              selectedKeys={[location.pathname.split('/').at(-1) || '']}
            >
              {/* <Menu.Item
                key="my-calendar"
                icon={<CalendarOutlined className="text-primary mr-1 text-base" />}
                onClick={() => {
                  navigate('/profile/my-calendar')
                }}
                className="rounded-none profile-menu-item m-0"
              >
                <p className="inline-block font-light">My calendar</p>
              </Menu.Item> */}
              {currentUser?.roleId === RoleId.TUTOR && (
                <Menu.Item
                  key="my-courses"
                  icon={<AuditOutlined className="text-primary mr-1 text-base" />}
                  onClick={() => {
                    navigate('/profile/my-courses')
                  }}
                  className="rounded-none profile-menu-item m-0"
                >
                  <p className="inline-block font-light">My courses</p>
                </Menu.Item>
              )}
              <Menu.Item
                key="my-learning"
                icon={<BookOutlined className="text-primary mr-1 text-base" />}
                onClick={() => {
                  navigate('/profile/my-learning')
                }}
                className="rounded-none profile-menu-item m-0"
              >
                <p className="inline-block font-light">My learning</p>
              </Menu.Item>
              <Menu.Item
                key="general"
                icon={<UserOutlined className="text-primary mr-1 text-base" />}
                onClick={() => {
                  navigate('/profile/general-information')
                }}
                className="rounded-none profile-menu-item m-0"
              >
                <p className="inline-block font-light">General</p>
              </Menu.Item>
              <Menu.Item
                key="change-password"
                icon={<KeyOutlined className="text-primary mr-1 text-base" />}
                onClick={() => {
                  navigate('/profile/change-password')
                }}
                className="rounded-none profile-menu-item m-0"
              >
                <p className="inline-block font-light">Change password</p>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Space className="px-8 w-full">
              <Outlet />
            </Space>
          </Content>
        </Layout>
      </Space>
    </div>
  )
}

export default ProfileLayout
