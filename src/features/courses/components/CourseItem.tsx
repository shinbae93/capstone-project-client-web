import { Avatar } from 'antd'
import { DEFAULT_IMG } from '../../../common/constants'
import { AuditOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Course } from '../../../graphql/generated/graphql'
import { FC } from 'react'

interface CourseItemProps {
  course: Course
}

export const CourseItem: FC<CourseItemProps> = ({ course }) => (
  <div className="overflow-hidden grid grid-cols-course-item gap-7 items-center py-5">
    {/** Thumbnail */}
    <div>
      <img
        src={course?.thumbnail || DEFAULT_IMG}
        alt="Course thumbnail"
        title={course?.name}
        width="250"
        height="200"
        className="rounded-md"
      />
    </div>
    {/** Content */}
    <div>
      {/** Title */}
      <div>
        <p className="font-semibold text-xl">{course?.name}</p>
      </div>
      {/** Description */}
      <div className="py-4">
        <p>{course?.description || 'No description.'}</p>
      </div>
      {/** Meta information */}
      <div className="flex flex-row">
        {/** Tutor */}
        <div>
          <div>
            <a href="">
              <Avatar
                src="https://secure.gravatar.com/avatar/b08d0d3bc9bf251a412e53566ac82b54?s=50&amp;r=g"
                size="large"
                className="inline-block"
              />
              <div className="inline-block pl-3 pr-6 border-r-thin">
                <p>Keny White</p>
              </div>
            </a>
          </div>
        </div>
        {/** Class */}
        <div className="pl-6 flex flex-row items-center">
          <CalendarOutlined />
          <p className="px-2">2</p>
        </div>
        {/** Lesson */}
        <div className="pl-6 flex flex-row items-center">
          <AuditOutlined />
          <p className="px-2">14</p>
        </div>
        {/** Members */}
        <div className="pl-6 flex flex-row items-center">
          <UserOutlined />
          <p className="px-2">2</p>
        </div>
        {/** Price */}
        <div className="pl-6 flex flex-row items-center">
          <p className="px-2 text-price">$50.00</p>
        </div>
      </div>
    </div>
  </div>
)
