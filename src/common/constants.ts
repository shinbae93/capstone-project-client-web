export const DEFAULT_IMG =
  `https://hungnguyen-capstoneproject-public.s3.ap-southeast-1.amazonaws.com/logo-black-text.svg` as const

export const DEFAULT_AVATAR = `https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg`

export const MOCK_TEXT = `Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis
molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est
enim perferendis est neque sunt. Nam amet sunt aut vero mollitia ut ipsum corporis
vel facere eius et quia aspernatur qui fugiat repudiandae. Et officiis inventore
et quis enim ut quaerat corporis sed reprehenderit odit sit saepe distinctio et
accusantium repellendus ea enim harum.`

export const DEFAULT_LIMIT_ITEMS = 20

export const LOCAL_STORAGE_TOKEN_KEY = 'edusm-access-token'
export const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'edusm-refresh-token'

export enum DayOfWeek {
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
}

export const CourseStatusDisplay = {
  ENDED: 'Finished',
  IN_PROGRESS: 'In Progress',
  UP_COMING: 'Not Started',
}

export const RoleId = {
  ADMIN: 'b9961f54-9748-424d-9453-7dbeec05e212',
  TUTOR: '33358dbf-7697-4324-bccd-334a3691b84b',
  STUDENT: '9a588a6e-c21e-48f5-a8da-307724a76b89',
} as const

export const GenderDisplay = {
  0: 'Male',
  1: 'Female',
  2: 'Other',
}
