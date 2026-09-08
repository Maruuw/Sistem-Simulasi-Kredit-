import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Simulasi from './pages/Simulasi/Simulasi';
import JatuhTempo from './pages/JatuhTempo/JatuhTempo';
import Denda from './pages/Denda/Denda';
import Kontrak from './pages/Kontrak/Kontrak';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="simulasi" element={<Simulasi />} />
        <Route path="angsuran" element={<JatuhTempo />} />
        <Route path="denda" element={<Denda />} />
        <Route path="kontrak" element={<Kontrak />} />
      </Route>
    </Routes>
  );
}

export default App;
