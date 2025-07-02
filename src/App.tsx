import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';


function App() {
  return (
     <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:id" element={<CityPage />} />

     </Routes>
)
}

export default App
