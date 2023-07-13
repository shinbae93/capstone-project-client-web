import { DollarOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { ApolloQueryResult } from '@apollo/client'
import { CardElement } from '@stripe/react-stripe-js'
import { Button, Form, Input, InputNumber, InputRef, Modal, Space, Table, Tag, Tooltip } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { FC, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Link, useNavigate } from 'react-router-dom'
import { EnrolmentStatusColors, EnrolmentStatusDisplay } from '../../../common/constants'
import {
  Class,
  EnrolmentQueryParams,
  EnrolmentStatus,
  Exact,
  GetMyEnrolmentsQuery,
  InputMaybe,
  PaginationMeta,
  useChargeMutation,
  useGetClassLazyQuery,
  useIsOverduePaymentLazyQuery,
} from '../../../graphql/generated/graphql'
import usePaymentForm from '../../../hooks/usePayment'
import { CurrencyFormatter } from '../../../utils/format'

export interface LearningItemDataType {
  key: React.Key
  thumbnail: string
  name: string
  courseId: string
  classId: string
  status: string
  fee: number
  startDate: string
  endDate: string
  tutorId: string
  tutorName: string
  paymentId: string
}

export type LearningItemDataIndex = keyof LearningItemDataType

interface MyLearningListProps {
  data: LearningItemDataType[]
  pagination: PaginationMeta
  setPage: (page: number) => void
  refetch: (
    variables?:
      | Partial<
          Exact<{
            queryParams?: InputMaybe<EnrolmentQueryParams> | undefined
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyEnrolmentsQuery>>
}

const MyLearningList: FC<MyLearningListProps> = ({ data, pagination, setPage, refetch }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const searchInput = useRef<InputRef>(null)
  const { handleSubmit } = usePaymentForm()
  const [form] = useForm()
  const navigate = useNavigate()
  const [charge] = useChargeMutation()
  const [getClass] = useGetClassLazyQuery()
  const [isOverduePayment] = useIsOverduePaymentLazyQuery()

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
      width: '8%',
      render: (value: string, record) => (
        <Link to={`/courses/${record.courseId}/learning`}>
          <img src={value} alt="course-thumbnail" className="w-14 h-14 object-scale-down" />
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '14%',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      filters: Object.values(EnrolmentStatus).map((item) => ({
        text: EnrolmentStatusDisplay[item],
        value: item,
      })),
      render: (value) => (
        <Tag color={EnrolmentStatusColors[value as keyof typeof EnrolmentStatusColors]}>
          <p className="font-medium text-white">
            {EnrolmentStatusDisplay[value as keyof typeof EnrolmentStatusDisplay]}
          </p>
        </Tag>
      ),
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      width: '10%',
      sorter: (a, b) => a.fee - b.fee,
      sortDirections: ['descend', 'ascend'],
      render: (value) => CurrencyFormatter.format(value),
    },
    {
      title: 'Tutor',
      width: '12%',
      dataIndex: 'tutorName',
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('tutorName'),
    },
    {
      title: 'Start date',
      width: '12%',
      dataIndex: 'startDate',
      sorter: (a, b) => +dayjs(a.startDate).isBefore(dayjs(b.startDate)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'End date',
      width: '12%',
      dataIndex: 'endDate',
      sorter: (a, b) => +dayjs(a.endDate).isBefore(dayjs(b.endDate)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      fixed: 'right',
      render: (_, enrolment) => (
        <Space size="middle">
          <>
            <Tooltip title="View">
              <EyeOutlined
                onClick={async () => {
                  const { data: isOverduePaymentRes } = await isOverduePayment({
                    variables: {
                      id: String(enrolment.key),
                    },
                  })

                  if (isOverduePaymentRes?.enrolment?.status == EnrolmentStatus.OverduePayment) {
                    Modal.error({
                      centered: true,
                      closable: true,
                      footer: null,
                      content: <p className="py-4">Your enrolment is overdue for payment !</p>,
                      maskClosable: true,
                      title: 'Overdue for payment',
                    })
                  } else if (enrolment.paymentId?.length <= 0) {
                    Modal.confirm({
                      centered: true,
                      closable: true,
                      okText: 'Pay now',
                      content: (
                        <p className="py-4">
                          You have not pay for this enrolment yet! Please pay now to access this
                          course.
                        </p>
                      ),
                      maskClosable: true,
                      onOk: () => {
                        getClass({
                          fetchPolicy: 'network-only',
                          variables: {
                            id: enrolment.classId,
                          },
                        }).then((res) => {
                          setSelectedClass(res?.data?.getClass as Class)
                          setIsPaymentModalOpen(true)
                        })
                      },
                      title: 'View course',
                    })
                  } else {
                    navigate(`/courses/${enrolment.courseId}/learning`)
                  }
                }}
                className="text-primary"
              />
            </Tooltip>
          </>
          {enrolment.status == EnrolmentStatus.PendingPayment && (
            <>
              <Tooltip title="Pay">
                <DollarOutlined
                  onClick={() => {
                    getClass({
                      fetchPolicy: 'network-only',
                      variables: {
                        id: enrolment.classId,
                      },
                    }).then((res) => {
                      setSelectedClass(res?.data?.getClass as Class)
                      setIsPaymentModalOpen(true)
                    })
                  }}
                  className="text-primary"
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Modal
        open={isPaymentModalOpen}
        centered={true}
        closable={true}
        maskClosable={true}
        okText="Pay"
        onCancel={() => {
          form.resetFields()
          setIsPaymentModalOpen(false)
        }}
        onOk={() => {
          form.validateFields().then(async () => {
            const paymentMethodId = await handleSubmit()

            charge({
              variables: {
                input: {
                  classId: selectedClass?.id || '',
                  paymentMethodId: paymentMethodId || '',
                },
              },
              onCompleted: () => {
                form.resetFields()
              },
            }).then(() => {
              refetch()
            })
          })
          setIsPaymentModalOpen(false)
        }}
        title="Pay"
      >
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          name="create_course_form"
          className="p-4"
        >
          <Form.Item
            messageVariables={{ name: 'Amount' }}
            label="Amount"
            name={'amount'}
            rules={[{ required: true, type: 'number' }]}
            className="w-1/2"
            initialValue={selectedClass?.fee}
          >
            <InputNumber min={1} addonBefore={'$'} className="w-full" disabled />
          </Form.Item>
          <Form.Item label="Card information">
            <CardElement />
          </Form.Item>
        </Form>
      </Modal>
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
    </>
  )
}

export default MyLearningList
