import { Link } from 'react-router-dom';
import estilo from './NavBar.css';
import logo from './Coringa&Clenis.png';

function NavBar() {
  return (
    <header className="barra-navegacao-container"> 
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo-imagem" />
        </Link>
      </div>
      <nav className="barra-navegacao-menu">
        <ul className="lista-navegacao">
          <li className="item-navegacao"><Link to="/" className="link-navegacao">Home</Link></li>
          <li className="item-navegacao"><Link to="/carro" className="link-navegacao">Carros</Link></li>
          <li className="item-navegacao"><Link to="/sobre" className="link-navegacao">Sobre Nós</Link></li>
          <li className="item-navegacao"><Link to="/avaliacao-carro/1" className="link-navegacao">Avaliação Carro Usado</Link></li>
          <li className="item-navegacao"><Link to="/simulador-financiamento" className="link-navegacao">Simulador Financiamento</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
