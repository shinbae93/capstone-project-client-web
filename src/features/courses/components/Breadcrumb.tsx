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
                <Link to="/" className="text-breadcrumb hover:bg-transparent font-semibold">
                  Home
                </Link>
              ),
            },
            {
              title: (
                <Link to="/courses" className="text-breadcrumb hover:bg-transparent font-semibold">
                  Courses
                </Link>
              ),
            },
          ]}
          separator={<RightOutlined className="align-middle text-[10px] text-black font-bold" />}
        />
      </div>
    </div>
  )
}

export default CourseBreadcrumb
