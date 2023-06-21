import { FC } from 'react'
import { Class, ScheduleTime } from '../../../graphql/generated/graphql'
import Table, { ColumnsType } from 'antd/es/table'
import { convertScheduleToString } from '../../../utils/schedule'
import { Modal, Space, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface ClassListProps {
  data: Class[]
}

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
  {
    key: 'action',
    render: (_, { id }) => (
      <Space>
        <Tooltip title="Edit">
          <EditOutlined onClick={() => {}} className="text-primary pr-4" />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteOutlined
            onClick={() =>
              Modal.confirm({
                centered: true,
                closable: true,
                content: <p className="py-4">Are you want to delte this class?</p>,
                maskClosable: true,
                onOk: () => handleRemove(String(id)),
                title: 'Publish Course',
              })
            }
            className="text-primary"
          />
        </Tooltip>
      </Space>
    ),
  },
]

const ClassList: FC<ClassListProps> = ({ data }) => {
  return (
    <div>
      <Table dataSource={data || []} pagination={false} columns={classColumns as any}></Table>
    </div>
  )
}

export default ClassList
