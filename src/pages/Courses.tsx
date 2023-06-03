import CourseList from '../features/courses/components/CourseList'
import CourseSidebar from '../features/courses/components/Sidebar'
import CourseBreadcrumb from '../features/courses/components/Breadcrumb'
import { useCoursesQuery } from '../graphql/generated/graphql'

const Courses = () => {
  const { data, error } = useCoursesQuery()
  console.log('🚀 ~ file: Courses.tsx:8 ~ Courses ~ error:', error)
  console.log('🚀 ~ file: Courses.tsx:8 ~ Courses ~ data:', data)

  return (
    <div>
      <CourseBreadcrumb />
      {/** Title */}
      <div className="pt-12">
        <div className="px-28">
          <p className="font-semibold text-3xl">Courses</p>
        </div>
      </div>
      {/** Main content */}
      <div className="py-12 px-28 flex flex-row gap-10">
        <CourseList />
        <CourseSidebar />
      </div>
    </div>
  )
}

export default Courses
