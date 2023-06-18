import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, Modal, Upload } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { S3 } from 'aws-sdk'
import { FC, useState } from 'react'
import { getFileNameFromUrl } from '../../utils/form'

interface UploadInputProps {
  form: FormInstance
}

const UploadInput: FC<UploadInputProps> = ({ form }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const s3 = new S3({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION,
  })

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async () => {
    setPreviewOpen(true)
  }

  return (
    <>
      <Upload
        name="picture"
        listType="picture-card"
        onPreview={handlePreview}
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
                  setImageUrl(Location)
                  file.url = Location
                  setFileList([file])
                  form.setFieldsValue({ thumbnail: Location })
                })
          }
        }}
      >
        {fileList && fileList.length > 0 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={fileList?.[0]?.fileName || ''}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
    </>
  )
}

export default UploadInput
