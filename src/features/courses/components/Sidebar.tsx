import { Button, Checkbox, Col, Divider, Row } from 'antd'
import { Grade, Subject } from '../../../graphql/generated/graphql'
import { FC } from 'react'

interface CourseSidebarProps {
  grades: Grade[] | undefined
  subjects: Subject[] | undefined
}

const CourseSidebar: FC<CourseSidebarProps> = ({ grades, subjects }) => {
  return (
    <div className="flex-1">
      <div className="sidebar px-5 py-2">
        <div className="category-title">
          {/** Subject */}
          <div className="pt-4">
            <p>Subject</p>
            <Divider className="my-4" />
            <div></div>
            <Checkbox.Group className="w-full">
              <Col>
                {subjects?.map((subject) => (
                  <Row className="py-1" key={subject.id}>
                    <Checkbox value={subject.id}>
                      <p>{subject.name}</p>
                    </Checkbox>
                  </Row>
                ))}
              </Col>
            </Checkbox.Group>
          </div>
          {/** Grade */}
          <div className="pt-5">
            <p>Grade</p>
            <Divider className="my-4" />
            <Checkbox.Group className="w-full">
              <Col>
                {grades?.map((grade) => (
                  <Row className="py-1" key={grade.id}>
                    <Checkbox value={grade.id}>
                      <p>{grade.name}</p>
                    </Checkbox>
                  </Row>
                ))}
              </Col>
            </Checkbox.Group>
          </div>
          {/** Filter button */}
          <div className="text-center py-5">
            <Button className="bg-primary h-9 font-semibold hover:border-primary hover:text-white">
              Filter Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseSidebar
