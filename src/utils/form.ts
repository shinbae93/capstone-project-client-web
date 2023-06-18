import { Dayjs } from 'dayjs'

export const getDateInput = (e: Dayjs) => e.toDate()

export const getFileNameFromUrl = (url: string) => url.split('/').at(-1) || '#@!#@!#!@#!@'
