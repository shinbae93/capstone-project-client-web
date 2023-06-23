import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Table } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { FC, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'
import { DEFAULT_LIMIT_ITEMS, GenderDisplay } from '../../../common/constants'
import { Enrolment, useStudentEnrolmentsQuery } from '../../../graphql/generated/graphql'
import { convertEnrolmentsToStudentItems } from '../../../utils/course-table'

export interface StudentItemDataType {
  key: React.Key
  avatar: string
  userId: string
  fullName: string
  gender: number
  birthday: Date
  isFinished: boolean
  createdAt: Date
}

type StudentItemDataIndex = keyof StudentItemDataType

interface StudentListProps {
  courseId: string
}

const StudentList: FC<StudentListProps> = ({ courseId }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const { data, refetch } = useStudentEnrolmentsQuery({
    variables: {
      queryParams: {
        filters: {
          courseId,
        },
        pagination: {
          page: 1,
          limit: DEFAULT_LIMIT_ITEMS,
        },
      },
    },
  })

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: StudentItemDataIndex
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
    dataIndex: StudentItemDataIndex
  ): ColumnType<StudentItemDataType> => ({
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

  const columns: ColumnsType<StudentItemDataType> = [
    {
      dataIndex: 'avatar',
      width: '10%',
      render: (value: string, record) => (
        <Link to={`/user/${record.userId}`}>
          <img src={value} alt="course-thumbnail" className="w-14 h-14" />
        </Link>
      ),
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender - b.gender,
      sortDirections: ['descend', 'ascend'],
      filters: [
        {
          text: 'Male',
          value: 0,
        },
        {
          text: 'Female',
          value: 1,
        },
        {
          text: 'Other',
          value: 2,
        },
      ],
      onFilter: (value, record) => record.gender == value,
      render: (value: keyof typeof GenderDisplay) => GenderDisplay[value],
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      sorter: (a, b) => +dayjs(a.birthday).isBefore(dayjs(b.birthday)),
      render: (value) => dayjs(value).format('DD-MM-YYYY'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Enrolled at',
      dataIndex: 'createdAt',
      sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      render: (value) => dayjs(value).format('DD-MM-YYYY'),
      sortDirections: ['descend', 'ascend'],
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={convertEnrolmentsToStudentItems((data?.enrolments?.items as Enrolment[]) || [])}
      size="large"
      tableLayout="fixed"
      pagination={{
        defaultCurrent: 1,
        current: data?.enrolments?.meta?.currentPage,
        total: data?.enrolments?.meta?.totalItems,
        pageSize: data?.enrolments?.meta?.itemsPerPage,
        showTotal: (total, range) => `${`${range[0]} - ${range[1]}`}/${total}`,
        onChange: (page) => {
          refetch({
            queryParams: {
              filters: {
                courseId,
              },
              pagination: {
                page,
                limit: DEFAULT_LIMIT_ITEMS,
              },
            },
          })
        },
      }}
    />
  )
}

export default StudentList
