import React, { useState, useEffect } from 'react';
import '../estilos/SimulacaoFinanciamento.css';

export default function SimulacaoFinanciamento() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);

  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const [valorCarro, setValorCarro] = useState(null);
  const [entrada, setEntrada] = useState('');
  const [prazo, setPrazo] = useState('12');
  const [parcelas, setParcelas] = useState(null);

  useEffect(() => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(res => res.json())
      .then(setMarcas)
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
    setValorCarro(null);
  }, [marcaSelecionada]);

  useEffect(() => {
    if (!marcaSelecionada || !modeloSelecionado) return;
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`)
      .then(res => res.json())
      .then(setAnos)
      .catch(console.error);

    setAnos([]);
    setAnoSelecionado('');
    setValorCarro(null);
  }, [modeloSelecionado]);

  const buscarValorFipe = async () => {
    if (!marcaSelecionada || !modeloSelecionado || !anoSelecionado) {
      return alert('Preencha todos os campos do carro.');
    }

    try {
      const res = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`
      );
      const data = await res.json();
      const valorNumerico = Number(data.Valor.replace('R$', '').replace('.', '').replace(',', '.'));
      setValorCarro(valorNumerico);
      setParcelas(null);
    } catch (error) {
      console.error('Erro ao buscar valor FIPE:', error);
      alert('Erro ao buscar valor FIPE.');
    }
  };

  const simularFinanciamento = () => {
    if (!valorCarro || !entrada || isNaN(entrada) || Number(entrada) >= valorCarro) {
      return alert('Informe uma entrada válida menor que o valor do carro.');
    }

    const valorFinanciado = valorCarro - Number(entrada);
    const taxaJuros = 0.015; // 1.5% ao mês
    const n = Number(prazo);

    const parcela = (valorFinanciado * taxaJuros) / (1 - Math.pow(1 + taxaJuros, -n));
    setParcelas(parcela.toFixed(2));
  };

  return (
    <div className="container-pagina4">
      <h1 className="titulo-pagina">Simulação de Financiamento</h1>
      <p>Escolha seu carro e simule como ficará o financiamento com base na tabela FIPE.</p>

      {/* Seletor de Marca */}
      <div className="grupo-formulario">
        <label>Marca:</label>
        <select value={marcaSelecionada} onChange={e => setMarcaSelecionada(e.target.value)}>
          <option value="">Selecione a marca</option>
          {marcas.map(m => (
            <option key={m.codigo} value={m.codigo}>{m.nome}</option>
          ))}
        </select>
      </div>

      {/* Seletor de Modelo */}
      <div className="grupo-formulario">
        <label>Modelo:</label>
        <select value={modeloSelecionado} onChange={e => setModeloSelecionado(e.target.value)} disabled={!modelos.length}>
          <option value="">Selecione o modelo</option>
          {modelos.map(m => (
            <option key={m.codigo} value={m.codigo}>{m.nome}</option>
          ))}
        </select>
      </div>

      {/* Seletor de Ano */}
      <div className="grupo-formulario">
        <label>Ano/Versão:</label>
        <select value={anoSelecionado} onChange={e => setAnoSelecionado(e.target.value)} disabled={!anos.length}>
          <option value="">Selecione o ano/versão</option>
          {anos.map(a => (
            <option key={a.codigo} value={a.codigo}>{a.nome}</option>
          ))}
        </select>
      </div>

      <button className="btn botao-principal" onClick={buscarValorFipe}>Buscar valor FIPE</button>

      {valorCarro && (
        <div className="box-simulacao">
          <p><strong>Valor FIPE:</strong> R$ {valorCarro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>

          <div className="grupo-formulario">
            <label>Entrada (R$):</label>
            <input type="text" value={entrada} onChange={e => setEntrada(e.target.value)} />
          </div>

          <div className="grupo-formulario">
            <label>Prazo (meses):</label>
            <select value={prazo} onChange={e => setPrazo(e.target.value)}>
              {[12, 24, 36, 48, 60].map(m => (
                <option key={m} value={m}>{m} meses</option>
              ))}
            </select>
          </div>

          <button className="btn botao-secundario" onClick={simularFinanciamento}>Simular Parcelas</button>

          {parcelas && (
            <div className="resultado-parcela">
              <h3>Resultado:</h3>
              <p>Parcelas mensais de <strong>R$ {parcelas.replace('.', ',')}</strong> em {prazo} meses.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
