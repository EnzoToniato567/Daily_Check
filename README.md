# Daily_Check 📋

Aplicação fullstack para gerenciamento de tarefas diárias com interface responsiva e API RESTful.

## 🎯 Sobre o Projeto

Daily_Check é uma aplicação web completa para controlar suas tarefas do dia a dia. Com uma interface simples e intuitiva, você pode criar, visualizar, atualizar e deletar tarefas facilmente.

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **MariaDB** - Banco de dados relacional

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização
- **JavaScript (Vanilla)** - Interatividade

## 📁 Estrutura do Projeto

```
Daily_Check/
├── README.md
├── api/
│   └── daily-check/
│       ├── package.json
│       ├── prisma.config.ts
│       ├── server.js
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       │       └── 20260506105822_daily_check_database/
│       ├── src/
│       │   ├── controllers/
│       │   │   └── tarefas.controllers.js
│       │   ├── data/
│       │   │   └── prisma.js
│       │   └── routes/
│       │       └── tarefas.routes.js
└── ui/
    ├── index.html
    ├── script.js
    ├── style.css
    ├── tarefas.html
    ├── temperatura.html
    └── assets/
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v16 ou superior)
- MariaDB ou MySQL
- npm ou yarn

### Instalação

1. **Clone ou navegue até o diretório do projeto**
```bash
cd Daily_Check/api/daily-check
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na pasta `api/daily-check/`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/daily_check"
```

4. **Execute as migrações do banco de dados**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

6. **Acesse a aplicação**
Abra `ui/index.html` no seu navegador ou use um servidor local para servir os arquivos.

## 📡 API Endpoints

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/tarefas/cadastrar` | Criar nova tarefa |
| `GET` | `/api/tarefas/listar` | Listar todas as tarefas |
| `GET` | `/api/tarefas/buscar/:id` | Buscar tarefa por ID |
| `PUT` | `/api/tarefas/atualizar/:id` | Atualizar tarefa |
| `DELETE` | `/api/tarefas/excluir/:id` | Deletar tarefa |

### Exemplo de Requisição

**Cadastrar Tarefa:**
```json
POST /api/tarefas/cadastrar
Content-Type: application/json

{
  "titulo": "Estudar JavaScript",
  "descricao": "Revisar conceitos avançados",
  "prioridade": "alta",
  "data_vencimento": "2026-05-10"
}
```

## 🗄️ Banco de Dados

O schema do banco de dados é gerenciado pelo Prisma. Verifique o arquivo `prisma/schema.prisma` para ver a estrutura completa das tabelas.

## 📋 Scripts Disponíveis

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Gerar cliente Prisma
npx prisma generate

# Abrir Prisma Studio (visualizar dados)
npx prisma studio
```

## 🎨 Páginas Frontend

- **index.html** - Página principal
- **tarefas.html** - Gerenciador de tarefas
- **temperatura.html** - Página adicional

## 📝 Notas Importantes

- O servidor Express está configurado com CORS habilitado para comunicação com o frontend
- As migrations estão versionadas e sincronizadas com o Prisma
- O modo `--watch` do Node.js permite desenvolvimento com hot reload

## 🤝 Contribuição

Sinta-se livre para fazer melhorias! Faça um fork, crie uma branch para sua feature e envie um pull request.

## 📄 Licença

Este projeto é de uso livre.

---
