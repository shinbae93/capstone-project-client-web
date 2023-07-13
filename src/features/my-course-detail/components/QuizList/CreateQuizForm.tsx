import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { useParams } from 'react-router-dom'
import { useClassesQuery, useCreateQuizMutation } from '../../../../graphql/generated/graphql'
import UploadFilesInput from '../../../../shared/components/UploadFilesInput'

interface CreateQuizFormProps {
  open: boolean
  onCreate: () => void
  onCancel: () => void
}

const CreateQuizForm: React.FC<CreateQuizFormProps> = ({ open, onCreate, onCancel }) => {
  const { courseId } = useParams()
  const [form] = Form.useForm()
  const [createQuiz] = useCreateQuizMutation()
  const { data: getClassQueryResult } = useClassesQuery({
    fetchPolicy: 'network-only',
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
      open={open}
      title="Create quiz"
      okText="Create"
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

          createQuiz({
            variables: {
              input: {
                ...values,
                courseId,
              },
            },
            onCompleted: () => {
              form.resetFields()
              onCreate()
            },
          })
        })
      }}
      className="w-2/5"
    >
      <Form preserve={false} form={form} layout="vertical" className="p-4">
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
        <Form.Item valuePropName="files" name="files" label="Files">
          <UploadFilesInput form={form} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateQuizForm
