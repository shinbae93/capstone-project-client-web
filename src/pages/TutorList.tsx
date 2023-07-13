import TutorListBreadcrumb from '../features/tutor-list/components/Breadcrumb'
import TutorList from '../features/tutor-list/components/TutorList'

const Tutors = () => {
  return (
    <div>
      <TutorListBreadcrumb />
      {/** Title */}
      <div className="pt-12">
        <div className="px-28">
          <p className="font-semibold text-3xl">Tutors</p>
        </div>
      </div>
      {/** Main content */}
      <div>
        <TutorList />
      </div>
    </div>
  )
}

export default Tutors
