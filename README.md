# Challenge-api-tool

## Objetivo
Construir uma API e banco de dados. A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

[Desafio](https://bossabox.notion.site/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6). 

## Tecnologias

- [x] Express
- [x] PostgresSQL
- [x] Docker
- [x] vitest
- [x] Swagger

### Modelagem de dados
- Foi criado a camada de repositório para lidar com as queries(consultas) no banco de dados.

### Arquitetura de software

- Foram aplicado conceitos de SOLID. Como Single Responsibility Principle, Dependency Inversion Principle, Open-Closed Principle

## Porta

``3000``

## Documentação da API
A documentação da API está disponível em Swagger e pode ser acessada no endpoint ``/api-docs``.

## REST API

- ``POST /tools``: Cadastra uma nova ferramenta.
- ``GET /tools``: Retorna todas as ferramentas cadastradas.
- ``GET /tools/:tag``: Filtra ferramentas utilizando uma busca por tag. 
- ``DELETE /tools/:id``: Remove uma ferramenta por ID.

## Como rodar o projeto

1. Clone
```bash
git clone git@github.com:Clintonrocha98/challenge-api-tool.git
```
2. Instale as dependências
```bash
npm run install
## ou
yarn
```
3. Renomear ``.env.example`` para ``.env``
4. Configure um banco PostgresSQL
5. Comando:
```bash
npm run dev
## ou
yarn dev
```

## Docker

1. Clone:
```bash
git clone git@github.com:Clintonrocha98/challenge-api-tool.git
```
2. Configure um banco PostgresSQL 
4. Renomear ``.env.example`` para ``.env``
5. Comando:
```bash
docker compose up -d
```

## Testes 

Testes unitarios:
```bash
npm run test
## ou
yarn test
```