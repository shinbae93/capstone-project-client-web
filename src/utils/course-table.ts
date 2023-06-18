import { DEFAULT_IMG } from '../common/constants'
import { LearningItemDataType } from '../features/my-learning/components/MyLearningList'
import { CourseStatus, Enrolment } from '../graphql/generated/graphql'

export const convertEnrolmentsToLearningItems = (enrolments: Enrolment[]) => {
  return enrolments.map<LearningItemDataType>((item) => ({
    key: item.id,
    name: item.course.name,
    courseId: item.course.id,
    thumbnail: item.course.thumbnail || DEFAULT_IMG,
    status: item.isFinished ? CourseStatus.Ended : item.course.status,
    fee: item.course.fee,
    tutorId: item.course.userId,
    tutorName: item.course.user.fullName,
    startDate: item.course.startDate,
    endDate: item.course.endDate,
  }))
}
