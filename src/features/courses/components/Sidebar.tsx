import { Button, Checkbox, Col, Divider, Row } from 'antd'

const CourseSidebar = () => {
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
                <Row className="py-1">
                  <Checkbox value="A">
                    <p>Arts & Crafts</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="B">
                    <p>Photography</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="C">
                    <p>Web development</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="D">
                    <p>Sales</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Marketing</p>
                  </Checkbox>
                </Row>
              </Col>
            </Checkbox.Group>
          </div>
          {/** Level */}
          <div className="pt-5">
            <p>Level</p>
            <Divider className="my-4" />
            <div></div>
            <Checkbox.Group className="w-full">
              <Col>
                <Row className="py-1">
                  <Checkbox value="A">
                    <p>Kindergarten</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="B">
                    <p>Grade 1</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="C">
                    <p>Grade 2</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="D">
                    <p>Grade 3</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 4</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 5</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 6</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 7</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 8</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 9</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 10</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 11</p>
                  </Checkbox>
                </Row>
                <Row className="py-1">
                  <Checkbox value="E">
                    <p>Grade 12</p>
                  </Checkbox>
                </Row>
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
