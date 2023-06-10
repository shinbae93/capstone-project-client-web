import { Button, Checkbox, Col, Divider, Form, List, Row, Select } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DEFAULT_LIMIT_ITEMS } from '../../../common/constants.ts'
import {
  Course,
  useCoursesQuery,
  useGradesQuery,
  useSubjectsQuery,
} from '../../../graphql/generated/graphql.ts'
import Loading from '../../../shared/components/Loading.tsx'
import { CourseItem } from './CourseItem.tsx'

interface FilterCourseDto {
  gradeIds: string[]
  subjectIds: string[]
}

const CourseList = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')

  const { data: gradesQueryResult, loading: loadingGrades } = useGradesQuery()
  const { data: subjectsQueryResult, loading: loadingSubjects } = useSubjectsQuery()

  const grades = gradesQueryResult?.grades
  const subjects = subjectsQueryResult?.subjects

  const {
    data: coursesQueryResult,
    loading: loadingCourses,
    refetch,
  } = useCoursesQuery({
    variables: {
      queryParams: {
        filters: {
          q,
        },
        pagination: {
          limit: DEFAULT_LIMIT_ITEMS,
          page: 1,
        },
      },
    },
  })

  const courses = coursesQueryResult?.courses

  const handleFilter = (filter: FilterCourseDto) => {
    const { gradeIds, subjectIds } = filter
    refetch({
      queryParams: {
        filters: {
          q,
          gradeIds: gradeIds?.length ? gradeIds : null,
          subjectIds: subjectIds?.length ? subjectIds : null,
        },
        pagination: {
          limit: DEFAULT_LIMIT_ITEMS,
          page: courses?.meta?.currentPage || 1,
        },
      },
    })
  }

  if (loadingCourses && loadingGrades && loadingSubjects) return <Loading />

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
            <Select
              defaultValue="newly published"
              options={[
                {
                  value: 'newly published',
                  label: <p>Newly published</p>,
                },
                {
                  value: 'alphabetical',
                  label: <p>Alphabetical</p>,
                },
              ]}
              className="w-44"
            />
          </div>
          {/** Course list */}
          <div className="py-5">
            <List
              itemLayout="vertical"
              size="default"
              pagination={{
                onChange: (page) => {
                  refetch({
                    queryParams: {
                      filters: {
                        q,
                      },
                      pagination: {
                        limit: DEFAULT_LIMIT_ITEMS,
                        page,
                      },
                    },
                  })
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
                    navigate(`/courses/${item.id}`)
                  }}
                  className="hover:cursor-pointer"
                >
                  <CourseItem course={item as Course} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>

      {/** Sidebar */}
      <div className="flex-1">
        <div className="sidebar px-5 py-2">
          <Form onFinish={handleFilter} layout="vertical" className="p-4">
            {/** Subject */}
            <Form.Item name="subjectIds" label={<p>Subject</p>}>
              <Checkbox.Group className="w-full">
                <Divider className="my-2" />
                <Col>
                  {subjects?.map((subject, index) => (
                    <Row className="py-1" key={index}>
                      <Checkbox value={subject.id}>
                        <p>{subject.name}</p>
                      </Checkbox>
                    </Row>
                  ))}
                </Col>
              </Checkbox.Group>
            </Form.Item>

            {/** Grade */}
            <Form.Item name="gradeIds" className="mb-0" label={<p>Grade</p>}>
              <Checkbox.Group className="w-full">
                <Divider className="my-2" />
                <Col>
                  {grades?.map((grade, index) => (
                    <Row className="py-1" key={index}>
                      <Checkbox value={grade.id}>
                        <p>{grade.name}</p>
                      </Checkbox>
                    </Row>
                  ))}
                </Col>
              </Checkbox.Group>
            </Form.Item>

            {/** Filter button */}
            <Form.Item className="mb-0">
              <div className="text-center py-5">
                <Button
                  className="bg-primary h-9 font-semibold hover:border-primary hover:text-white"
                  htmlType="submit"
                >
                  Filter Results
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CourseList
