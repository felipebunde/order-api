# 📦 Order API

API REST desenvolvida em **Node.js + Express + MongoDB Atlas** para gerenciamento de pedidos com autenticação **JWT** e documentação interativa **Swagger**.

Projeto desenvolvido como **desafio técnico**, incluindo boas práticas de organização, tratamento de erros e transformação de dados.

---

# 🚀 Tecnologias

* **Node.js** — Ambiente de execução JavaScript
* **Express** — Framework web
* **MongoDB Atlas** — Banco NoSQL na nuvem
* **Mongoose** — ODM para modelagem de dados
* **JWT (JSON Web Token)** — Autenticação segura
* **Swagger** — Documentação interativa da API

---

# 🔧 Como executar o projeto

## Pré-requisitos

* Node.js (v14 ou superior)
* npm ou yarn
* Conta no MongoDB Atlas (ou MongoDB local)
* Postman ou Insomnia (opcional para testes)

---

# 📥 1. Clone o repositório

```bash
git clone https://github.com/felipebunde/order-api.git
cd order-api
```

---

# 📦 2. Instale as dependências

```bash
npm install
```

---

# ⚙️ 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb_atlas
JWT_SECRET=minha_chave_super_secreta
```

### Como obter a string do MongoDB Atlas

1. Acesse:

```
https://cloud.mongodb.com
```

2. Vá em:

```
Database → Clusters→ Connect → Connect your application
```

3. Copie a string que começa com:

```
mongodb+srv://...
```

---

# ▶️ 4. Iniciar o servidor

Modo desenvolvimento (com reload automático):

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

---

# 🌐 Acessar a API

```
http://localhost:3000
```

---

# 📚 Documentação da API (Swagger)

A API possui documentação interativa com **Swagger**.

Acesse:

```
http://localhost:3000/api-docs
```

No Swagger você pode:

* visualizar todos os endpoints
* ver os schemas de dados
* testar requisições diretamente
* autenticar usando o botão **Authorize**

---

# 🔐 Autenticação (JWT)

Algumas rotas da API são protegidas e exigem autenticação usando **JWT**.

Fluxo básico:

1. Registrar usuário
2. Fazer login
3. Usar o token nas rotas protegidas

---

# 👤 Registrar usuário

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"123456"}'
```

---

# 🔑 Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"123456"}'
```

Resposta:

```json
{
  "message": "Login realizado com sucesso",
  "token": "JWT_TOKEN_AQUI",
  "user": {
    "id": "...",
    "username": "admin"
  }
}
```

---

# 🪪 Usar o token nas rotas protegidas

Inclua o token no header da requisição:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

Exemplo:

```bash
curl -X POST http://localhost:3000/order \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_AQUI" \
-d '{"numeroPedido":"pedido-01","valorTotal":10000,"dataCriacao":"2023-07-19T12:24:11.529Z","items":[{"idItem":"2434","quantidadeItem":1,"valorItem":1000}]}'
```

---

# 📌 Rotas da API

| Método | Rota           | Autenticação | Descrição         |
| ------ | -------------- | ------------ | ----------------- |
| POST   | /auth/register | ❌ Pública    | Registrar usuário |
| POST   | /auth/login    | ❌ Pública    | Fazer login       |
| GET    | /order/list    | ❌ Pública    | Listar pedidos    |
| GET    | /order/:id     | ❌ Pública    | Buscar pedido     |
| POST   | /order         | ✅ Protegida  | Criar pedido      |
| PUT    | /order/:id     | ✅ Protegida  | Atualizar pedido  |
| DELETE | /order/:id     | ✅ Protegida  | Deletar pedido    |

---

# 📌 Criar Pedido

Endpoint:

```
POST /order
```

Request:

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

Resposta:

```json
{
  "message": "Pedido criado com sucesso",
  "order": {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
}
```

---

# 🔄 Transformação de dados (Mapping)

A API recebe dados em um formato e transforma antes de salvar no banco.

| Recebido       | Salvo        |
| -------------- | ------------ |
| numeroPedido   | orderId      |
| valorTotal     | value        |
| dataCriacao    | creationDate |
| idItem         | productId    |
| quantidadeItem | quantity     |
| valorItem      | price        |

---

# 🗄 Estrutura no MongoDB

Collection: **orders**

```json
{
  "_id": "ObjectId",
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

# 📁 Estrutura do projeto

```
order-api
│
├── src
│   ├── controllers
│   │   ├── orderController.js
│   │   └── authController.js
│   │
│   ├── models
│   │   ├── Order.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── orderRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   └── auth.js
│   │
│   └── swagger.js
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

# 🧪 Teste rápido

Registrar usuário:

```bash
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"teste\",\"password\":\"123456\"}"
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"teste\",\"password\":\"123456\"}"
```

---

# 👨‍💻 Autor

**Felipe Bunde**

GitHub
https://github.com/felipebunde

Desafio Técnico — **Jitterbit**
2026

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
