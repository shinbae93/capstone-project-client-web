import 'antd/dist/reset.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'
import Courses from './pages/Courses'
import CoursesDetail from './pages/CoursesDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './shared/routers/PrivateRoute'
import NotFoundPage from './pages/404'
import ProfileLayout from './layouts/ProfileLayout'
import MyLearning from './pages/MyLearning'
import MyCourses from './pages/MyCourses'
import AuthLayout from './layouts/AuthLayout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CoursesDetail />} />
            <Route path="profile" element={<ProfileLayout />}>
              <Route path="my-learning" element={<MyLearning />} />
              <Route path="my-courses" element={<MyCourses />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
