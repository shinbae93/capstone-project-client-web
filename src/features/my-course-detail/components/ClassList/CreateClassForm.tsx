import { MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  TimePicker,
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ClassMethod, useCreateClassMutation } from '../../../../graphql/generated/graphql'
import { getDateInput } from '../../../../utils/form'

dayjs.extend(customParseFormat)

interface CreateClassFormProps {
  courseId: string
  open: boolean
  onCreate: () => void
  onCancel: () => void
}

const format = 'HH:mm'

const CreateClassForm: React.FC<CreateClassFormProps> = ({
  courseId,
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  const [createClass] = useCreateClassMutation()

  return (
    <Modal
      open={open}
      title="Create class"
      okText="Create"
      cancelText="Cancel"
      destroyOnClose={true}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          values.schedule?.forEach((element: any) => {
            element.startTime = element.time[0].format(format)
            element.endTime = element.time[1].format(format)
            delete element.time
          })
          createClass({
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
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        name="create_course_form"
        className="p-4"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input name of the class' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input address of the class' }]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          messageVariables={{ name: 'Method' }}
          label="Method"
          name="method"
          className="inline-block w-1/2 pr-2"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select method...">
            {Object.entries(ClassMethod).map((item, index) => (
              <Select.Option value={item[1]} key={index}>
                {item[0]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          messageVariables={{ name: 'Total slots' }}
          name="totalSlots"
          label="Total slots"
          rules={[{ required: true, type: 'number' }]}
          className="inline-block w-1/2 pl-2"
        >
          <InputNumber min={1} addonBefore={<UserOutlined />} className="w-full" />
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
          className="w-1/2 pr-2"
          initialValue={0}
        >
          <InputNumber
            addonAfter="VND / month"
            className="w-full"
            formatter={(value) =>
              `${value}`.replace(/\./, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(x) => parseFloat(`${x}`.replace(/,/g, ''))}
          />
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
          name="schedule"
          label="Schedule"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Form.List
            name="schedule"
            rules={[
              {
                validator: async (_, schedule) => {
                  if (!schedule || schedule.length < 1) {
                    return Promise.reject(new Error('At least 1 objective'))
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'dayOfWeek']}
                      rules={[{ required: true, message: 'Missing day of week' }]}
                    >
                      <Select
                        placeholder="Day of week"
                        options={[
                          { value: 0, label: 'Sunday' },
                          { value: 1, label: 'Monday' },
                          { value: 2, label: 'Tuesday' },
                          { value: 3, label: 'Wednesday' },
                          { value: 4, label: 'Thursday' },
                          { value: 5, label: 'Friday' },
                          { value: 6, label: 'Saturday' },
                        ]}
                        className="w-32"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'time']}
                      rules={[{ required: true, message: 'Missing time' }]}
                    >
                      <TimePicker.RangePicker format={format} minuteStep={5} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="pl-3 align-text-top"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    onClick={() => add()}
                    icon={<PlusOutlined className="align-text-bottom" />}
                  >
                    Add schedule
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

export default CreateClassForm
