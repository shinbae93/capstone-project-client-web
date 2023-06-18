import { ExclamationOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, UploadFile, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import BecomeTeacherBreadcrumb from '../features/become-teacher/components/Breadcrumb'
import { S3 } from 'aws-sdk'
import { useState } from 'react'
import { useCreateTutorRequestMutation } from '../graphql/generated/graphql'
import { getFileNameFromUrl } from '../utils/form'

const BecomeTeacher = () => {
  const [form] = useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [createTutorRequest] = useCreateTutorRequestMutation()

  const s3 = new S3({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION,
  })

  const sendTutorRequest = () => {
    fileList?.[0]?.url &&
      createTutorRequest({
        variables: {
          input: {
            cv: fileList[0].url,
          },
        },
        onCompleted: () => {
          notification.success({
            message: 'Send request successfully',
          })
        },
      })
  }

  return (
    <>
      <BecomeTeacherBreadcrumb />
      <div className="px-28 py-12">
        <div>
          <p className="font-semibold text-3xl">Become a Teacher</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <div className="relative">
            <p className="text-2xl font-medium text-center">Apply As Tutor</p>
            <p className="text-footer text-xs my-2 text-center">
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <span className="absolute bottom-0 h-[1px] w-[35px] bg-[#333333] box-border right-0 left-0 m-auto"></span>
          </div>
          <p className="text-center max-w-2xl font-extralight text-sm leading-6 my-8">
            Lid est laborum dolo rumes fugats untras. Etharums ser quidem rerum facilis dolores
            nemis omnis fugats vitaes nemo minima rerums unsers sadips amets. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam.
          </p>
          <img src="https://eduma.thimpress.com/wp-content/uploads/2015/11/become-teacher.jpg" />
          <div className="relative mt-8">
            <p className="text-2xl font-medium text-center">How to become a teacher</p>
            <p className="text-footer text-xs my-2 text-center">
              Upload your CV by using upload button below.
            </p>
            <p className="text-footer text-xs my-2 text-center">
              We will review it and let you know if you can be a tutor in our system.
            </p>
            <span className="absolute bottom-0 h-[1px] w-[35px] bg-[#333333] box-border right-0 left-0 m-auto"></span>
          </div>
          <div className="mt-5 flex flex-row justify-evenly">
            <Form className="flex items-center justify-center" onFinish={sendTutorRequest}>
              <Form.Item
                label={<p className="font-medium text-center">Upload your CV here</p>}
                required
              >
                <Upload
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
                            setFileList([file])
                            form.setFieldsValue({ thumbnail: Location })
                          })
                    }
                  }}
                >
                  <Button icon={<UploadOutlined className="align-baseline" />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  className="rounded-lg font-medium ml-5 shadow-sm"
                  htmlType="submit"
                  icon={<SendOutlined className="align-baseline" />}
                  type="primary"
                >
                  <p className="text-white h-full inline-block">Send</p>
                </Button>
              </Form.Item>
            </Form>
            <div className="border-[1px] border-info w-[48%] mt-7">
              <div className="p-5">
                <p className="font-semibold pb-4 border-b-[1px] border-info">RULES</p>
                <div className="pt-5">
                  <span className="flex flex-row items-start py-2" key={1}>
                    <ExclamationOutlined />
                    <p className="inline-block text-sm font-thin text-slate-600 px-3">
                      Be professional, straightforward and conscientious. Student can report you so
                      you can be banned from our system.
                    </p>
                  </span>
                  <span className="flex flex-row items-center py-2" key={1}>
                    <ExclamationOutlined />
                    <p className="inline-block text-sm font-thin text-slate-600 px-3">
                      We get 5% of your tuition fee by each payment.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BecomeTeacher
