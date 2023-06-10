export const formatHourOrMinute = (time: number) => {
  const timeString = time.toString()
  return timeString.length > 1 ? timeString : `0${timeString}`
}
