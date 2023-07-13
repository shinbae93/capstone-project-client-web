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
import { Class, ClassMethod, useUpdateClassMutation } from '../../../../graphql/generated/graphql'
import { DeepPartial } from '../../../../utils/type'
import { getDateInput } from '../../../../utils/form'

dayjs.extend(customParseFormat)

interface UpdateClassFormProps {
  data: DeepPartial<Class> | undefined
  onUpdate: () => void
  onCancel: () => void
}

const format = 'HH:mm'

const UpdateClassForm: React.FC<UpdateClassFormProps> = ({ data, onUpdate, onCancel }) => {
  const [form] = Form.useForm()
  const [updateClass] = useUpdateClassMutation()

  return (
    <Modal
      open={!!data}
      title="Update class"
      okText="Update"
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
          updateClass({
            variables: {
              input: { id: String(data?.id), ...values },
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
        name="create_course_form"
        className="p-4"
        initialValues={{
          schedule: data?.schedule?.map((item) => ({
            dayOfWeek: item?.dayOfWeek,
            time: [dayjs(item?.startTime, format), dayjs(item?.endTime, format)],
          })),
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          initialValue={data?.name}
          rules={[{ required: true, message: 'Please input name of the class' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          messageVariables={{ name: 'Method' }}
          label="Method"
          name="method"
          initialValue={data?.method}
          className="inline-block w-1/2 pr-2"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select grade...">
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
          initialValue={data?.totalSlots}
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
          initialValue={data?.fee}
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
          initialValue={dayjs(data?.startDate).toDate()}
          required
        >
          <DatePicker
            picker="date"
            className="w-full"
            disabledDate={(date) => date && date.isBefore(dayjs().subtract(1, 'day'))}
            defaultValue={dayjs(data?.startDate)}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          valuePropName={'date'}
          className="inline-block w-1/2 pl-2"
          getValueFromEvent={getDateInput}
          initialValue={dayjs(data?.endDate).toDate()}
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
            defaultValue={dayjs(data?.endDate)}
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

export default UpdateClassForm
