import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Home.css'; // Certifique-se de que o caminho está correto

function Home() {
  return (
    <div id="pagina-inicial" className="container-pagina">
      <h1 className="titulo-pagina">
        Seu próximo carro está aqui. Bem-vindo à sua melhor experiência de compra online.
      </h1>
      <p className="descricao-pagina">
        Encontre veículos selecionados, qualidade garantida e atendimento diferenciado.
      </p>

      <section className="descricao-pagina">
        <h2 className="titulo-secao">Quem já comprou, recomenda</h2>
        <div className="container-depoimentos">
          <div className="card-depoimento">
            <p className="texto-depoimento">
              "Do primeiro contato até a entrega, fui muito bem atendido. Aqui encontrei transparência e confiança."
            </p>
            <p className="autor-depoimento">- Carlos Menezes</p>
          </div>
          <div className="card-depoimento">
            <p className="texto-depoimento">
              "A variedade de carros e as condições de pagamento me surpreenderam. Com certeza recomendo."
            </p>
            <p className="autor-depoimento">- Fernanda Lopes</p>
          </div>
          <div className="card-depoimento">
            <p className="texto-depoimento">
              "Atendimento profissional, veículos impecáveis e toda assistência que precisei no pós-venda. Nota 10!"
            </p>
            <p className="autor-depoimento">- Roberto Faria</p>
          </div>
        </div>
      </section>

      <section className="descricao-pagina">
        <h2 className="titulo-secao">Por que milhares de clientes escolhem nossa loja?</h2>
        <ul className="lista-beneficios">
          <li className="item-beneficio">
            <i className="icone-beneficio fas fa-check-circle"></i>
            <p>Veículos inspecionados, revisados e com garantia total</p>
          </li>
          <li className="item-beneficio">
            <i className="icone-beneficio fas fa-medal"></i>
            <p>Melhores preços e condições do mercado</p>
          </li>
          <li className="item-beneficio">
            <i className="icone-beneficio fas fa-hands-helping"></i>
            <p>Atendimento personalizado do começo ao fim</p>
          </li>
          <li className="item-beneficio">
            <i className="icone-beneficio fas fa-car-side"></i>
            <p>Ampla variedade de modelos, marcas e estilos</p>
          </li>
        </ul>
      </section>

      <section className="descricao-pagina">
        <h2 className="titulo-secao">Seu próximo carro está a um clique de distância!</h2>
        <p className="texto-contato">
          Fale conosco agora ou faça uma visita. Aqui seu carro novo te espera!
        </p>
        <Link to="/sobre-nos" className="botao-secundario">Converse com um Especialista</Link>
      </section>
    </div>
  );
}

export default Home;
