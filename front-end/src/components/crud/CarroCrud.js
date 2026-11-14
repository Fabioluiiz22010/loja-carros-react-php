import React, { useState, useEffect } from 'react';
import './CarroCrud.css';

function CarroCrud() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    modelo: '',
    ano: '',
    cor: '',
    tipo_combustivel: '',
    placa: '',
    url: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);

  const [marcaCodigoSelecionado, setMarcaCodigoSelecionado] = useState('');
  const [modeloCodigoSelecionado, setModeloCodigoSelecionado] = useState('');
  const [anoCodigoSelecionado, setAnoCodigoSelecionado] = useState('');

  const [nomeMarcaSelecionada, setNomeMarcaSelecionada] = useState('');
  const [nomeModeloSelecionado, setNomeModeloSelecionado] = useState('');
  const [nomeAnoSelecionado, setNomeAnoSelecionado] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(err => console.error("Erro ao buscar marcas:", err));
  }, []);

  useEffect(() => {
    if (!marcaCodigoSelecionado) return;
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigoSelecionado}/modelos`)
      .then(res => res.json())
      .then(data => setModelos(data.modelos))
      .catch(err => console.error("Erro ao buscar modelos:", err));
  }, [marcaCodigoSelecionado]);

  useEffect(() => {
    if (!marcaCodigoSelecionado || !modeloCodigoSelecionado) return;
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigoSelecionado}/modelos/${modeloCodigoSelecionado}/anos`)
      .then(res => res.json())
      .then(data => setAnos(data))
      .catch(err => console.error("Erro ao buscar anos:", err));
  }, [modeloCodigoSelecionado, marcaCodigoSelecionado]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost/back-end/');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarcaChange = (e) => {
    const codigo = e.target.value;
    setMarcaCodigoSelecionado(codigo);
    const marca = marcas.find(m => String(m.codigo) === codigo);
    setNomeMarcaSelecionada(marca ? marca.nome : '');
    setModeloCodigoSelecionado('');
    setAnoCodigoSelecionado('');
    setNomeModeloSelecionado('');
    setNomeAnoSelecionado('');
  };

  const handleModeloChange = (e) => {
    const codigo = e.target.value;
    setModeloCodigoSelecionado(codigo);
    const modelo = modelos.find(m => String(m.codigo) === codigo);
    setNomeModeloSelecionado(modelo ? modelo.nome : '');
    setAnoCodigoSelecionado('');
    setNomeAnoSelecionado('');
  };

  const handleAnoChange = (e) => {
    const codigo = e.target.value;
    setAnoCodigoSelecionado(codigo);
    const ano = anos.find(a => String(a.codigo) === codigo);
    setNomeAnoSelecionado(ano ? ano.nome : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!marcaCodigoSelecionado || !modeloCodigoSelecionado || !anoCodigoSelecionado) {
      setMensagem('Por favor, selecione marca, modelo e ano.');
      return;
    }

    const modeloFinal = `${nomeMarcaSelecionada} ${nomeModeloSelecionado} ${nomeAnoSelecionado}`;

    const payload = {
      id: formData.id,
      modelo: modeloFinal,
      ano: nomeAnoSelecionado,
      cor: formData.cor,
      tipo_combustivel: formData.tipo_combustivel,
      placa: formData.placa,
      url: formData.url
    };

    try {
      let response;
      if (formData.id) {
        response = await fetch(`http://localhost/back-end/?id=${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('http://localhost/back-end/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const result = await response.json();

      if (response.ok) {
        setMensagem(result.message || 'Operação realizada com sucesso!');
        setFormData({
          id: '',
          modelo: '',
          ano: '',
          cor: '',
          tipo_combustivel: '',
          placa: '',
          url: ''
        });
        setMarcaCodigoSelecionado('');
        setModeloCodigoSelecionado('');
        setAnoCodigoSelecionado('');
        fetchCars();
        setShowForm(false);
      } else {
        setMensagem(result.message || 'Erro ao salvar.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMensagem('Erro ao comunicar com o servidor.');
    }
  };

  const handleEditCar = (car) => {
    setFormData({
      id: car.id,
      modelo: car.modelo,
      ano: car.ano,
      cor: car.cor,
      tipo_combustivel: car.tipo_combustivel,
      placa: car.placa,
      url: car.url || ''
    });
    setShowForm(true);
    setMensagem('');
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este carro?')) return;
    try {
      const response = await fetch(`http://localhost/back-end/?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        setMensagem(result.message || 'Carro excluído com sucesso!');
        fetchCars();
      } else {
        setMensagem(result.message || 'Erro ao excluir carro.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setMensagem('Erro ao comunicar com o servidor.');
    }
  };

  return (
    <div className="container-crud">
      <h1>Gerenciamento de Carros</h1>
      <button className="btncadastro" onClick={() => {
        setShowForm(true);
        setFormData({
          id: '',
          modelo: '',
          ano: '',
          cor: '',
          tipo_combustivel: '',
          placa: '',
          url: ''
        });
        setMarcaCodigoSelecionado('');
        setModeloCodigoSelecionado('');
        setAnoCodigoSelecionado('');
        setMensagem('');
      }}>Cadastrar Carro</button>

      {mensagem && <p>{mensagem}</p>}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Marca:</label>
            <select value={marcaCodigoSelecionado} onChange={handleMarcaChange} required>
              <option value="">Selecione</option>
              {marcas.map(m => <option key={m.codigo} value={m.codigo}>{m.nome}</option>)}
            </select>
          </div>

          <div>
            <label>Modelo:</label>
            <select value={modeloCodigoSelecionado} onChange={handleModeloChange} required disabled={!modelos.length}>
              <option value="">Selecione</option>
              {modelos.map(m => <option key={m.codigo} value={m.codigo}>{m.nome}</option>)}
            </select>
          </div>

          <div>
            <label>Ano:</label>
            <select value={anoCodigoSelecionado} onChange={handleAnoChange} required disabled={!anos.length}>
              <option value="">Selecione</option>
              {anos.map(a => <option key={a.codigo} value={a.codigo}>{a.nome}</option>)}
            </select>
          </div>

          <div>
            <label>Cor:</label>
            <input type="text" name="cor" value={formData.cor} onChange={handleInputChange} required />
          </div>

          <div>
            <label>Combustível:</label>
            <select name="tipo_combustivel" value={formData.tipo_combustivel} onChange={handleInputChange} required>
              <option value="">Selecione o tipo de combustível</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Etanol">Etanol</option>
              <option value="Diesel">Diesel</option>
              <option value="GNV">GNV</option>
              <option value="Elétrico">Elétrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          <div>
            <label>Placa:</label>
            <input type="text" name="placa" value={formData.placa} onChange={handleInputChange} required />
          </div>

          <div>
            <label>URL da Imagem:</label>
            <input type="url" name="url" value={formData.url} onChange={handleInputChange} />
          </div>

          <button type="submit">{formData.id ? 'Atualizar' : 'Cadastrar'}</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
        </form>
      )}

      <h2>Carros Cadastrados</h2>
      <ul className="card">
  {cars.map(car => (
    <li key={car.id}>
      {car.url && (
        <img
          src={car.url}
          alt={car.modelo}
          style={{
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
        />
      )}
      <p><strong>Modelo:</strong> {car.modelo}</p>
      <p><strong>Ano:</strong> {car.ano}</p>
      <p><strong>Cor:</strong> {car.cor}</p>
      <p><strong>Combustível:</strong> {car.tipo_combustivel}</p>
      <p><strong>Placa:</strong> {car.placa}</p>
      <button className="edit-button" onClick={() => handleEditCar(car)}>Editar</button>
      <button className="delete-button" onClick={() => handleDeleteCar(car.id)}>Excluir</button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default CarroCrud;
