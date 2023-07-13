import { BankOutlined, BookOutlined, CalendarOutlined, CheckOutlined } from '@ant-design/icons'
import { CardElement } from '@stripe/react-stripe-js'
import {
  Avatar,
  Button,
  Form,
  InputNumber,
  Modal,
  Rate,
  Select,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CourseStatusDisplay,
  DEFAULT_AVATAR,
  DEFAULT_IMG,
  MOCK_TEXT,
  RoleId,
} from '../common/constants'
import { AuthContext } from '../context/auth.context'
import CourseDetailBreadcrumb from '../features/course-detail/components/Breadcrumb'
import {
  Class,
  CourseStatus,
  ScheduleTime,
  useChargeMutation,
  useCourseQuery,
  useCreateEnrolmentMutation,
  useIsEnrolledQuery,
  useIsPayForCourseQuery,
} from '../graphql/generated/graphql'
import usePaymentForm from '../hooks/usePayment'
import Loading from '../shared/components/Loading'
import { convertScheduleToString } from '../utils/schedule'
import { CurrencyFormatter } from '../utils/format'

const classModalColumns: ColumnsType<Class> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <p>{name}</p>,
  },
  {
    title: 'Start date',
    key: 'startDate',
    render: (_, record) => <p>{dayjs(record.startDate).format('DD/MM/YYYY')}</p>,
  },
  {
    title: 'End date',
    key: 'endDate',
    render: (_, record) => <p>{dayjs(record.endDate).format('DD/MM/YYYY')}</p>,
  },
  {
    title: 'Schedule',
    dataIndex: 'schedule',
    key: 'schedule',
    render: (schedule: ScheduleTime[]) => (
      <>
        {schedule?.map((item, index) => (
          <p key={index}>{convertScheduleToString(item)}</p>
        ))}
      </>
    ),
  },
]

const classColumns: ColumnsType<Class> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <p>{name}</p>,
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
    render: (fee: number) => <p>{CurrencyFormatter.format(fee || 0)}</p>,
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
    render: (method: string) => <p>{method}</p>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => <p>{address}</p>,
  },
  {
    title: 'Duration',
    key: 'duration',
    render: (_, record) => (
      <p>
        {dayjs(record.startDate).format('DD/MM/YYYY')} -{' '}
        {dayjs(record.endDate).format('DD/MM/YYYY')}
      </p>
    ),
  },
  {
    title: 'Schedule',
    dataIndex: 'schedule',
    key: 'schedule',
    render: (schedule: ScheduleTime[]) => (
      <>
        {schedule?.map((item, index) => (
          <p key={index}>{convertScheduleToString(item)}</p>
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
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const [form] = useForm()
  const { handleSubmit } = usePaymentForm()
  const [charge] = useChargeMutation()

  const { data: isEnrolledResult, refetch: refetchIsEnrolled } = useIsEnrolledQuery({
    fetchPolicy: 'network-only',
    variables: {
      courseId: String(courseId),
    },
  })
  console.log(
    '🚀 ~ file: CourseDetail.tsx:140 ~ CourseDetail ~ isEnrolledResult:',
    isEnrolledResult
  )

  const { data: isPaid, refetch: refethIsPaid } = useIsPayForCourseQuery({
    fetchPolicy: 'network-only',
    variables: {
      courseId: String(courseId),
    },
  })
  console.log('🚀 ~ file: CourseDetail.tsx:151 ~ CourseDetail ~ isPaid:', isPaid)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState<string | null>(
    isPaid?.myEnrolmentByCourse?.classId || null
  )

  const [createEnrolmentMutation] = useCreateEnrolmentMutation()

  const { data, loading, refetch } = useCourseQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: String(courseId),
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
          <div className="text-white w-3/4">
            <p className="text-2xl leading-snug mb-5">{data?.course?.name || ''}</p>
            <p className="text-sm font-light opacity-80 mb-5">{data?.course?.description || ''}</p>
            <div className="flex flex-row">
              <div className="align-middle">
                <Link to="">
                  <span className="inline-block">
                    <Avatar
                      src={data?.course?.user?.avatar || DEFAULT_AVATAR}
                      className="inline-block h-10 w-10"
                    />
                    <span className="inline-block align-middle px-4">
                      <p className="text-[12px] font-thin">Teacher</p>
                      <Link to={`/tutors/${data?.course?.userId}`}>
                        <p className="text-sm">{data?.course?.user?.fullName}</p>
                      </Link>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={data?.course?.user?.tutorDetail?.rating || 0}
                        className="text-sm"
                      />
                      <p className="inline-block ml-3 align-middle">{`(${data?.course?.user?.tutorDetail?.totalReviews})`}</p>
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
                <p className="font-semibold pb-3">Course information:</p>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Grade">
                    <BankOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm text-slate-600 px-2">
                    {data?.course?.grade?.name}
                  </p>
                </span>
                <span className="flex flex-row items-center py-2">
                  <Tooltip title="Subject">
                    <BookOutlined className="text-primary" />
                  </Tooltip>
                  <p className="inline-block text-sm text-slate-600 px-2">
                    {data?.course?.subject?.name}
                  </p>
                </span>
                <span className="flex flex-row items-center py-1">
                  <Tooltip title="Status">
                    <CalendarOutlined className="text-primary" />
                  </Tooltip>
                  <Tag
                    color={
                      data?.course?.status == 'UP_COMING'
                        ? '#fadb14'
                        : data?.course?.status == 'IN_PROGRESS'
                        ? '#a0d911'
                        : '#cf1322'
                    }
                    className="mx-2"
                  >
                    <p className="inline-block text-sm font-normal text-white">
                      {
                        CourseStatusDisplay[
                          data?.course?.status as keyof typeof CourseStatusDisplay
                        ]
                      }
                    </p>
                  </Tag>
                </span>
                <Tooltip
                  title={
                    data?.course?.status == CourseStatus.Ended && !isEnrolledResult?.isEnrolled
                      ? 'This course is end'
                      : undefined
                  }
                >
                  <span className="flex justify-center pt-4 pb-2">
                    {isEnrolledResult?.isEnrolled ? (
                      <Button
                        className="bg-primary"
                        type="primary"
                        onClick={async () => {
                          if (
                            data?.course?.userId == currentUser?.id ||
                            isPaid?.myEnrolmentByCourse?.paymentId
                          ) {
                            navigate(
                              data?.course?.userId == currentUser?.id ? 'manage' : 'learning'
                            )
                          } else {
                            Modal.confirm({
                              centered: true,
                              closable: true,
                              okText: 'Pay now',
                              content: (
                                <p className="py-4">
                                  You have not pay for this enrolment yet! Please pay now to access
                                  this course.
                                </p>
                              ),
                              maskClosable: true,
                              onOk: () => {
                                setSelectedClassId(isPaid?.myEnrolmentByCourse?.classId || '')
                                setIsPaymentModalOpen(true)
                              },
                              title: 'View course',
                            })
                          }
                        }}
                      >
                        <p className="font-medium">View</p>
                      </Button>
                    ) : (
                      <Button
                        className="bg-primary"
                        type="primary"
                        onClick={showModal}
                        disabled={data?.course?.status == CourseStatus.Ended}
                      >
                        <p className="font-medium">Enroll Now</p>
                      </Button>
                    )}
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[72%] px-28 py-8">
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
              <Link to={`/tutors/${data?.course?.userId}`}>
                <img
                  src={data?.course?.user?.avatar || DEFAULT_AVATAR}
                  className="rounded-full w-52 aspect-square object-cover"
                />
              </Link>
              <div>
                <Link to={`/tutors/${data?.course?.userId}`}>
                  <p className="font-semibold text-base py-1">{data?.course?.user?.fullName}</p>
                </Link>
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
        className="w-2/5"
        maskClosable
        destroyOnClose
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
          className="border-t-[1px] border-info"
          id="createEnrolment"
          onFinish={async (values) => {
            await createEnrolmentMutation({
              variables: {
                input: {
                  ...values,
                },
              },
              onCompleted: () => {
                setSelectedClassId(values.classId)
                Modal.success({
                  centered: true,
                  closable: true,
                  content: (
                    <p className="py-4">
                      Enrolled successfully! Please pay within 15 minutes or your enrolment will be
                      unavailable.
                    </p>
                  ),
                  maskClosable: true,
                  okText: 'Pay now',
                  onOk: () => setIsPaymentModalOpen(true),
                  title: 'Enroll successfully',
                })
                refetch()
                refetchIsEnrolled()
                refethIsPaid()
              },
            })
            handleOk()
          }}
        >
          <p className="p-2 font-semibold text-sm">Class list</p>
          <Table
            dataSource={data?.course?.classes || []}
            pagination={false}
            columns={classModalColumns as any}
          ></Table>

          <Form.Item
            messageVariables={{ name: 'Class' }}
            label={<p>Please select class to complete your enrolment</p>}
            name="classId"
            rules={[
              {
                required: true,
              },
            ]}
            required
          >
            <Select
              className="py-1 w-1/2"
              placeholder="Select class..."
              defaultActiveFirstOption={true}
            >
              {data?.course?.classes?.map((item, index) => (
                <Select.Option value={item.id} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="totalMonths"
            label="Number of Months"
            valuePropName={'date'}
            className="inline-block w-1/2 pl-2"
            required
          >
            <Select className="py-1" placeholder="Select months...">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isPaymentModalOpen}
        centered={true}
        closable={true}
        maskClosable={true}
        okText="Pay"
        onCancel={() => {
          form.resetFields()
          setIsPaymentModalOpen(false)
        }}
        onOk={() => {
          form.validateFields().then(async () => {
            const paymentMethodId = await handleSubmit()

            charge({
              variables: {
                input: {
                  classId: selectedClassId || '',
                  paymentMethodId: paymentMethodId || '',
                },
              },
              onCompleted: () => {
                notification.success({
                  message: 'Paid successfully.',
                })
                form.resetFields()
                refetch()
                refethIsPaid()
                refetchIsEnrolled()
                setIsPaymentModalOpen(false)
              },
            })
          })
        }}
        title="Pay"
      >
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          name="create_course_form"
          className="p-4"
        >
          <Form.Item
            messageVariables={{ name: 'Amount' }}
            label="Amount"
            name={'amount'}
            rules={[{ required: true, type: 'number' }]}
            className="w-1/2"
            initialValue={
              (data?.course?.classes?.find((item) => item.id == selectedClassId)?.fee || 0) *
              dayjs(isPaid?.myEnrolmentByCourse?.endTime).diff(
                isPaid?.myEnrolmentByCourse?.startTime,
                'month',
                true
              )
            }
          >
            <InputNumber min={1} addonBefore={'$'} className="w-full" disabled />
          </Form.Item>
          <Form.Item label="Card information">
            <CardElement />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseDetail
