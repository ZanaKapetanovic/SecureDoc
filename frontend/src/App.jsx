import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UploadPage from './pages/UploadPage'
import MyDocumentsPage from './pages/MyDocumentsPage'
 
export default function App() {
  return (
<Router>
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/upload" element={<UploadPage />} />
<Route path="/documents" element={<MyDocumentsPage />} />
</Routes>
</Router>
  )
}