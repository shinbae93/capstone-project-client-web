import { UploadChangeParam, UploadFile } from 'antd/es/upload'

export const getFile = (e: UploadChangeParam<UploadFile>) => e && e.fileList && e.fileList[0].url

export const getFileName = (url: string) => url.split('/').pop()?.split(/-(.*)/)[1]

export const convertUrlToFiles = (urls: string[]) =>
  urls?.[0]
    ? urls.map((item, index) => ({
        name: getFileName(item) || `Document ${index}`,
        uid: index.toString(),
        url: item,
      }))
    : []
