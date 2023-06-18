import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, UploadFile } from 'antd'
import {
  CreateCourseInput,
  useGradesQuery,
  useSubjectsQuery,
} from '../../../graphql/generated/graphql'
import UploadInput from '../../../shared/components/UploadInput'
import { CalendarOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import * as dayjs from 'dayjs'
import { UploadChangeParam } from 'antd/es/upload'
import { getDateInput } from '../../../utils/form'

interface CreateCourseFormProps {
  open: boolean
  onCreate: (input: CreateCourseInput) => void
  onCancel: () => void
}

const getFile = (e: UploadChangeParam<UploadFile>) => e && e.fileList && e.fileList[0].url

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  const { data: gradesQueryResult } = useGradesQuery()
  const { data: subjectsQueryResult } = useSubjectsQuery()

  return (
    <Modal
      open={open}
      title="Create a new course"
      okText="Create"
      cancelText="Cancel"
      destroyOnClose
      confirmLoading={true}
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
            {gradesQueryResult?.grades?.map((item, index) => (
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
            {subjectsQueryResult?.subjects?.map((item, index) => (
              <Select.Option value={item.id} key={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          messageVariables={{ name: 'Fee' }}
          name="fee"
          label="Fee"
          rules={[
            {
              required: true,
              type: 'number',
              validator: async (_, fee) => {
                if (!fee) {
                  return Promise.reject(new Error('Invalid fee'))
                }
              },
            },
          ]}
          className="inline-block w-1/2 pr-2"
          initialValue={0}
        >
          <InputNumber
            addonBefore="VND"
            className="w-full"
            formatter={(value) =>
              `${value}`.replace(/\./, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(x) => parseFloat(`${x}`.replace(/,/g, ''))}
          />
        </Form.Item>
        <Form.Item
          messageVariables={{ name: 'Payment Date' }}
          name="paymentDate"
          label="Payment Date"
          rules={[{ required: true, type: 'number' }]}
          className="inline-block w-1/2 pl-2"
        >
          <InputNumber min={1} addonBefore={<CalendarOutlined />} className="w-full" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          valuePropName={'date'}
          className="inline-block w-1/2 pr-2"
          getValueFromEvent={getDateInput}
          required
        >
          <DatePicker
            picker="date"
            className="w-full"
            disabledDate={(date) => date && date.isBefore(dayjs().subtract(1, 'day'))}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          valuePropName={'date'}
          className="inline-block w-1/2 pl-2"
          getValueFromEvent={getDateInput}
          required
        >
          <DatePicker
            picker="date"
            className="w-full"
            disabledDate={(date) =>
              date &&
              date.isBefore(
                dayjs(form.getFieldValue('startDate')).add(1, 'day') || dayjs().subtract(1, 'day')
              )
            }
          />
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
                      <Input.TextArea placeholder="Objective" style={{ width: '90%' }} />
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
                    style={{ width: '90%' }}
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
