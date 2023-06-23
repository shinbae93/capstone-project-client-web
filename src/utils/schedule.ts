import { DayOfWeek } from '../common/constants'
import { ScheduleTime } from '../graphql/generated/graphql'

export const convertScheduleToString = (schedule: ScheduleTime) => {
  return `${DayOfWeek[schedule.dayOfWeek]}: ${schedule.startTime} - ${schedule.endTime}`
}
