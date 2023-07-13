import { Form, Input, Modal } from 'antd'
import { CreateTutorReportInput } from '../../../graphql/generated/graphql'
import UploadFilesInput from '../../../shared/components/UploadFilesInput'

interface ReportTutorFormProps {
  open: boolean
  onCreate: (input: CreateTutorReportInput) => void
  onCancel: () => void
}

const ReportTutorForm: React.FC<ReportTutorFormProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title="Report this tutor"
      okText="Report"
      cancelText="Cancel"
      destroyOnClose
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields()
          onCreate(values)
        })
      }}
      className="w-2/5"
    >
      <Form form={form} layout="vertical" name="create_course_form" className="p-4">
        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: 'Please tell us your reason' }]}
        >
          <Input.TextArea placeholder="Reason" rows={4} />
        </Form.Item>
        <Form.Item valuePropName="files" name="files" label="Files">
          <UploadFilesInput form={form} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ReportTutorForm
