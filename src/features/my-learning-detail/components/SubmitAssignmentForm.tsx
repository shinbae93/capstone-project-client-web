import { Form, Input, Modal } from 'antd'
import { FC } from 'react'
import { Assignment, useSubmitAssignmentMutation } from '../../../graphql/generated/graphql'
import UploadFilesInput from '../../../shared/components/UploadFilesInput'
import { DeepPartial } from '../../../utils/type'
import dayjs from 'dayjs'
import { convertUrlToFiles } from '../../../utils/upload'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { getFileNameFromUrl } from '../../../utils/form'

interface SubmitAssignmentFormProps {
  data: DeepPartial<Assignment> | undefined
  onSubmit: () => void
  onCancel: () => void
}

const SubmitAssignmentForm: FC<SubmitAssignmentFormProps> = ({ data, onCancel, onSubmit }) => {
  const [form] = Form.useForm()
  const [submitAssignment] = useSubmitAssignmentMutation()

  return (
    <Modal
      open={!!data}
      title="Assignment"
      okText="Submit"
      cancelText="Cancel"
      destroyOnClose={true}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          submitAssignment({
            variables: {
              input: { id: String(data?.id), ...values },
            },
            onCompleted: () => {
              form.resetFields()
              onSubmit()
            },
          })
        })
      }}
      className="w-2/5"
    >
      <div className="my-5">
        <p className="py-1 font-normal">
          Title: <span className="font-semibold">{data?.quiz?.title}</span>
        </p>
        <p className="py-1 font-normal">
          Answer time:{' '}
          <span className="font-semibold">
            {`${dayjs(data?.quiz?.startTime).format('DD/MM/YYYY')} - ${dayjs(
              data?.quiz?.endTime
            ).format('DD/MM/YYYY')}`}
          </span>
        </p>
        <p className="py-1 font-semibold">Content:</p>
        <Input.TextArea className="py-1" value={data?.quiz?.content} contentEditable={false} />
        <p className="pt-2 font-semibold">Attachments:</p>
        <p>
          {data?.quiz?.files?.map((item) => (
            <a href={item} target="_blank" className="italic">
              {item ? getFileNameFromUrl(item) : ''}
            </a>
          ))}
        </p>
      </div>
      <Form preserve={false} form={form} layout="vertical" name="create_course_form">
        <Form.Item name="files" valuePropName="files" label="Files" required>
          <UploadFilesInput
            form={form}
            defaultFileList={convertUrlToFiles(data?.files as string[])}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SubmitAssignmentForm
