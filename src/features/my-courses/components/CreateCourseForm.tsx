import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select } from 'antd'
import {
  CreateCourseInput,
  useGradesQuery,
  useSubjectsQuery,
} from '../../../graphql/generated/graphql'
import UploadInput from '../../../shared/components/UploadInput'
import { getFile } from '../../../utils/upload'

interface CreateCourseFormProps {
  open: boolean
  onCreate: (input: CreateCourseInput) => void
  onCancel: () => void
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  const { data: gradesQueryResult } = useGradesQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        pagination: {
          limit: 99,
          page: 1,
        },
      },
    },
  })
  const { data: subjectsQueryResult } = useSubjectsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        pagination: {
          limit: 99,
          page: 1,
        },
      },
    },
  })

  return (
    <Modal
      open={open}
      title="Create a new course"
      okText="Create"
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
          name="thumbnail"
          label="Thumbnail"
          getValueFromEvent={getFile}
          className="text-center"
        >
          <UploadInput form={form} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input name of the course' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input description of the course' }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Form.Item
          messageVariables={{ name: 'Grade' }}
          label="Grade"
          name="gradeId"
          className="inline-block w-1/2 pr-2"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select className="py-1" placeholder="Select grade...">
            {gradesQueryResult?.grades?.items?.map((item, index) => (
              <Select.Option value={item.id} key={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          messageVariables={{ name: 'Subject' }}
          label="Subject"
          name="subjectId"
          className="inline-block w-1/2 pl-2 float-right"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select className="py-1" placeholder="Select subject...">
            {subjectsQueryResult?.subjects?.items?.map((item, index) => (
              <Select.Option value={item.id} key={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="objectives"
          label="Objectives"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.List
            name="objectives"
            initialValue={['']}
            rules={[
              {
                validator: async (_, objectives) => {
                  if (!objectives || objectives.length < 1) {
                    return Promise.reject(new Error('At least 1 objective'))
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={index}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: false,
                          message: 'Please input objective or delete this field.',
                        },
                      ]}
                      noStyle
                    >
                      <Input.TextArea placeholder="Objective" style={{ width: '95%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="pl-3 align-text-top"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '95%' }}
                    icon={<PlusOutlined className="align-text-bottom" />}
                  >
                    Add objective
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateCourseForm
