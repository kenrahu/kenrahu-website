import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import PRDGenerator from './pages/PRDGenerator'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tools/prd-generator" element={<PRDGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}
