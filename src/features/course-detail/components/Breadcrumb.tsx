import { RightOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface CourseDetailBreadcrumbProps {
  id: string
  name: string
}

const CourseDetailBreadcrumb: FC<CourseDetailBreadcrumbProps> = ({ id, name }) => {
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
            {
              title: (
                <Link
                  to={`/courses/${id}`}
                  className="text-breadcrumb hover:bg-transparent font-normal text-sm"
                >
                  {name}
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

export default CourseDetailBreadcrumb
