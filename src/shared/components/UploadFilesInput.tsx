import { UploadOutlined } from '@ant-design/icons'
import { Button, FormInstance, Upload } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { S3 } from 'aws-sdk'
import { FC, useState } from 'react'
import { getFileNameFromUrl } from '../../utils/form'

interface UploadFilesInputProps {
  form: FormInstance
  className?: string
  defaultFileList?: UploadFile[] | undefined
}

const UploadFilesInput: FC<UploadFilesInputProps> = ({ form, className, defaultFileList }) => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const s3 = new S3({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION,
  })

  return (
    <Upload
      className={className || ''}
      fileList={fileList}
      onRemove={() => {
        fileList[0].url &&
          import.meta.env.VITE_AWS_S3_BUCKET_NAME &&
          s3.deleteObject(
            {
              Key: getFileNameFromUrl(fileList[0].url),
              Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
            },
            () => setFileList([])
          )
      }}
      customRequest={(option) => {
        const file = option.file as any

        if (file) {
          import.meta.env.VITE_AWS_S3_BUCKET_NAME &&
            s3
              .upload({
                Key: `${Date.now()}_${file.name}`,
                Body: file,
                Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
              })
              .promise()
              .then(({ Location }) => {
                file.url = Location
                const newFileList = [...fileList, file]
                setFileList(newFileList)
                form.setFieldsValue({ files: newFileList.map((file) => file.url) })
              })
        }
      }}
    >
      <Button icon={<UploadOutlined className="align-text-bottom" />}>Click to Upload</Button>
    </Upload>
  )
}

export default UploadFilesInput
