import { SearchOutlined } from '@ant-design/icons'
import { Form, Input, List } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_LIMIT_ITEMS } from '../../../common/constants.ts'
import { TutorDetail, useTutorDetailsQuery } from '../../../graphql/generated/graphql.ts'
import Loading from '../../../shared/components/Loading.tsx'
import { TutorItem } from './TutorItem.tsx'

const TutorList = () => {
  const navigate = useNavigate()
  const [form] = useForm()
  const [page, setPage] = useState<number>(1)

  const {
    data: TutorQueryResult,
    loading,
    refetch,
  } = useTutorDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        pagination: {
          limit: DEFAULT_LIMIT_ITEMS,
          page,
        },
      },
    },
  })

  const courses = TutorQueryResult?.tutorDetails

  if (loading) return <Loading />

  return (
    <div className="py-12 px-28 flex flex-row gap-10">
      {/** Course list */}
      <div className="flex-[3]">
        {/** Course list section */}
        <div>
          {/** Top bar of course list */}
          <div className="flex justify-between w-full">
            {/** Pagination results */}
            <p className="text-footer text-sm">
              Showing 1-{courses?.meta?.itemCount || DEFAULT_LIMIT_ITEMS} of{' '}
              {courses?.meta?.totalItems} results
            </p>
            {/** Sort menu */}
            <Form
              form={form}
              onFinish={(values) => {
                refetch({
                  queryParams: {
                    filters: {
                      ...values,
                    },
                    pagination: {
                      limit: DEFAULT_LIMIT_ITEMS,
                      page,
                    },
                  },
                })
              }}
            >
              <Form.Item name="name" className="mb-0">
                <Input
                  placeholder="Search tutor name..."
                  suffix={
                    <SearchOutlined
                      onClick={() =>
                        refetch({
                          queryParams: {
                            filters: {
                              name: form.getFieldValue('name'),
                            },
                            pagination: {
                              limit: DEFAULT_LIMIT_ITEMS,
                              page,
                            },
                          },
                        })
                      }
                      className="hover:cursor-pointer"
                    />
                  }
                  className="w-[20rem] h-10"
                />
              </Form.Item>
            </Form>
          </div>
          {/** Course list */}
          <div className="py-5 w-2/3">
            <List
              itemLayout="vertical"
              size="default"
              pagination={{
                onChange: (page) => {
                  setPage(page)
                },
                current: courses?.meta?.currentPage,
                pageSize: courses?.meta?.itemsPerPage,
                total: courses?.meta?.totalItems,
                align: 'center',
                style: {
                  paddingTop: '24px',
                },
              }}
              dataSource={courses?.items}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={() => {
                    navigate(`/tutors/${item.userId}`)
                  }}
                  className="hover:cursor-pointer"
                >
                  <TutorItem tutor={item as TutorDetail} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorList
