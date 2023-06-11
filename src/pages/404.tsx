import { Button, Result, Typography } from 'antd'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Result
      extra={
        <Link to="/">
          <Button type="primary" className="bg-primary text-white">
            Home
          </Button>
        </Link>
      }
      status="404"
      subTitle={`Sorry, we can't find the page you are looking for.`}
      title={<Typography.Title level={1}>404</Typography.Title>}
    />
  )
}

export default NotFoundPage
