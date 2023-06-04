import { CalendarOutlined, AuditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, List, Select } from 'antd'
import { Course, CoursesPagination } from '../../../graphql/generated/graphql.ts'
import { FC } from 'react'
import { PaginationMeta } from '../../../graphql/generated/graphql.ts'
import { DEFAULT_IMG } from '../../../common/constants.ts'

interface CourseItemProps {
  course: Course | undefined
}

interface CourseListProps {
  data: CoursesPagination | undefined
}

const CourseItem: FC<CourseItemProps> = ({ course }) => {
  return (
    <div className="overflow-hidden grid grid-cols-course-item gap-7 items-center py-5">
      {/** Thumbnail */}
      <div>
        <a href="/">
          <img
            src={course?.thumbnail || DEFAULT_IMG}
            alt="Course thumbnail"
            title={course?.name}
            width="250"
            height="200"
            className="rounded-md"
          />
        </a>
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
}

const CourseList: FC<CourseListProps> = ({ data }) => {
  const { totalItems, itemCount, itemsPerPage } = data?.meta as PaginationMeta

  return (
    <div className="flex-[3]">
      {/** Course list section */}
      <div>
        {/** Top bar of course list */}
        <div className="flex justify-between w-full">
          {/** Pagination results */}
          <p className="text-footer text-sm">
            Showing 1-{itemCount} of {totalItems} results
          </p>
          {/** Sort menu */}
          <Select
            defaultValue="newly published"
            options={[
              {
                value: 'newly published',
                label: <p>Newly published</p>,
              },
              {
                value: 'alphabetical',
                label: <p>Alphabetical</p>,
              },
              {
                value: 'most members',
                label: <p>Most members</p>,
              },
            ]}
            className="w-44"
          />
        </div>
        {/** Course list */}
        <div className="py-5">
          <List
            itemLayout="vertical"
            size="default"
            pagination={{
              onChange: (page) => {
                console.log(page)
              },
              pageSize: itemsPerPage,
              align: 'center',
              style: {
                paddingTop: '24px',
              },
            }}
            dataSource={data?.items}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <CourseItem course={item} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseList
