import {
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import CourseDetailBreadcrumb from '../features/course-detail/components/Breadcrumb'
import { Button, Form, Modal, Select, Table, Tag, Tooltip } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreateEnrolmentMutation } from '../graphql/generated/graphql'

const whatLearns = [
  'Becoming familiar with the NestJS framework and its components',
  'Designing and developing REST APIs performing CRUD operations',
  'Authentication and Authorization for back-end applications',
  'Using TypeORM for database interaction',
  'Security best practices, password hashing and storing sensitive information',
  'Persisting data using a database',
  'Deploying back-end applications at a production-ready state to Amazon Web Services',
  'Writing clean, maintainable code in-line with industry standards',
  'Utilising the NestJS Command Line Interface (CLI)',
  'Using Postman for testing back-end services',
]

interface ClassItemType {
  key: React.Key
  name: string
  method: string
  schedule: string[]
  students: string
}

const data: ClassItemType[] = [
  {
    key: '1',
    name: 'Cơ bản',
    method: 'Offline',
    schedule: ['Thứ 3: 7 AM - 9 AM', 'Thứ 5: 3 PM - 5 PM'],
    students: '30/60',
  },
  {
    key: '2',
    name: 'Nâng cao',
    method: 'Online',
    schedule: ['Thứ 2: 9 AM - 11 AM', ' Thứ 4: 1 PM - 3 PM'],
    students: '40/60',
  },
]

const CoursesDetail = () => {
  const { id } = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [createEnrolmentMutation] = useCreateEnrolmentMutation({
    variables: {
      classId: String(id),
    },
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      {/** Breadcrumb */}
      <CourseDetailBreadcrumb />
      {/** Header of course */}
      <div className="py-16 bg-info">
        <div className="px-28 relative">
          <div className="text-white w-2/3">
            <p className="text-2xl leading-snug mb-5">Create an LMS Website with LearnPress</p>
            <p className="text-sm font-light opacity-80 mb-5">
              A series of Videos from ThimPress, give you a detailed tutorial to create an LMS
              Website with LearnPress – LMS & Education WordPress Plugin. This course is a detailed
              and easy tutorial to get you all setup and going with …
            </p>
            <div className="flex flex-row">
              <div className="align-middle">
                <span className="inline-block">
                  <img
                    src="https://secure.gravatar.com/avatar/b08d0d3bc9bf251a412e53566ac82b54?s=50&amp;r=g"
                    className="rounded-full inline-block h-10"
                  />
                  <span className="inline-block align-middle px-4 border-r-[1px] border-r-info">
                    <p className="text-[12px] font-thin">Teacher</p>
                    <p className="text-sm">Keny White</p>
                  </span>
                </span>
              </div>
              <span className="inline-block align-middle px-4 border-r-[1px] border-r-info">
                <p className="text-[12px] font-thin">Teacher</p>
                <p className="text-sm">Keny White</p>
              </span>
              <span className="inline-block align-middle px-4">
                <p className="text-[12px] font-thin">Teacher</p>
                <p className="text-sm">Keny White</p>
              </span>
            </div>
          </div>
          {/** Sticky sidebar */}
          <div className="absolute w-1/4 left-2/3 top-0 bg-white border-[1px] border-info">
            <div className="p-2">
              <img
                src="https://eduma.thimpress.com/wp-content/uploads/2022/12/create-an-lms-website-with-learnpress-3-1.jpg"
                alt=""
              />
              <div className="px-3">
                <p className="text-xl py-5 font-bold">Free</p>
                <p className="font-semibold pb-3">Course information:</p>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Grade">
                    <BankOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">Grade 9</p>
                </span>
                <span className="flex flex-row items-center py-2">
                  <Tooltip title="Subject">
                    <BookOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">Math</p>
                </span>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Duration">
                    <ClockCircleOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">
                    Duration 3 months
                  </p>
                </span>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Status">
                    <CalendarOutlined className="text-primary" />
                  </Tooltip>
                  <Tag color="#87d068" className="mx-2">
                    <p className="inline-block text-sm font-thin text-white">Upcoming</p>
                  </Tag>
                </span>
                <span className="flex justify-center pt-4 pb-2">
                  <Button className="bg-primary" type="primary" onClick={showModal}>
                    <p className="font-medium">Enroll Now</p>
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 px-28 py-8">
        {/** What you'll learn */}
        <div className="border-[1px] border-info">
          <div className="p-5">
            <p className="font-semibold pb-4 border-b-[1px] border-info">WHAT YOU'LL LEARN</p>
            <div className="pt-5">
              {whatLearns.map((item, index) => (
                <span className="flex flex-row items-center py-2" key={index}>
                  <CheckOutlined />
                  <p className="inline-block text-sm font-thin text-slate-600 px-3">{item}</p>
                </span>
              ))}
            </div>
          </div>
        </div>
        {/** Class list */}
        <div className="py-8">
          <p className="text-xl py-7">AVAILABLE CLASSES</p>
          <div>
            <Table dataSource={data} pagination={false}>
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                render={(name: string) => <p className="font-thin">{name}</p>}
              />
              <Column
                title="Method"
                dataIndex="method"
                key="method"
                render={(method: string) => <p className="font-thin font-mono">{method}</p>}
              />
              <Column
                title="Schedule"
                dataIndex="schedule"
                key="schedule"
                render={(schedule: string[]) => (
                  <>
                    {schedule?.map((item, index) => (
                      <p key={index} className="font-thin">
                        {item}
                      </p>
                    ))}
                  </>
                )}
              />
              <Column
                title="Students"
                dataIndex="students"
                key="students"
                render={(method: string) => <p className="font-thin font-mono">{method}</p>}
              />
            </Table>
          </div>
        </div>

        <div className="border-[1px] border-info mt-6">
          <div className="p-5">
            <p className="font-semibold pb-4 border-b-[1px] border-info">TUTOR</p>
            <div className="py-7 flex flex-row gap-7">
              <img
                src="https://secure.gravatar.com/avatar/b08d0d3bc9bf251a412e53566ac82b54?s=110&r=g"
                className="rounded-full h-28 w-28"
              />
              <div>
                <p className="font-semibold text-base py-1">Keny White</p>
                <p className="font-thin text-xs pb-4 text-footer">Professor</p>
                <p className="font-thin text-xs leading-6">
                  Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis
                  molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est
                  enim perferendis est neque sunt. Nam amet sunt aut vero mollitia ut ipsum corporis
                  vel facere eius et quia aspernatur qui fugiat repudiandae. Et officiis inventore
                  et quis enim ut quaerat corporis sed reprehenderit odit sit saepe distinctio et
                  accusantium repellendus ea enim harum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Enrollment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: 'bg-primary' }}
      >
        <Form layout="vertical" style={{ maxWidth: 600 }} className="border-t-[1px] border-info">
          <Form.Item label={<p>Please select class to complete your enrolment</p>} className="py-6">
            <Select className="py-1" placeholder="Select class...">
              {data.map((item) => (
                <Select.Option value={item.key} key={item.key}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CoursesDetail
