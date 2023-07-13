import { Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../common/constants'
import CourseDetailBreadcrumb from '../features/course-detail/components/Breadcrumb'
import AssignmentList from '../features/my-learning-detail/components/AssignmentList'
import PaymentList from '../features/my-learning-detail/components/PaymentList'
import { useGetMyEnrolmentByCourseQuery } from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { convertScheduleToString } from '../utils/schedule'

const MyLearningDetail = () => {
  const { courseId } = useParams()

  const { data, loading } = useGetMyEnrolmentByCourseQuery({
    variables: {
      courseId: String(courseId),
    },
  })

  return loading ? (
    <Loading />
  ) : (
    <div>
      {/** Breadcrumb */}
      <CourseDetailBreadcrumb
        id={data?.myEnrolmentByCourse?.course?.id || ''}
        name={data?.myEnrolmentByCourse?.course?.name || ''}
      />
      {/** Header of course */}
      <div className="py-16 px-28 bg-info">
        <div className="text-white w-2/3">
          <p className="text-3xl leading-snug my-5">
            {data?.myEnrolmentByCourse?.course?.name || ''}
          </p>
          <p className="text-sm font-light opacity-80 mb-5">
            {data?.myEnrolmentByCourse?.course?.description || ''}
          </p>
          <div className="grid grid-cols-2 gap-x-3">
            <p className="text-sm font-light opacity-80 mb-5">
              Class: {data?.myEnrolmentByCourse?.class?.name || ''}
            </p>
            <p className="text-sm font-light opacity-80 mb-5">
              Method: {data?.myEnrolmentByCourse?.class?.method || ''}
            </p>
            <p className="text-sm font-light opacity-80 mb-5">
              Address: {data?.myEnrolmentByCourse?.class?.address || ''}
            </p>
            <div className=" mb-5">
              {data?.myEnrolmentByCourse?.class?.schedule?.map((item, index) => (
                <p key={index} className="text-sm font-light opacity-80">
                  {convertScheduleToString(item)}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="align-middle">
              <Link to="/">
                <span className="inline-block">
                  <img
                    src={data?.myEnrolmentByCourse?.course?.user?.avatar || DEFAULT_AVATAR}
                    className="rounded-full inline-block h-10"
                  />
                  <span className="inline-block align-middle px-4">
                    <p className="text-[12px] font-thin">Teacher</p>
                    <p className="text-sm">{data?.myEnrolmentByCourse?.course?.user?.fullName}</p>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/** Manage course */}
      <div className="px-28 py-14">
        <Tabs
          defaultActiveKey="1"
          size="large"
          items={[
            {
              label: `Assignments`,
              key: `1`,
              children: <AssignmentList courseId={data?.myEnrolmentByCourse?.course?.id || ''} />,
            },
            {
              label: `Payments`,
              key: `2`,
              children: <PaymentList courseId={data?.myEnrolmentByCourse?.course?.id || ''} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default MyLearningDetail
