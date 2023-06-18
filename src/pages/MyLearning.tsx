import { Tabs } from 'antd'
import { useState } from 'react'
import { DEFAULT_LIMIT_ITEMS } from '../common/constants'
import MyLearningList from '../features/my-learning/components/MyLearningList'
import {
  CourseStatus,
  Enrolment,
  PaginationMeta,
  useEnrolmentsQuery,
} from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { convertEnrolmentsToLearningItems } from '../utils/course-table'

const StatusTab = {
  all: [CourseStatus.UpComing, CourseStatus.InProgress, CourseStatus.Ended],
  notstarted: [CourseStatus.UpComing],
  inprogress: [CourseStatus.InProgress],
  ended: [CourseStatus.Ended],
}

const MyLearning = () => {
  const [statuses, setStatuses] = useState<CourseStatus[]>(Object.values(CourseStatus))
  const [page, setPage] = useState(1)

  const { data, loading } = useEnrolmentsQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
        filters: {
          statuses,
        },
      },
    },
  })

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Tabs
        onChange={(tab) => {
          setStatuses(StatusTab[tab as keyof typeof StatusTab])
        }}
        type="card"
        items={[
          {
            key: 'all',
            label: <p className="font-normal">All</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(data?.enrolments.items as Enrolment[])}
                pagination={data?.enrolments.meta as PaginationMeta}
                setPage={setPage}
              />
            ),
          },
          {
            key: 'notstarted',
            label: <p className="font-normal">Not started</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(data?.enrolments.items as Enrolment[])}
                pagination={data?.enrolments.meta as PaginationMeta}
                setPage={setPage}
              />
            ),
          },
          {
            key: 'inprogress',
            label: <p className="font-normal">In progress</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(data?.enrolments.items as Enrolment[])}
                pagination={data?.enrolments.meta as PaginationMeta}
                setPage={setPage}
              />
            ),
          },
          {
            key: 'ended',
            label: <p className="font-normal">Finished</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(data?.enrolments.items as Enrolment[])}
                pagination={data?.enrolments.meta as PaginationMeta}
                setPage={setPage}
              />
            ),
          },
        ]}
      />
    </div>
  )
}

export default MyLearning
