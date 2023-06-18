import CourseBreadcrumb from '../features/courses/components/Breadcrumb'
import CourseList from '../features/courses/components/CourseList'

const Courses = () => {
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
      <div>
        <CourseList />
      </div>
    </div>
  )
}

export default Courses
