import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useContext, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_LIMIT_ITEMS } from '../common/constants'
import { AuthContext } from '../context/auth.context'
import { Payment, useGetMyPaymentsQuery } from '../graphql/generated/graphql'
import Loading from '../shared/components/Loading'
import { CurrencyFormatter } from '../utils/format'

export interface MyPaymentItemDataType {
  key: React.Key
  course: string
  class: string
  amount: number
  duration: string
  createdAt: Date
}

type MyPaymentItemDataIndex = keyof MyPaymentItemDataType

const convertMyCoursesItems = (payments: Payment[]) => {
  return payments.map<MyPaymentItemDataType>((item) => ({
    key: item.id,
    course: item.course.name,
    class: item.class.name,
    duration: `${dayjs(item.class.startDate).format('DD/MM/YYYY')} - ${dayjs(
      item.class.endDate
    ).format('DD/MM/YYYY')}`,
    amount: item.amount,
    createdAt: item.createdAt,
  }))
}

const MyPayments = () => {
  const { currentUser } = useContext(AuthContext)

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useGetMyPaymentsQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
      },
    },
  })

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: MyPaymentItemDataIndex
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
    dataIndex: MyPaymentItemDataIndex
  ): ColumnType<MyPaymentItemDataType> => ({
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

  const columns: ColumnsType<MyPaymentItemDataType> = [
    {
      title: 'Course',
      dataIndex: 'class',
      sorter: (a, b) => a.class.length - b.class.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      sorter: (a, b) => a.class.length - b.class.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('class'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
      render: (value) => CurrencyFormatter.format(value),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      render: (value) => dayjs(value).format('DD/MM/YYYY'),
      sortDirections: ['descend', 'ascend'],
    },
  ]

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Table
        columns={columns}
        dataSource={convertMyCoursesItems(data?.myPayments?.items as Payment[])}
        size="middle"
        className="w-[70vw]"
        tableLayout="fixed"
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.myPayments.meta?.totalItems,
          pageSize: data?.myPayments.meta?.itemsPerPage,
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
                  userId: currentUser?.id,
                },
              },
            })
          },
        }}
      />
    </div>
  )
}

export default MyPayments
