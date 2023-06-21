import { Badge, BadgeProps, Calendar, Popover, Space, Tag } from 'antd'
import { Dayjs } from 'dayjs'
import { Calendar as CalendarObject, useGetCalendarQuery } from '../graphql/generated/graphql'
import { groupBy } from 'lodash'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const BadgeStatus = {
  ENDED: 'error',
  IN_PROGRESS: 'processing',
  UP_COMING: 'warning',
}

interface PopOverContentProps {
  calendar: CalendarObject
}

const PopOverContent: FC<PopOverContentProps> = ({ calendar }) => (
  <Space direction="vertical">
    <Tag color={calendar.tutorName ? '#87d068' : '#2db7f5'}>
      <p className="px-2 py-[2px]">{calendar.tutorName ? 'Student' : 'Tutor'}</p>
    </Tag>
    <p>
      Course: <Link to={`/courses/${calendar.id}`}>{calendar.courseName}</Link>
    </p>
    <p>Class: {calendar.className}</p>
    <p>Method: {calendar.method}</p>
    <p>
      Time: {calendar.startTime} - {calendar.endTime}
    </p>
    {calendar.tutorName && <p>tutor: {calendar.tutorName}</p>}
  </Space>
)

const MyCalendar = () => {
  const { data: getCalendarQueryResult } = useGetCalendarQuery()

  const data = groupBy(getCalendarQueryResult?.calendars || [], 'date')

  const dateCellRender = (value: Dayjs) => {
    const listData = data[value.format('YYYY-MM-DD')]
    return listData?.length ? (
      <ul>
        {listData.map((item) => (
          <Popover
            content={<PopOverContent calendar={item as CalendarObject} />}
            title={<p className="text-lg">{`${item.courseName} - ${item.className}`}</p>}
            trigger="click"
          >
            <li key={item.id} className="overflow-x-hidden">
              <Badge
                status={BadgeStatus[item.status] as BadgeProps['status']}
                text={`${item.courseName} - ${item.className}`}
                className="hover:bg-[#dcdfe0] rounded whitespace-nowrap"
              />
            </li>
          </Popover>
        ))}
      </ul>
    ) : (
      <></>
    )
  }

  const cellRender = (current: Dayjs, info: any) => {
    if (info.type === 'date') return dateCellRender(current)
    return info.originNode
  }

  return <Calendar cellRender={cellRender} className="w-[70vw] pb-10" />
}

export default MyCalendar
