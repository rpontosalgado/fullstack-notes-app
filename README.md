# Desafio Full Stack — Tela de Notas

Olá, equipe! Me chamo **Roberto de Abreu Salgado** e este repositório contém minha solução para o desafio Full Stack. Foi uma experiência muito bacana trabalhar nele — tentei tomar decisões técnicas que refletissem não só o cumprimento dos requisitos, mas também a preocupação com organização, legibilidade e qualidade de código.

Abaixo explico como rodar o projeto, as escolhas que fiz e o que eu teria continuado desenvolvendo com mais tempo.

---

## Estrutura do Repositório

```
.
├── backend/    # API RESTful com NestJS + PostgreSQL
├── frontend/   # Interface web com React + Vite
└── materials/  # Dados iniciais (notes.csv)
```

---

## Backend

### Tecnologias

- **NestJS** — framework Node.js escolhido pela sua estrutura modular e opinada, que favorece organização e escalabilidade
- **TypeORM** — ORM com suporte nativo a TypeScript e integração direta com NestJS
- **PostgreSQL** — banco de dados relacional robusto e amplamente utilizado em produção
- **Swagger (OpenAPI)** — documentação interativa da API gerada automaticamente
- **class-validator / class-transformer** — validação e transformação de dados nas requisições

### Pré-requisitos

- Node.js >= 18
- Yarn 4
- PostgreSQL rodando localmente

### Como rodar

#### A. Com Docker (recomendado)

A forma mais simples de rodar o backend é via Docker Compose, sem precisar configurar o PostgreSQL localmente.

**Pré-requisitos**

- Docker
- Docker Compose

**1. Suba os serviços**

```bash
docker-compose up --build
```

O seed é executado automaticamente ao iniciar o container, populando o banco com os dados do `materials/notes.csv`. A API estará disponível em `http://localhost:3000` e o Swagger em `http://localhost:3000/api/docs`.

**2. Para encerrar**

```bash
docker-compose down
```

Para remover também o volume do banco de dados:

```bash
docker-compose down -v
```

#### B. Localmente

**1. Instalar dependências**

```bash
cd backend
yarn install
```

**2. Configurar variáveis de ambiente**

```bash
cp .env.example .env
```

Ajuste os valores conforme seu ambiente local:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=notes_db
PORT=3000
```

**3. Criar o banco de dados**

```sql
CREATE DATABASE notes_db;
```

**4. Popular o banco com os dados iniciais**

```bash
yarn seed
```

O script lê o arquivo `materials/notes.csv` e insere os registros no banco. Caso o banco já tenha dados, o seed é ignorado automaticamente.

**5. Iniciar o servidor**

```bash
# Desenvolvimento (com hot-reload)
yarn start:dev

# Produção
yarn build && yarn start:prod
```

### Documentação da API

A documentação interativa via Swagger está disponível em:

```
http://localhost:3000/api/docs
```

### Endpoints

| Método | Rota                | Descrição                           |
| ------ | ------------------- | ----------------------------------- |
| `GET`  | `/api/v1/notes`     | Lista notas com filtros e paginação |
| `GET`  | `/api/v1/notes/:id` | Busca uma nota pelo ID              |
| `POST` | `/api/v1/notes`     | Cria uma nova nota                  |

**Filtros disponíveis no `GET /api/v1/notes`:**

| Parâmetro   | Tipo   | Descrição                                         |
| ----------- | ------ | ------------------------------------------------- |
| `site`      | string | Filtra por nome do site (correspondência parcial) |
| `equipment` | string | Filtra por equipamento (correspondência parcial)  |
| `startDate` | string | Início do período (ISO 8601)                      |
| `endDate`   | string | Fim do período (ISO 8601)                         |
| `page`      | number | Número da página (padrão: 1)                      |
| `limit`     | number | Itens por página (padrão: 10)                     |

---

## Frontend

### Tecnologias

- **React 18** com **TypeScript** — combinação sólida para interfaces tipadas e componentes reutilizáveis
- **Vite** — build tool moderna com hot-reload extremamente rápido
- **styled-components v6** — escolhido pela colocação de estilos junto ao componente, tipagem com o tema via `DefaultTheme` e pelo suporte a props dinâmicas de forma elegante
- **Sora** (Google Fonts) — tipografia definida no guia de estilo do desafio

### Pré-requisitos

- Node.js >= 18
- Yarn 4
- Backend rodando em `http://localhost:3000`

### Como rodar

**1. Instalar dependências**

```bash
cd frontend
yarn install
```

**2. Iniciar o servidor de desenvolvimento**

```bash
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`. O Vite está configurado para fazer proxy de todas as requisições `/api` para o backend, eliminando problemas de CORS durante o desenvolvimento.

**3. Build para produção**

```bash
yarn build
```

### Funcionalidades

- Listagem de notas em tabela paginada
- Filtros por site, equipamento e período de data
- Criação de novas notas via formulário em modal
- Estado de carregamento com skeleton animado
- Tema centralizado com design tokens tipados via `ThemeProvider`
- Ícones customizados em SVG seguindo o guia visual do desafio

---

## O que eu implementaria com mais tempo

Alguns pontos que ficaram fora do escopo por restrição de tempo, mas que considero importantes para uma aplicação em produção:

**Backend**

- **CRUD completo** — endpoints de `PUT /api/v1/notes/:id` e `DELETE /api/v1/notes/:id` já estavam planejados como requisitos opcionais
- **Migrations** — substituir o `synchronize: true` do TypeORM por migrations versionadas, mais adequado para ambientes de produção
- **Variáveis de ambiente com validação** — usar o módulo `@nestjs/config` com validação via Joi ou Zod para garantir que o ambiente está corretamente configurado na inicialização

**Frontend**

- **CRUD completo** — integrar as ações de edição e exclusão de notas, dependentes dos endpoints correspondentes no backend
- **Exportação de dados** — exportar a tabela de notas para CSV ou PDF, conforme sugerido nos requisitos opcionais
- **Feedbacks de UX** — notificações de sucesso e erro (toasts) para ações como criação de notas
- **Testes de componentes** — cobertura com React Testing Library para os componentes principais
- **Responsividade** — adaptar o layout para telas menores, especialmente a sidebar e a tabela

---

Agradeço a oportunidade e fico à disposição para qualquer dúvida ou conversa sobre as decisões tomadas ao longo do desenvolvimento!

**Roberto de Abreu Salgado**
