# Loja de carros — front-end em React e API em PHP

Site de uma loja de carros com cadastro de veículos, consulta de preço pela tabela FIPE e simulador de financiamento. O front-end é em React e conversa com uma API em PHP orientado a objetos.

Avaliação B2 de duas disciplinas do mesmo semestre (ADS, UniSALESIANO Araçatuba), entregue em junho de 2025: **Laboratório de Programação III** avaliou o front-end em React e **Desenvolvimento Web II** avaliou o back-end em PHP O.O.

## Funcionalidades

- CRUD de carros (modelo, ano, cor, combustível e placa)
- Avaliação de carro com marcas, modelos e valores da API pública da tabela FIPE
- Simulador de financiamento
- Páginas Home e Sobre, com barra de navegação e rodapé

## Stack

**Front-end**

- React 19 (Create React App)
- React Router 7
- CSS por componente
- `fetch` para a API

**Back-end**

- PHP orientado a objetos, com a classe `API_Carros`
- PDO com MySQL
- Respostas em JSON

## Como rodar

**Back-end**

1. Crie um banco MySQL chamado `unisale` e execute `back-end/Db/criarTabelaCarros.sql`.
2. Copie a pasta `back-end` para a raiz do servidor (por exemplo `htdocs/back-end` no XAMPP). O front-end chama `http://localhost/back-end/`.
3. Se precisar, ajuste usuário e senha em `back-end/Db/config.php` (padrão `root`, sem senha).

**Front-end**

```bash
cd front-end
npm install
npm start
```

O site abre em `http://localhost:3000`.

## Rotas do front-end

| Rota | Tela |
| --- | --- |
| `/` | Home |
| `/carro` | CRUD de carros |
| `/avaliacao-carro/1` | Avaliação pela tabela FIPE |
| `/simulador-financiamento` | Simulador de financiamento |
| `/sobre` | Sobre |

## Estrutura

```
front-end/src/components/pages/    Home, AvaliacaoCarro, SimuladorFinanciamento, Sobre
front-end/src/components/crud/     CarroCrud
front-end/src/components/layout/   NavBar e Rodape
back-end/index.php                 entrada da API
back-end/Carros/API_Carros.php     classe com as operações do CRUD
back-end/Db/                       conexão e script da tabela
```

## Autor

Fabio Luiz Florêncio da Silva · [github.com/Fabioluiiz22010](https://github.com/Fabioluiiz22010) · [LinkedIn](https://www.linkedin.com/in/fabio-l-florencio/)
