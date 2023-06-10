import { DayOfWeek } from '../common/constants'
import { ScheduleTime } from '../graphql/generated/graphql'
import { formatHourOrMinute } from './datetime'

export const convertScheduleToString = (schedule: ScheduleTime) => {
  return `${DayOfWeek[schedule.dayOfWeek]}: ${formatHourOrMinute(
    schedule.startTime.hour
  )}:${formatHourOrMinute(schedule.startTime.minute)} - ${formatHourOrMinute(
    schedule.endTime.hour
  )}:${formatHourOrMinute(schedule.endTime.minute)}`
}
