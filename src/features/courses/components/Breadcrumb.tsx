import { RightOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const CourseBreadcrumb = () => {
  return (
    <div className="bg-breadcrumb">
      <div className="px-28 py-4">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/" className="text-breadcrumb hover:bg-transparent font-normal text-sm">
                  Home
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/courses"
                  className="text-breadcrumb hover:bg-transparent font-normal text-sm"
                >
                  Courses
                </Link>
              ),
            },
          ]}
          separator={
            <RightOutlined className="align-middle text-[10px] text-black font-semibold" />
          }
        />
      </div>
    </div>
  )
}

export default CourseBreadcrumb
