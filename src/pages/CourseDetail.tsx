import {
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Modal, Select, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CourseStatusDisplay, DEFAULT_AVATAR, DEFAULT_IMG, MOCK_TEXT } from '../common/constants'
import CourseDetailBreadcrumb from '../features/course-detail/components/Breadcrumb'
import {
  Class,
  CourseStatus,
  ScheduleTime,
  useCourseQuery,
  useCreateEnrolmentMutation,
} from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { CurrencyFormatter } from '../utils/format'
import { convertScheduleToString } from '../utils/schedule'

const classColumns: ColumnsType<Class> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <p className="font-thin">{name}</p>,
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
    render: (method: string) => <p className="font-thin font-mono">{method}</p>,
  },
  {
    title: 'Schedule',
    dataIndex: 'schedule',
    key: 'schedule',
    render: (schedule: ScheduleTime[]) => (
      <>
        {schedule?.map((item, index) => (
          <p key={index} className="font-thin">
            {convertScheduleToString(item)}
          </p>
        ))}
      </>
    ),
  },
  {
    title: 'Students',
    dataIndex: ['totalSlots', 'occupiedSlots'],
    key: 'students',
    render: (_, { occupiedSlots, totalSlots }) => (
      <p className="font-thin font-mono">{`${occupiedSlots}/${totalSlots}`}</p>
    ),
  },
]

const CourseDetail = () => {
  const { id } = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [createEnrolmentMutation] = useCreateEnrolmentMutation()

  const { data, loading, refetch } = useCourseQuery({
    variables: {
      id: String(id),
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

  return loading ? (
    <Loading />
  ) : (
    <div>
      {/** Breadcrumb */}
      <CourseDetailBreadcrumb id={data?.course?.id || ''} name={data?.course?.name || ''} />
      {/** Header of course */}
      <div className="py-16 bg-info">
        <div className="px-28 relative">
          <div className="text-white w-2/3">
            <p className="text-2xl leading-snug mb-5">{data?.course?.name || ''}</p>
            <p className="text-sm font-light opacity-80 mb-5">{data?.course?.description || ''}</p>
            <div className="flex flex-row">
              <div className="align-middle">
                <Link to="">
                  <span className="inline-block">
                    <img
                      src={data?.course?.user?.avatar || DEFAULT_AVATAR}
                      className="rounded-full inline-block h-10"
                    />
                    <span className="inline-block align-middle px-4">
                      <p className="text-[12px] font-thin">Teacher</p>
                      <p className="text-sm">{data?.course?.user?.fullName}</p>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/** Sticky sidebar */}
          <div className="absolute w-1/4 left-2/3 top-0 bg-white border-[1px] border-info">
            <div className="p-2">
              <img
                src={data?.course?.thumbnail || DEFAULT_IMG}
                alt="thumbnail"
                className="object-cover"
              />
              <div className="px-3">
                <p className="text-xl py-5 font-bold font-sans">
                  {data?.course?.fee && data?.course?.fee > 0
                    ? CurrencyFormatter.format(data?.course?.fee)
                    : 'Free'}
                </p>
                <p className="font-semibold pb-3">Course information:</p>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Grade">
                    <BankOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">
                    {data?.course?.grade?.name}
                  </p>
                </span>
                <span className="flex flex-row items-center py-2">
                  <Tooltip title="Subject">
                    <BookOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">
                    {data?.course?.subject?.name}
                  </p>
                </span>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Duration">
                    <ClockCircleOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm font-thin text-slate-600 px-2">
                    Duration {data?.course?.duration || 0} months
                  </p>
                </span>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Status">
                    <CalendarOutlined className="text-primary" />
                  </Tooltip>
                  <Tag
                    color={
                      data?.course?.status == 'UP_COMING'
                        ? '#87d068'
                        : data?.course?.status == 'IN_PROGRESS'
                        ? '#2db7f5'
                        : '#ED2B2A'
                    }
                    className="mx-2"
                  >
                    <p className="inline-block text-sm font-thin text-white">
                      {CourseStatusDisplay[data?.course?.status || 'UP_COMING']}
                    </p>
                  </Tag>
                </span>
                <Tooltip
                  title={
                    data?.course?.status == CourseStatus.Ended ? 'This course is end' : undefined
                  }
                >
                  <span className="flex justify-center pt-4 pb-2">
                    <Button
                      className="bg-primary"
                      type="primary"
                      onClick={showModal}
                      disabled={data?.course?.status == CourseStatus.Ended}
                    >
                      <p className="font-medium">Enroll Now</p>
                    </Button>
                  </span>
                </Tooltip>
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
              {data?.course?.objectives?.map((item, index) => (
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
            <Table
              dataSource={data?.course?.classes || []}
              pagination={false}
              columns={classColumns as any}
            ></Table>
          </div>
        </div>

        <div className="border-[1px] border-info mt-6">
          <div className="p-5">
            <p className="font-semibold pb-4 border-b-[1px] border-info">TUTOR</p>
            <div className="py-7 flex flex-row gap-7">
              <img
                src={data?.course?.user?.avatar || DEFAULT_AVATAR}
                className="rounded-full h-28 w-28"
              />
              <div>
                <p className="font-semibold text-base py-1">{data?.course?.user?.fullName}</p>
                <p className="font-thin text-xs pb-4 text-footer">
                  {data?.course?.user?.tutorDetail?.headline}
                </p>
                <p className="font-thin text-xs leading-6">
                  {data?.course?.user?.tutorDetail?.biography || MOCK_TEXT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Enrollment"
        open={isModalOpen}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button
            form="createEnrolment"
            key="submit"
            htmlType="submit"
            className="bg-primary text-white hover:border-primary"
          >
            OK
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          className="border-t-[1px] border-info"
          id="createEnrolment"
          onFinish={async ({ classId }) => {
            const { errors } = await createEnrolmentMutation({
              variables: {
                classId,
              },
            })
            handleOk()
            if (!errors?.length) {
              refetch()
            }
          }}
        >
          <Form.Item
            messageVariables={{ name: 'Class' }}
            label={<p>Please select class to complete your enrolment</p>}
            className="py-6"
            name="classId"
            rules={[
              {
                required: true,
              },
            ]}
            required
          >
            <Select className="py-1" placeholder="Select class...">
              {data?.course?.classes?.map((item, index) => (
                <Select.Option value={item.id} key={index}>
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

export default CourseDetail
