import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Input, InputRef, Modal, Space, Table, Tag, Tooltip } from 'antd'
import { ColumnType } from 'antd/es/table'
import { ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import { useContext, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'
import { CourseStatusDisplay, DEFAULT_IMG, DEFAULT_LIMIT_ITEMS } from '../common/constants'
import { AuthContext } from '../context/auth.context'
import CreateCourseForm from '../features/my-courses/components/CreateCourseForm'
import {
  Course,
  CourseStatus,
  CreateCourseInput,
  useCourseLazyQuery,
  useCoursesQuery,
  useCreateCourseMutation,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { CurrencyFormatter } from '../utils/formater'
import { toastCreateSuccess, toastRemoveSuccess, toastUpdateSuccess } from '../utils/toast'
import UpdateCourseForm from '../features/my-courses/components/UpdateCourseForm'
import dayjs from 'dayjs'

export interface MyCoursesItemDataType {
  key: React.Key
  thumbnail: string
  name: string
  status: string
  fee: number
  startDate: string
  endDate: string
  totalStudents: number
  isPublished: boolean
}

type MyCoursesItemDataIndex = keyof MyCoursesItemDataType

const convertMyCoursesItems = (courses: Course[]) => {
  return courses.map<MyCoursesItemDataType>((item) => ({
    key: item.id,
    name: item.name,
    thumbnail: item.thumbnail || DEFAULT_IMG,
    status: item.status,
    fee: item.fee,
    startDate: item.startDate,
    endDate: item.endDate,
    totalStudents:
      item.classes?.reduce<number>((acc, cur) => {
        acc += cur.occupiedSlots
        return acc
      }, 0) || 0,
    isPublished: item.isPublished,
  }))
}

const MyCourses = () => {
  const { currentUser } = useContext(AuthContext)

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Partial<Course>>()

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useCoursesQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
        filters: {
          userId: currentUser.id,
        },
      },
    },
  })

  const [getCourse] = useCourseLazyQuery()
  const [createCourse] = useCreateCourseMutation()
  const [publishCourseMutation] = usePublishCourseMutation()
  const [removeCourseMutation] = useRemoveCourseMutation()

  const onCreate = (input: CreateCourseInput) => {
    createCourse({
      variables: {
        input,
      },
    }).then(() => {
      toastCreateSuccess()
      refetch()
    })
    setOpenCreateModal(false)
  }

  const handlePublish = (id: string) => {
    publishCourseMutation({
      variables: {
        id,
      },
    }).then(() => {
      toastUpdateSuccess()
      refetch()
    })
  }

  const handleRemove = (id: string) => {
    removeCourseMutation({
      variables: {
        id,
      },
    }).then(() => {
      toastRemoveSuccess()
      refetch()
    })
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: MyCoursesItemDataIndex
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

  const getColumnSearchProps = (
    dataIndex: MyCoursesItemDataIndex
  ): ColumnType<MyCoursesItemDataType> => ({
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

  const columns: ColumnsType<MyCoursesItemDataType> = [
    {
      dataIndex: 'thumbnail',
      width: '10%',
      render: (value: string, record) => (
        <Link to={`/courses/${record.key}`}>
          <img src={value} alt="course-thumbnail" className="w-14 h-14" />
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
      render: (value: string, record) => <Link to={`/courses/${record.key}`}>{value}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      filters: Object.values(CourseStatus).map((item) => ({
        text: item,
        value: item,
      })),
      render: (value, course) => (
        <Tag
          color={
            course.isPublished
              ? value == 'UP_COMING'
                ? '#2db7f5'
                : value == 'IN_PROGRESS'
                ? '#87d068'
                : '#F15A59'
              : 'default'
          }
        >
          <p>
            {course.isPublished
              ? CourseStatusDisplay[value as keyof typeof CourseStatusDisplay]
              : 'Draft'}
          </p>
        </Tag>
      ),
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      sorter: (a, b) => a.fee - b.fee,
      sortDirections: ['descend', 'ascend'],
      render: (value) => CurrencyFormatter.format(value),
    },
    {
      title: 'Total students',
      dataIndex: 'totalStudents',
      sorter: (a, b) => a.totalStudents - b.totalStudents,
      sortDirections: ['descend', 'ascend'],
      render: (value) => (
        <span>
          <p className="inline-block">{value}</p>
          <UserOutlined className="align-middle pl-1" />
        </span>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      sorter: (a, b) => +dayjs(a.startDate).isBefore(dayjs(b.startDate)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      sorter: (a, b) => +dayjs(a.endDate).isBefore(dayjs(b.endDate)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      fixed: 'right',
      render: (_, course) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => {
                getCourse({
                  variables: {
                    id: String(course.key),
                  },
                }).then((res) => {
                  setSelectedCourse({ ...res.data?.course } as Course)
                  setOpenUpdateModal(true)
                })
              }}
              className="text-primary"
            />
          </Tooltip>
          {!course.isPublished && (
            <>
              <Tooltip title="Publish">
                <CheckOutlined
                  onClick={() =>
                    Modal.confirm({
                      centered: true,
                      closable: true,
                      content: (
                        <p className="py-4">
                          Are you want to publish this course? All of its information will not be
                          able to modify later.
                        </p>
                      ),
                      maskClosable: true,
                      onOk: () => handlePublish(String(course.key)),
                      title: 'Publish Course',
                    })
                  }
                  className="text-primary"
                />
              </Tooltip>
            </>
          )}
          {course.isPublished && (
            <>
              <Tooltip title="Delete">
                <DeleteOutlined
                  onClick={() =>
                    Modal.confirm({
                      centered: true,
                      closable: true,
                      content: (
                        <p className="py-4">
                          Are you want to delte this course? All of its information will be lost.
                        </p>
                      ),
                      maskClosable: true,
                      onOk: () => handleRemove(String(course.key)),
                      title: 'Publish Course',
                    })
                  }
                  className="text-primary"
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ]

  return loading ? (
    <Loading />
  ) : (
    <div>
      <UpdateCourseForm
        course={selectedCourse}
        open={openUpdateModal}
        onUpdate={() => {
          refetch()
          setOpenUpdateModal(false)
        }}
        onCancel={() => setOpenUpdateModal(false)}
      />
      <CreateCourseForm
        open={openCreateModal}
        onCreate={onCreate}
        onCancel={() => setOpenCreateModal(false)}
      />
      <div className="py-5 px-4 flex justify-end">
        <Button
          type="primary"
          icon={<PlusOutlined className="inline-block align-middle" />}
          onClick={() => {
            setOpenCreateModal(true)
          }}
        >
          <span>
            <p className="font-medium">Create</p>
          </span>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={convertMyCoursesItems(data?.courses?.items as Course[])}
        size="middle"
        className="w-[70vw]"
        tableLayout="fixed"
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.courses.meta?.totalItems,
          pageSize: data?.courses.meta?.itemsPerPage,
          showTotal: (total, range) => `${`${range[0]} - ${range[1]}`}/${total}`,
          onChange: (page) => {
            setPage(page)
            refetch({
              queryParams: {
                pagination: {
                  page,
                  limit: DEFAULT_LIMIT_ITEMS,
                },
                filters: {
                  userId: currentUser.id,
                },
              },
            })
          },
        }}
      />
    </div>
  )
}

export default MyCourses
