import { CalendarOutlined, AuditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, List, Select } from 'antd'

const data = Array.from({ length: 33 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Read More Create an LMS Website with LearnPress ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'A series of Videos from ThimPress, give you a detailed tutorial to create an LMS Website with LearnPress – LMS & Education WordPress Plugin....',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))

const CourseItem = () => {
  return (
    <div className="overflow-hidden grid grid-cols-course-item gap-7 items-center py-5">
      {/** Thumbnail */}
      <div>
        <a href="/">
          <img
            src="https://eduma.thimpress.com/wp-content/uploads/2022/12/create-an-lms-website-with-learnpress-3-1-400x300.jpg"
            alt="Create an LMS Website with LearnPress"
            title="create-an-lms-website-with-learnpress-3"
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
          <p className="font-semibold text-xl">Read More Create an LMS Website with LearnPress</p>
        </div>
        {/** Description */}
        <div className="py-4">
          <p>
            A series of Videos from ThimPress, give you a detailed tutorial to create an LMS Website
            with LearnPress – LMS & Education WordPress Plugin....
          </p>
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

const CourseList = () => {
  return (
    <div className="flex-[3]">
      {/** Course list section */}
      <div>
        {/** Top bar of course list */}
        <div className="flex justify-between w-full">
          {/** Pagination results */}
          <p className="text-footer text-sm">Showing 1-10 of 33 results</p>
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
              pageSize: 10,
              align: 'center',
              style: {
                paddingTop: '24px',
              },
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <CourseItem />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseList
