import { EyeOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
import Table from 'antd/es/table'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { DEFAULT_LIMIT_ITEMS } from '../../../common/constants'
import {
  Assignment,
  useGetAssignmentLazyQuery,
  useGetMyAssignmentsQuery,
} from '../../../graphql/generated/graphql'
import SubmitAssignmentForm from './SubmitAssignmentForm'
import { DeepPartial } from '../../../utils/type'

interface AssignmentListProps {
  courseId: string
}

const AssignmentList: FC<AssignmentListProps> = ({ courseId }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<
    DeepPartial<Assignment> | undefined
  >()
  const [getAssignment] = useGetAssignmentLazyQuery()

  const { data, refetch } = useGetMyAssignmentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        pagination: {
          page: 1,
          limit: DEFAULT_LIMIT_ITEMS,
        },
        filters: {
          courseId,
        },
      },
    },
  })

  const clearSelectedAssignment = () => setSelectedAssignment(undefined)

  return (
    <div>
      <SubmitAssignmentForm
        data={selectedAssignment}
        onSubmit={() => {
          clearSelectedAssignment()
          refetch()
        }}
        onCancel={() => clearSelectedAssignment()}
      />
      <div>
        <Table
          dataSource={data?.myAssignments?.items || []}
          pagination={false}
          columns={[
            {
              title: 'Quiz',
              dataIndex: ['quiz', 'title'],
              key: 'title',
              render: (title: string) => <p className="font-thin">{title}</p>,
            },
            {
              title: 'Answer time',
              dataIndex: ['startTime', 'endTime'],
              key: 'answerTime',
              render: (_, { quiz }) => (
                <p className="font-thin font-mono">{`${dayjs(quiz.startTime).format(
                  'DD/MM/YYYY'
                )} - ${dayjs(quiz.endTime).format('DD/MM/YYYY')}`}</p>
              ),
            },
            {
              key: 'action',
              render: (_, data) => (
                <Space>
                  <Tooltip title="View">
                    <EyeOutlined
                      onClick={() => {
                        getAssignment({
                          variables: {
                            id: String(data.id),
                          },
                        }).then((res) => {
                          setSelectedAssignment(res?.data?.assignment)
                        })
                      }}
                      className="text-primary pr-4"
                    />
                  </Tooltip>
                </Space>
              ),
            },
          ]}
        ></Table>
      </div>
    </div>
  )
}

export default AssignmentList
