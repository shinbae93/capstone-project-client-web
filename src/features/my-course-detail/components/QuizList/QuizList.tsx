import {
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Input, InputRef, Modal, Space, Table, Tooltip } from 'antd'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { FC, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import {
  Assignment,
  Quiz,
  useGetAssignmentOnlyLazyQuery,
  useGetQuizLazyQuery,
  useGetQuizzesWithAssignmentsQuery,
  useRemoveQuizMutation,
} from '../../../../graphql/generated/graphql'
import { toastRemoveSuccess } from '../../../../utils/toast'
import CreateQuizForm from './CreateQuizForm'
import UpdateQuizForm from './UpdateQuizForm'
import { getFileName } from '../../../../utils/upload'
import FeedbackAssignmentForm from './FeedbackAssignmentForm'

export interface QuizItemDataType {
  id: string
  className: string
  title: string
  startTime: Date
  endTime: Date
  createdAt: Date
}

type QuizItemDataIndex = keyof QuizItemDataType

interface QuizListProps {
  courseId: string
}

const QuizList: FC<QuizListProps> = ({ courseId }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<Partial<Quiz> | undefined>()
  const [selectedAssignment, setSelectedAssignment] = useState<Partial<Assignment> | undefined>()
  const [getQuiz] = useGetQuizLazyQuery()
  const [removeQuiz] = useRemoveQuizMutation()
  const [getAssignmentOnly] = useGetAssignmentOnlyLazyQuery()

  const { data, refetch } = useGetQuizzesWithAssignmentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        filters: {
          courseId,
        },
      },
    },
  })

  const assignments = data?.quizzes?.items?.reduce<Assignment[]>((acc, cur) => {
    cur.assignments && acc.push(...(cur.assignments as Assignment[]))
    return acc
  }, [])

  const assignmentsGroup = groupBy(assignments, 'quizId')

  const clearSelectedQuiz = () => setSelectedQuiz(undefined)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: QuizItemDataIndex
  ) => {
    confirm({ closeDropdown: true })
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    setSearchText('')
    setSearchedColumn('')
    confirm({ closeDropdown: true })
  }

  const getColumnSearchProps = (dataIndex: QuizItemDataIndex): ColumnType<QuizItemDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
          autoFocus={true}
          onBlurCapture={() => confirm({ closeDropdown: false })}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined className="inline-block" />}
            size="small"
            className="bg-primary"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
            className="hover:border-primary hover:text-primary"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#FFB606' : undefined }} />
    ),
    onFilter: (value, record) =>
      record?.[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string)?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const expandedRowRender = (row: QuizItemDataType) => {
    return (
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (_, record) => <p>{record.user?.fullName}</p>,
          },
          {
            title: 'Submitted at',
            dataIndex: 'submittedAt',
            key: 'submittedAt',
            render: (_, record) => (
              <p>{record.submittedAt ? dayjs(record.submittedAt).format('DD/MM/YYYY') : ''}</p>
            ),
          },
          {
            title: 'Files',
            dataIndex: 'files',
            key: 'files',
            render: (value: string[]) => (
              <>
                {value?.map((item) => (
                  <a href={item} target="_blank">
                    {getFileName(item)}
                  </a>
                ))}
              </>
            ),
          },
          {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, record) => (
              <Space size="middle">
                <Tooltip title="Feedback">
                  <MessageOutlined
                    onClick={() => {
                      getAssignmentOnly({
                        variables: {
                          id: String(record.id),
                        },
                      }).then((res) => {
                        setSelectedAssignment(res?.data?.assignment)
                      })
                    }}
                    className="text-primary"
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        dataSource={assignmentsGroup[row.id]}
        pagination={false}
      />
    )
  }

  return (
    <div>
      <FeedbackAssignmentForm
        assignment={selectedAssignment}
        onFeedback={() => {
          setSelectedAssignment(undefined)
          refetch()
        }}
        onCancel={() => setSelectedAssignment(undefined)}
      />
      <CreateQuizForm
        open={openCreateModal}
        onCreate={() => {
          setOpenCreateModal(false)
          refetch()
        }}
        onCancel={() => setOpenCreateModal(false)}
      />
      <UpdateQuizForm
        data={selectedQuiz}
        onUpdate={() => {
          clearSelectedQuiz()
          refetch()
        }}
        onCancel={clearSelectedQuiz}
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
          dataSource={
            data?.quizzes?.items?.map((item) => ({
              id: item.id,
              title: item.title,
              startTime: item.startTime,
              endTime: item.endTime,
              className: item.class?.name || '',
              createdAt: item.createdAt,
            })) || []
          }
          rowKey={(record) => record.id}
          expandable={{ expandedRowRender }}
          pagination={false}
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              render: (title: string) => <p className="font-thin">{title}</p>,
              ...getColumnSearchProps('title'),
            },
            {
              title: 'Class',
              dataIndex: ['class', 'name'],
              key: 'className',
              render: (_, record) => <p className="font-thin">{record?.className}</p>,
            },
            {
              title: 'Answer time',
              dataIndex: ['startTime', 'endTime'],
              key: 'answerTime',
              render: (_, { startTime, endTime }) => (
                <p className="font-thin font-mono">{`${dayjs(startTime).format(
                  'DD/MM/YYYY'
                )} - ${dayjs(endTime).format('DD/MM/YYYY')}`}</p>
              ),
            },
            {
              title: 'Created at',
              dataIndex: 'createdAt',
              sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
              render: (value) => dayjs(value).format('DD/MM/YYYY'),
              sortDirections: ['descend', 'ascend'],
            },
            {
              key: 'action',
              render: (_, data) => (
                <Space>
                  <Tooltip title="Edit">
                    <EditOutlined
                      onClick={() => {
                        getQuiz({
                          variables: {
                            id: String(data.id),
                          },
                        }).then((res) => {
                          setSelectedQuiz(res?.data?.quiz as Quiz)
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
                          content: <p className="py-4">Are you want to delete this quiz?</p>,
                          maskClosable: true,
                          onOk: () =>
                            removeQuiz({
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

export default QuizList
