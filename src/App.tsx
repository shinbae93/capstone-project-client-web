import 'antd/dist/reset.css'
import './App.css'
import Header from './layouts/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Footer from './layouts/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
