import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { FC } from 'react'
import { DEFAULT_LIMIT_ITEMS } from '../../../../common/constants'
import { Payment, useGetPaymentsQuery } from '../../../../graphql/generated/graphql'
import { CurrencyFormatter } from '../../../../utils/format'

interface PaymentListProps {
  courseId: string
}

export interface PaymentItemDataType {
  key: React.Key
  user: string
  class: string
  amount: number
  duration: string
  createdAt: Date
}

const convertPaymentItem = (payments: Payment[]) => {
  return payments?.map<PaymentItemDataType>((item) => ({
    key: item.id,
    user: item.user.fullName,
    class: item.class.name,
    duration: `${dayjs(item.class.startDate).format('DD/MM/YYYY')} - ${dayjs(
      item.class.endDate
    ).format('DD/MM/YYYY')}`,
    amount: item.amount,
    createdAt: item.createdAt,
  }))
}

const PaymentList: FC<PaymentListProps> = ({ courseId }) => {
  const { data, refetch } = useGetPaymentsQuery({
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

  const columns: ColumnsType<PaymentItemDataType> = [
    {
      title: 'Student',
      dataIndex: 'user',
      sorter: (a, b) => a.user.length - b.user.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Class',
      dataIndex: 'class',
      sorter: (a, b) => a.class.length - b.class.length,
      sortDirections: ['descend', 'ascend'],
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

  return (
    <Table
      columns={columns}
      dataSource={convertPaymentItem(data?.payments?.items as Payment[])}
      size="large"
      tableLayout="fixed"
      pagination={{
        defaultCurrent: 1,
        current: data?.payments?.meta?.currentPage,
        total: data?.payments?.meta?.totalItems,
        pageSize: data?.payments?.meta?.itemsPerPage,
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

export default PaymentList
