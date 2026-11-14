
import { BrowserRouter as Navegator, Route, Routes } from 'react-router-dom';

import NavBar  from './components/layout/NavBar.js'
import Home    from './components/pages/Home.js'
import Sobre from './components/pages/Sobre.js'
import CarroCrud      from './components/crud/CarroCrud.js'
import AvaliacaoCarro from './components/pages/AvaliacaoCarro.js';
import SimuladorFinanciamento from './components/pages/SimuladorFinanciamento.js';


function App() {
  return (
    <div>
      <Navegator>
        <NavBar />
        <Routes>
             <Route exact path="/"                element={<Home />} />
             <Route       path="/carro"         element={<CarroCrud />} />
             <Route       path="/sobre"         element={<Sobre />} />
             <Route       path="/avaliacao-carro/1"         element={<AvaliacaoCarro />} />
              <Route       path="/simulador-financiamento" element={<SimuladorFinanciamento />} />
        </Routes>
      </Navegator>
    </div>
  );
}


export default App;
