import { CalendarOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import * as dayjs from 'dayjs'
import {
  Course,
  useGradesQuery,
  useSubjectsQuery,
  useUpdateCourseMutation,
} from '../../../graphql/generated/graphql'
import UploadInput from '../../../shared/components/UploadInput'
import { DeepPartial } from '../../../utils/type'
import { useEffect } from 'react'

interface CreateCourseFormProps {
  course: DeepPartial<Course> | undefined
  onUpdate: () => void
  onCancel: () => void
}

const getDateInput = (e: dayjs.Dayjs) => e.toDate()

const getFile = (e: UploadChangeParam<UploadFile>) => e && e.fileList && e.fileList[0].url

const UpdateCourseForm: React.FC<CreateCourseFormProps> = ({ course, onUpdate, onCancel }) => {
  const [form] = Form.useForm()

  const { data: gradesQueryResult } = useGradesQuery()
  const { data: subjectsQueryResult } = useSubjectsQuery()
  const [updateCourse] = useUpdateCourseMutation()

  useEffect(() => {
    setTimeout(() => {
      form.resetFields()
    })
  }, [course, form])

  return (
    <Modal
      open={!!course}
      title="Update course"
      okText="Update"
      cancelText="Cancel"
      destroyOnClose={true}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields()
          updateCourse({
            variables: {
              input: { id: String(course?.id), ...values },
            },
            onCompleted: () => onUpdate(),
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
          name="thumbnail"
          label="Thumbnail"
          initialValue={course?.thumbnail}
          getValueFromEvent={getFile}
          className="text-center"
        >
          <UploadInput form={form} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          initialValue={course?.name}
          rules={[{ required: true, message: 'Please input name of the course' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={course?.description}
          rules={[{ required: true, message: 'Please input description of the course' }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          messageVariables={{ name: 'Grade' }}
          label="Grade"
          name="gradeId"
          initialValue={course?.gradeId}
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
          initialValue={course?.subjectId}
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
          initialValue={course?.fee}
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
          initialValue={course?.paymentDate}
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
          initialValue={dayjs(course?.startDate).toDate()}
          required
        >
          <DatePicker
            picker="date"
            className="w-full"
            disabledDate={(date) => date && date.isBefore(dayjs().subtract(1, 'day'))}
            defaultValue={dayjs(course?.startDate)}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          valuePropName={'date'}
          className="inline-block w-1/2 pl-2"
          getValueFromEvent={getDateInput}
          initialValue={dayjs(course?.endDate).toDate()}
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
            defaultValue={dayjs(course?.endDate)}
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
            initialValue={course?.objectives || ['']}
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

export default UpdateCourseForm
