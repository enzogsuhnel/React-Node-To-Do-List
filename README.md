# To-Do List Application

# Grupo:

- Enzo Guidi Suhnel (23200517)

## Descrição do Projeto
Este é um projeto completo de uma aplicação web de lista de tarefas (**to-do list**), desenvolvida com o objetivo de prática e aprendizado em desenvolvimento full-stack. A aplicação permite aos usuários criar, editar, marcar como concluídas e excluir tarefas de maneira simples e intuitiva. Foi projetada para ser responsiva e funcional em dispositivos de diferentes tamanhos.

---

## Funcionalidades Principais
- **Autenticação de Usuário**:
  - Registro e login seguro utilizando bcrypt para hashing de senhas e JWT para autenticação.
  - Sessão protegida para garantir que apenas usuários autenticados possam acessar as funcionalidades principais.

- **Gerenciamento de Tarefas**:
  - Criar novas tarefas com título e descrição.
  - Atualizar o status de uma tarefa (ex: marcá-la como concluída ou pendente).
  - Editar ou excluir tarefas existentes.

- **Interface de Usuário Intuitiva**:
  - Design responsivo para desktop e dispositivos móveis.
  - Interface amigável desenvolvida com React.

- **Backend Robusto**:
  - API RESTful com Express para manipulação de dados.
  - Banco de dados MongoDB para armazenamento das tarefas e dados do usuário.

---

## Tecnologias Utilizadas

### Frontend:
- **React.js**: para criação de uma interface interativa e dinâmica.
- **CSS Customizado**: para estilização da interface, garantindo responsividade e usabilidade.

### Backend:
- **Node.js** com **Express**: para desenvolvimento da API RESTful.
- **JWT**: para autenticação de usuários.
- **bcrypt**: para criptografia de senhas.

### Banco de Dados:
- **MongoDB**: para armazenar dados de usuários e tarefas.

### Ferramentas Auxiliares:
- **Nodemon**: para reinício automático durante o desenvolvimento.
- **dotenv**: para gerenciar variáveis de ambiente.
- **Git**: para controle de versão.

---

## Instalação e Execução Local

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/todo-list.git
   ```

2. Instale as dependências:
   ```bash
   cd todo-list
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
     ```env
     MONGO_URI= sua_url_do_mongodb
     JWT_SECRET= sua_chave_secreta
     PORT=3000
     ```

4. Inicie a aplicação:
   - Para ambiente de desenvolvimento:
     ```bash
     npm start
     ```

   - Para criar uma build de produção:
     ```bash
     npm run build
     ```

5. Acesse a aplicação no navegador:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/api`

---

## Estrutura do Projeto
```
raiz do projeto
├── frontend/       # Código do cliente React
├── backend/        # API com Express
├── .env            # Configuração de variáveis de ambiente (não incluído no Git)
├── package.json   # Dependências do projeto
└── README.md       # Documentação do projeto
```

---

## Possíveis Melhorias Futuras
- Implementar notificações para prazos de tarefas.
- Adicionar filtros e categorias para organização de tarefas.
- Melhorar a interface com animações e transições.
- Suporte para múltiplos idiomas.

---

## Contribuição
Contribuições são bem-vindas! Para contribuir:
1. Fork este repositório