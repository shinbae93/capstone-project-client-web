import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Tooltip } from 'antd'
import Table from 'antd/es/table'
import { FC, useState } from 'react'
import {
  Class,
  ScheduleTime,
  useClassesQuery,
  useGetClassLazyQuery,
  useRemoveClassMutation,
} from '../../../graphql/generated/graphql'
import { convertScheduleToString } from '../../../utils/schedule'
import { toastRemoveSuccess } from '../../../utils/toast'
import UpdateClassForm from './UpdateClassForm'
import CreateClassForm from './CreateClassForm'

interface ClassListProps {
  courseId: string
}

const ClassList: FC<ClassListProps> = ({ courseId }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Partial<Class> | undefined>()
  const [getClass] = useGetClassLazyQuery()
  const [removeClass] = useRemoveClassMutation()

  const { data, refetch } = useClassesQuery({
    variables: {
      queryParams: {
        filters: {
          courseId,
        },
      },
    },
  })

  const clearSelectedClass = () => setSelectedClass(undefined)

  return (
    <div>
      <CreateClassForm
        courseId={courseId}
        open={openCreateModal}
        onCreate={() => {
          setOpenCreateModal(false)
          refetch()
        }}
        onCancel={() => setOpenCreateModal(false)}
      />
      <UpdateClassForm
        data={selectedClass}
        onUpdate={() => {
          clearSelectedClass()
          refetch()
        }}
        onCancel={clearSelectedClass}
      />
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined className="inline-block align-middle" />}
          onClick={() => {
            setOpenCreateModal(true)
          }}
          className="mb-5 float-right right-10"
        >
          <span>
            <p className="font-medium">Create</p>
          </span>
        </Button>
        <Table
          dataSource={data?.classes || []}
          pagination={false}
          columns={[
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
            {
              key: 'action',
              render: (_, data) => (
                <Space>
                  <Tooltip title="Edit">
                    <EditOutlined
                      onClick={() => {
                        getClass({
                          variables: {
                            id: String(data.id),
                          },
                        }).then((res) => {
                          setSelectedClass(res?.data?.getClass)
                        })
                      }}
                      className="text-primary pr-4"
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      onClick={() =>
                        Modal.confirm({
                          centered: true,
                          closable: true,
                          content: <p className="py-4">Are you want to delete this class?</p>,
                          maskClosable: true,
                          onOk: () =>
                            removeClass({
                              variables: {
                                id: String(data.id),
                              },
                              onCompleted: () => {
                                toastRemoveSuccess()
                                refetch()
                              },
                            }),
                          title: 'Publish Class',
                        })
                      }
                      className="text-primary"
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

export default ClassList
