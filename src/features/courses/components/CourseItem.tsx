import { Avatar, Rate } from 'antd'
import { DEFAULT_IMG } from '../../../common/constants'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Course } from '../../../graphql/generated/graphql'
import { FC } from 'react'
import dayjs from 'dayjs'
import { maxBy, minBy } from 'lodash'
import { CurrencyFormatter } from '../../../utils/format'

interface CourseItemProps {
  course: Course
}

export const CourseItem: FC<CourseItemProps> = ({ course }) => (
  <div className="overflow-hidden grid grid-cols-course-item items-center py-5">
    {/** Thumbnail */}
    <div>
      <img
        src={course?.thumbnail || DEFAULT_IMG}
        alt="Course thumbnail"
        title={course?.name}
        width="200"
        height="150"
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
          <div className="flex flex-row">
            <Avatar src={course?.user?.avatar} size="large" className="inline-block align-top" />
            <div className="inline-block  pl-3 pr-6 border-r-thin">
              <p>{course?.user?.fullName}</p>
              <Rate
                disabled
                allowHalf
                defaultValue={course?.user?.tutorDetail?.rating || 0}
                className="text-sm"
              />
              <p className="inline-block ml-1 align-middle">{`(${course?.user?.tutorDetail?.totalReviews})`}</p>
            </div>
          </div>
        </div>
        {/** Class */}
        <div className="pl-6 flex flex-row items-center">
          <CalendarOutlined />
          <p className="px-2">{`${dayjs(minBy(course?.classes, 'startDate')?.startDate).format(
            'DD/MM/YYYY'
          )} - ${dayjs(maxBy(course?.classes, 'endDate')?.endDate).format('DD/MM/YYYY')}`}</p>
        </div>
        {/** Members */}
        <div className="pl-6 flex flex-row items-center">
          <UserOutlined />
          <p className="px-2">{`${course.classes?.reduce((acc, cur) => {
            acc += cur.occupiedSlots
            return acc
          }, 0)}`}</p>
        </div>
        {/** Price */}
        <div className="pl-6 flex flex-row items-center">
          <p className="px-2 text-price">{`${CurrencyFormatter.format(
            minBy(course.classes, 'fee')?.fee || 0
          )} - ${CurrencyFormatter.format(minBy(course.classes, 'fee')?.fee || 0)}`}</p>
        </div>
      </div>
    </div>
  </div>
)
