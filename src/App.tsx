import 'antd/dist/reset.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import ProfileLayout from './layouts/ProfileLayout'
import NotFoundPage from './pages/404'
import BecomeTeacher from './pages/BecomeTeacher'
import ChangePassword from './pages/ChangePassword'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import GeneralProfile from './pages/GeneralProfile'
import Home from './pages/Home'
import Login from './pages/Login'
import MyCalendar from './pages/MyCalendar'
import MyCourseDetail from './pages/MyCourseDetail'
import MyCourses from './pages/MyCourses'
import MyLearning from './pages/MyLearning'
import MyLearningDetail from './pages/MyLearningDetail'
import Register from './pages/Register'
import PrivateRoute from './shared/routers/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="become-teacher" element={<BecomeTeacher />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="courses/:id/learning" element={<MyLearningDetail />} />
          <Route path="courses/:id/manage" element={<MyCourseDetail />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="my-calendar" element={<MyCalendar />} />
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="general" element={<GeneralProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
