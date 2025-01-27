import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/signIn';
import AgeConfirm from './pages/ageConfirm/AgeConfirm';
import Menu from './pages/Menu/Menu';
import SelectedRocket from './pages/Menu/SelectedRocket';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cadastro" element={<SignIn />} />
    <Route path="/confirmarIdade" element={<AgeConfirm />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/selectedRocket" element={<SelectedRocket />} />
  </Routes>
);

export default App;
