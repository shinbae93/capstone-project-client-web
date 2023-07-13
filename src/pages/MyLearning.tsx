import { Tabs } from 'antd'
import { useState } from 'react'
import { DEFAULT_LIMIT_ITEMS } from '../common/constants'
import MyLearningList from '../features/my-learning/components/MyLearningList'
import {
  Enrolment,
  EnrolmentStatus,
  PaginationMeta,
  useGetMyEnrolmentsQuery,
} from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { convertEnrolmentsToLearningItems } from '../utils/course-table'

const StatusTab = {
  all: Object.values(EnrolmentStatus),
  pendingpayment: [EnrolmentStatus.PendingPayment],
  overduepayment: [EnrolmentStatus.OverduePayment],
  notstarted: [EnrolmentStatus.UpComing],
  inprogress: [EnrolmentStatus.InProgress],
  ended: [EnrolmentStatus.Ended],
}

const MyLearning = () => {
  const [status, setStatus] = useState<keyof typeof StatusTab>('all')
  const [page, setPage] = useState(1)

  const { data, loading, refetch } = useGetMyEnrolmentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
        filters: {
          statuses: StatusTab[status],
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
          setStatus(tab as keyof typeof StatusTab)
        }}
        activeKey={status}
        type="card"
        items={[
          {
            key: 'all',
            label: <p className="font-medium">All</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
          {
            key: 'pendingpayment',
            label: <p className="font-medium">Pending payment</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
          {
            key: 'overduepayment',
            label: <p className="font-medium">Overdue payment</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
          {
            key: 'notstarted',
            label: <p className="font-medium">Not started</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
          {
            key: 'inprogress',
            label: <p className="font-medium">In progress</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
          {
            key: 'ended',
            label: <p className="font-medium">Finished</p>,
            children: (
              <MyLearningList
                data={convertEnrolmentsToLearningItems(
                  (data?.myEnrolments?.items as Enrolment[]) || []
                )}
                pagination={(data?.myEnrolments.meta as PaginationMeta) || {}}
                setPage={setPage}
                refetch={refetch}
              />
            ),
          },
        ]}
      />
    </div>
  )
}

export default MyLearning
