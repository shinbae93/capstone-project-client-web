import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary"></div>
      <div className="flex flex-col self-center px-40 gap-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
