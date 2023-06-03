import 'antd/dist/reset.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Courses from './pages/Courses'
import CoursesDetail from './pages/CoursesDetail'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/detail" element={<CoursesDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
