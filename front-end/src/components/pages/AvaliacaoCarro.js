import React, { useState, useEffect } from 'react';
import '../estilos/AvaliacaoCarro.css'; // Certifique-se de que o caminho está correto
export default function AvaliacaoCarro() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);

  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!marcaSelecionada) return;
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos`)
      .then(res => res.json())
      .then(data => setModelos(data.modelos))
      .catch(console.error);

    setModelos([]);
    setAnos([]);
    setModeloSelecionado('');
    setAnoSelecionado('');
  }, [marcaSelecionada]);

  useEffect(() => {
    if (!marcaSelecionada || !modeloSelecionado) return;
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`)
      .then(res => res.json())
      .then(data => setAnos(data))
      .catch(console.error);

    setAnos([]);
    setAnoSelecionado('');
  }, [modeloSelecionado]);

  const buscarValor = async () => {
    if (!marcaSelecionada || !modeloSelecionado || !anoSelecionado) {
      return alert('Selecione todos os campos!');
    }

    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`);
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      alert('Erro ao buscar dados');
      console.error(error);
    }
  };

  return (
    <div id="pagina-avaliacao-carro" className="container-pagina">
      <h1 className="titulo-pagina">Avaliação do seu Carro</h1>
      <p>Aqui pegamos o seu usado como parte do pagamento, facilitando as opções de pagamento!</p>
      <p>Selecione as informações do seu carro para consultar o valor de mercado na tabela FIPE.</p>

      <div className="grupo-formulario">
        <label htmlFor="seletor-marca-fipe">Marca:</label>
        <select id="seletor-marca-fipe" value={marcaSelecionada} onChange={e => setMarcaSelecionada(e.target.value)}>
          <option value="">Selecione uma marca</option>
          {marcas.map(m => (
            <option key={m.codigo} value={m.codigo}>{m.nome}</option>
          ))}
        </select>
      </div>

      <div className="grupo-formulario">
        <label htmlFor="seletor-modelo-fipe">Modelo:</label>
        <select id="seletor-modelo-fipe" value={modeloSelecionado} onChange={e => setModeloSelecionado(e.target.value)} disabled={!modelos.length}>
          <option value="">Selecione um modelo</option>
          {modelos.map(m => (
            <option key={m.codigo} value={m.codigo}>{m.nome}</option>
          ))}
        </select>
      </div>

      <div className="grupo-formulario">
        <label htmlFor="seletor-ano-fipe">Ano/Versão:</label>
        <select id="seletor-ano-fipe" value={anoSelecionado} onChange={e => setAnoSelecionado(e.target.value)} disabled={!anos.length}>
          <option value="">Selecione o ano/versão</option>
          {anos.map(a => (
            <option key={a.codigo} value={a.codigo}>{a.nome}</option>
          ))}
        </select>
      </div>

      <button className="btn botao-principal" onClick={buscarValor}>Buscar valor</button>

      {resultado && (
        <div className="caixa-resultado">
          <h2 className="titulo-resultado">Resultado da Avaliação:</h2>
          <p><strong>Marca:</strong> {resultado.Marca}</p>
          <p><strong>Modelo:</strong> {resultado.Modelo}</p>
          <p><strong>Ano/Versão:</strong> {resultado.AnoModelo}</p>
          <p><strong>Valor FIPE:</strong> <span className="valor-fipe">{resultado.Valor}</span></p>
          <p><strong>Combustível:</strong> {resultado.Combustivel}</p>
        </div>
      )}
    </div>
  );
}
