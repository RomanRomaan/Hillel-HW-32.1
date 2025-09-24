import { Routes, Route } from 'react-router-dom';
import LayoutShell from './components/LayoutShell';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Swapi from './pages/Swapi';

export default function App() {
  return (
    <LayoutShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/swapi" element={<Swapi />} />
      </Routes>
    </LayoutShell>
  );
}
