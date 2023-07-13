import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC } from 'react'
import { Assignment, useFeedbackAssignmentMutation } from '../../../../graphql/generated/graphql'

interface FeedbackAssignmentFormProps {
  assignment: Partial<Assignment> | undefined
  onFeedback: () => void
  onCancel: () => void
}

const FeedbackAssignmentForm: FC<FeedbackAssignmentFormProps> = ({
  assignment,
  onCancel,
  onFeedback,
}) => {
  const [form] = useForm()
  const [feedbackAssignment] = useFeedbackAssignmentMutation()

  return (
    <Modal
      open={!!assignment}
      title="Feedback assignment"
      okText="Save"
      cancelText="Cancel"
      destroyOnClose={true}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          feedbackAssignment({
            variables: {
              input: {
                ...values,
                id: assignment?.id,
              },
            },
            onCompleted: () => {
              form.resetFields()
              onFeedback()
            },
          })
        })
      }}
      className="w-2/5"
    >
      <Form preserve={false} form={form} layout="vertical" className="p-4">
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[{ required: true, message: 'Please input feedback' }]}
          initialValue={assignment?.feedback}
        >
          <Input.TextArea placeholder="Feedback" rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FeedbackAssignmentForm
