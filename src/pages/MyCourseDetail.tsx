import { Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../common/constants'
import CourseDetailBreadcrumb from '../features/course-detail/components/Breadcrumb'
import { Class, useCourseQuery } from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import ClassList from '../features/my-course-detail/components/ClassList'

const MyCourseDetail = () => {
  const { id } = useParams()

  const { data, loading } = useCourseQuery({
    variables: {
      id: String(id),
    },
  })

  return loading ? (
    <Loading />
  ) : (
    <div>
      {/** Breadcrumb */}
      <CourseDetailBreadcrumb id={data?.course?.id || ''} name={data?.course?.name || ''} />
      {/** Header of course */}
      <div className="py-16 px-28 bg-info">
        <div className="text-white w-2/3">
          <p className="text-2xl leading-snug mb-5">{data?.course?.name || ''}</p>
          <p className="text-sm font-light opacity-80 mb-5">{data?.course?.description || ''}</p>
          <div className="flex flex-row">
            <div className="align-middle">
              <Link to="/">
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
      </div>
      {/** Manage course */}
      <div className="px-28 py-14">
        <Tabs
          defaultActiveKey="1"
          size="large"
          items={[
            {
              label: `Classes`,
              key: `1`,
              children: <ClassList data={(data?.course?.classes as Class[]) || []} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default MyCourseDetail
