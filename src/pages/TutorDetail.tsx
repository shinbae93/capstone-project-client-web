import { FlagFilled, MailOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  Rate,
  Space,
  Tag,
  Tooltip,
  notification,
} from 'antd'
import dayjs from 'dayjs'
import { maxBy, minBy } from 'lodash'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CourseStatusDisplay,
  DEFAULT_AVATAR,
  DEFAULT_IMG,
  DEFAULT_LIMIT_ITEMS,
} from '../common/constants'
import { AuthContext } from '../context/auth.context'
import TutorDetailBreadcrumb from '../features/tutor-detail/components/Breadcrumb'
import ReportTutorForm from '../features/tutor-detail/components/ReportTutorForm'
import {
  CreateTutorReportInput,
  useCoursesQuery,
  useCreateTutorReportMutation,
  useCreateTutorReviewMutation,
  useGetTutorReviewsQuery,
  useGetUserQuery,
} from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { toastCreateSuccess } from '../utils/toast'
import { useForm } from 'antd/es/form/Form'

const TutorDetail = () => {
  const { currentUser } = useContext(AuthContext)
  const { tutorId } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [form] = useForm()

  const [creatTutorReport] = useCreateTutorReportMutation()
  const [createTutorReview] = useCreateTutorReviewMutation()

  const { data, loading } = useGetUserQuery({
    variables: {
      id: String(tutorId),
    },
  })

  const { data: coursesResult, refetch } = useCoursesQuery({
    variables: {
      queryParams: {
        filters: {
          userId: String(tutorId),
          isPublished: true,
        },
        pagination: {
          limit: DEFAULT_LIMIT_ITEMS,
          page: 1,
        },
      },
    },
  })

  const { data: reviewResult, refetch: refetchReviews } = useGetTutorReviewsQuery({
    variables: {
      queryParams: {
        filters: {
          tutorId: String(tutorId),
        },
        pagination: {
          limit: DEFAULT_LIMIT_ITEMS,
          page: 1,
        },
      },
    },
  })

  return loading ? (
    <Loading />
  ) : (
    <div>
      <ReportTutorForm
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        onCreate={(input: CreateTutorReportInput) => {
          creatTutorReport({
            variables: {
              input: {
                ...input,
                tutorId: String(tutorId),
              },
            },
          }).then(() => {
            toastCreateSuccess()
            refetch()
          })
          setOpen(false)
        }}
      />
      <TutorDetailBreadcrumb />
      <div className="px-28 py-10 flex flex-row gap-40">
        <div className="w-3/5">
          <div className="mb-10">
            <p className="text-footer">TEACHER</p>
            <p className="text-3xl font-semibold">{data?.getUser?.fullName}</p>
            <Rate
              disabled
              allowHalf
              defaultValue={data?.getUser?.tutorDetail?.rating || 0}
              className="text-sm"
            />
            <p className="inline-block ml-3 align-middle">{`(${reviewResult?.tutorReviews?.meta?.totalItems})`}</p>
          </div>
          <div>
            <p className="text-xl font-semibold mb-4">About me</p>
            <p className="text-sm">{data?.getUser?.tutorDetail?.biography}</p>
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold mb-8">Courses</p>
            <List
              grid={{ gutter: 9, column: 3 }}
              size="default"
              pagination={{
                onChange: (page) => {
                  refetch({
                    queryParams: {
                      filters: {
                        userId: String(tutorId),
                        isPublished: true,
                      },
                      pagination: {
                        limit: DEFAULT_LIMIT_ITEMS,
                        page,
                      },
                    },
                  })
                },
                current: coursesResult?.courses?.meta?.currentPage,
                pageSize: coursesResult?.courses?.meta?.itemsPerPage,
                total: coursesResult?.courses?.meta?.totalItems,
                align: 'center',
                style: {
                  paddingTop: '24px',
                },
              }}
              dataSource={coursesResult?.courses?.items}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={() => {
                    navigate(`/courses/${item.id}`)
                  }}
                  className="hover:cursor-pointer"
                >
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="thumbnail"
                        src={item.thumbnail || DEFAULT_IMG}
                        className="h-44 object-contain rounded-sm p-1"
                      />
                    }
                    className="overflow-hidden"
                    bodyStyle={{
                      padding: 10,
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <div>
                      <p className="whitespace-nowrap overflow-hidden clear-both inline-block box-border w-full text-ellipsis">
                        {item.name}
                      </p>
                      <div>
                        <Tag
                          color={
                            item.status == 'UP_COMING'
                              ? '#2db7f5'
                              : item.status == 'IN_PROGRESS'
                              ? '#87d068'
                              : '#F15A59'
                          }
                        >
                          <p>
                            {CourseStatusDisplay[item.status as keyof typeof CourseStatusDisplay]}
                          </p>
                        </Tag>
                      </div>
                      <p className="mt-2">{`${dayjs(
                        minBy(item.classes, 'startDate')?.startDate
                      ).format('DD/MM/YYYY')} - ${dayjs(
                        maxBy(item.classes, 'endDate')?.endDate
                      ).format('DD/MM/YYYY')}`}</p>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold mb-8">Reviews</p>
            <Space direction="horizontal" className="mb-5">
              <Avatar
                src={currentUser?.avatar || DEFAULT_AVATAR}
                alt="Avatar"
                className="mr-2 w-12 h-12 object-scale-down"
              />
              <Form
                form={form}
                layout="inline"
                onFinish={(values) => {
                  createTutorReview({
                    variables: {
                      input: {
                        ...values,
                        rating: +values.rating,
                        tutorId,
                      },
                    },
                  }).then(() => {
                    form.resetFields()
                    refetchReviews()
                    notification.success({
                      message: `Review successfully!`,
                    })
                  })
                }}
              >
                <Form.Item name={'rating'} className="w-full mb-2">
                  <Rate allowHalf className="text-md" />
                </Form.Item>
                <Form.Item name={'comment'}>
                  <Input.TextArea placeholder="Write your review..." className="w-[32rem]" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="ml-3">
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </Space>
            <List
              itemLayout="horizontal"
              size="default"
              pagination={{
                onChange: (page) => {
                  refetchReviews({
                    queryParams: {
                      filters: {
                        tutorId: String(tutorId),
                      },
                      pagination: {
                        limit: DEFAULT_LIMIT_ITEMS,
                        page,
                      },
                    },
                  })
                },
                current: reviewResult?.tutorReviews?.meta?.currentPage,
                pageSize: reviewResult?.tutorReviews?.meta?.itemsPerPage,
                total: reviewResult?.tutorReviews?.meta?.totalItems,
                align: 'center',
                style: {
                  paddingTop: '24px',
                },
              }}
              dataSource={reviewResult?.tutorReviews?.items}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item?.author?.avatar} />}
                    title={
                      <div className="flex flex-col">
                        <p>{item.author?.fullName}</p>
                        <Rate disabled defaultValue={item.rating || 0} className="text-sm" />
                      </div>
                    }
                    description={item?.comment}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div>
          <Avatar
            src={data?.getUser?.avatar || DEFAULT_AVATAR}
            alt="Avatar"
            className="w-52 h-52"
          />
          <div className="float-right">
            <Tooltip title="Report">
              <FlagFilled
                className="text-[#F24C3D]"
                onClick={() => {
                  setOpen(true)
                }}
              />
            </Tooltip>
          </div>

          <div className="flex flex-row items-stretch gap-3 mt-6">
            <MailOutlined />
            <p>{data?.getUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorDetail
