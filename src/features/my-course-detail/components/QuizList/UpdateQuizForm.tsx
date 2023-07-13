import { DatePicker, Form, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { Quiz, useClassesQuery, useUpdateQuizMutation } from '../../../../graphql/generated/graphql'
import UploadFilesInput from '../../../../shared/components/UploadFilesInput'
import { DeepPartial } from '../../../../utils/type'
import { convertUrlToFiles } from '../../../../utils/upload'

interface UpdateQuizFormProps {
  data: DeepPartial<Quiz> | undefined
  onUpdate: () => void
  onCancel: () => void
}

const UpdateQuizForm: React.FC<UpdateQuizFormProps> = ({ data, onUpdate, onCancel }) => {
  const { courseId } = useParams()
  const [form] = Form.useForm()
  const [updateQuiz] = useUpdateQuizMutation()
  const { data: getClassQueryResult } = useClassesQuery({
    variables: {
      queryParams: {
        filters: {
          courseId,
        },
      },
    },
  })

  return (
    <Modal
      open={!!data}
      title="Update quiz"
      okText="Update"
      cancelText="Cancel"
      destroyOnClose={true}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          values.startTime = values.answerTime[0].toDate()
          values.endTime = values.answerTime[1].toDate()
          delete values.answerTime

          updateQuiz({
            variables: {
              input: {
                ...values,
                id: data?.id,
              },
            },
            onCompleted: () => {
              form.resetFields()
              onUpdate()
            },
          })
        })
      }}
      className="w-2/5"
    >
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        className="p-4"
        initialValues={{
          title: data?.title,
          answerTime: [dayjs(data?.startTime), dayjs(data?.endTime)],
          classId: data?.classId,
          content: data?.content,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input title of the quiz' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item className="mb-0">
          <Form.Item
            name="answerTime"
            label="Answer time"
            rules={[{ required: true, message: 'Please input answer time of the quiz' }]}
            className="inline-block w-[65%]"
          >
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="classId"
            label="Class"
            rules={[{ required: true, message: 'Please input class of the quiz' }]}
            className="inline-block w-1/3 ml-2"
          >
            <Select placeholder="Select class...">
              {getClassQueryResult?.classes?.map((item, index) => (
                <Select.Option value={item.id} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input content of the quiz' }]}
        >
          <Input.TextArea placeholder="Content" rows={6} />
        </Form.Item>
        <Form.Item name="files" valuePropName="files" label="Files">
          <UploadFilesInput
            form={form}
            defaultFileList={convertUrlToFiles(data?.files as string[])}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateQuizForm
