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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CoursesDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
