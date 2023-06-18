import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import { FC, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { CourseStatus, PaginationMeta } from '../../../graphql/generated/graphql'
import { CourseStatusDisplay } from '../../../common/constants'
import { Link } from 'react-router-dom'
import { CurrencyFormatter } from '../../../utils/format'
import dayjs from 'dayjs'

export interface LearningItemDataType {
  key: React.Key
  thumbnail: string
  name: string
  courseId: string
  status: string
  fee: number
  startDate: string
  endDate: string
  tutorId: string
  tutorName: string
}

export type LearningItemDataIndex = keyof LearningItemDataType

interface MyLearningListProps {
  data: LearningItemDataType[]
  pagination: PaginationMeta
  setPage: (page: number) => void
}

const MyLearningList: FC<MyLearningListProps> = ({ data, pagination, setPage }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: LearningItemDataIndex
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
    dataIndex: LearningItemDataIndex
  ): ColumnType<LearningItemDataType> => ({
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

  const columns: ColumnsType<LearningItemDataType> = [
    {
      dataIndex: 'thumbnail',
      width: '10%',
      render: (value: string, record) => (
        <Link to={`/courses/${record.courseId}`}>
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
      render: (value: string, record) => <Link to={`/courses/${record.courseId}`}>{value}</Link>,
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
      render: (value) => (
        <Tag
          color={value == 'UP_COMING' ? '#2db7f5' : value == 'IN_PROGRESS' ? '#87d068' : '#F15A59'}
          className="mx-2"
        >
          <p>{CourseStatusDisplay[value as keyof typeof CourseStatusDisplay]}</p>
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
      title: 'Tutor',
      dataIndex: 'tutorName',
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('tutorName'),
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
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="large"
      className="w-[70vw]"
      tableLayout="fixed"
      pagination={{
        defaultCurrent: 1,
        current: pagination.currentPage,
        total: pagination.totalItems,
        pageSize: pagination.itemsPerPage,
        showTotal: (total, range) => `${`${range[0]} - ${range[1]}`}/${total}`,
        onChange: (page) => {
          setPage(page)
        },
      }}
    />
  )
}

export default MyLearningList
