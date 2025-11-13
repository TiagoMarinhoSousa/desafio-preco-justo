# 📘 Preço Justo

(https://github.com/TiagoMarinhoSousa/desafio-preco-justo/commits/main)


Este projeto é uma aplicação **frontend** para gerenciamento de posts e comentários, consumindo a **API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)**. Desenvolvido com **Angular 16** e estilizado com **Tailwind CSS 3**, o objetivo é demonstrar uma arquitetura limpa e moderna utilizando *standalone components* e gerenciamento de estado baseado em **RxJS** e **Signals**.

---

## ✨ Funcionalidades Principais

* **Listagem e Visualização** de posts e seus respectivos comentários.
* **Criação de novos posts**.
* **Edição e Exclusão** de posts existentes.
* **Design Responsivo** e interface moderna com Tailwind CSS.

> ⚠️ **Observação sobre a API:**
> A API JSONPlaceholder utilizada possui uma limitação conhecida: **só permite a edição (PUT/PATCH) de posts com ID até 100**. Posts com ID superior a 100 (como os criados pelo usuário) não serão realmente atualizados na API (embora a aplicação possa simular a atualização no frontend para fins de demonstração).

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Versão | Detalhes |
| :--- | :--- | :---: | :--- |
| **Framework** | **Angular CLI** | 16.2.16 | Arquitetura com *standalone components* e *feature folders*. |
| **Estilização** | **Tailwind CSS** | 3.x | Abordagem *utility-first* para um design rápido e responsivo. |
| **Estado** | **RxJS + Signals** | N/A | Gerenciamento reativo de estado. |
| **API** | **JSONPlaceholder** | N/A | API REST pública para dados de *mock*. |
| **Outras** | **HttpClient** | N/A | Módulo nativo para comunicação HTTP. |
| **Outras** | **HTTP Interceptors** | N/A | Tratamento global de requisições e respostas (ex: *loading*). |
| **Outras** | **Async Pipe** | N/A | Otimização de *templates* com Observables. |

---

## 📦 Instalação e Execução

Para rodar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

* **Node.js** (versão 18+ recomendada)
* **Angular CLI** (pode ser instalado globalmente via `npm install -g @angular/cli`)
* **npm** ou **yarn**

### 1. Clonando o projeto

Abra seu terminal e execute:

```bash
git clone [https://github.com/TiagoMarinhoSousa/desafio-preco-justo.git](https://github.com/TiagoMarinhoSousa/desafio-preco-justo.git)
cd desafio-preco-justo

### 2. Instalando Dependências
Use seu gerenciador de pacotes preferido:

Bash

npm install
# ou
# yarn install

### 3. Executando a Aplicação
Inicie o servidor de desenvolvimento do Angular. A aplicação estará acessível em http://localhost:4200/.

Bash

ng serve -o

📁 Estrutura de Pastas
A arquitetura do projeto segue o padrão de Feature Folders (pastas por funcionalidade) e Standalone Components para maior modularidade e escalabilidade:

src/app/
├── core/
│   ├── interceptor/    # Interceptadores globais (ex: tratamento de erros, loading)
│   ├── model/          # Interfaces e DTOs (Data Transfer Objects)
│   └── service/        # Serviços base de API, lógica de cache e estado global
├── shared/
│   └── components/     # Componentes reutilizáveis em múltiplas funcionalidades
└── features/           # Funcionalidades principais (Modules/Routes)
    ├── comments/       # Lógica e componentes para gerenciamento de comentários
    └── posts/
        ├── componentes/  # Componentes específicos para a feature de posts
        └── pages/        # Componentes que representam rotas/páginas (listagem, detalhes)

🧪 Testes
Para executar os testes unitários via [Karma] e [Jasmine], utilize o seguinte comando:

Bash

ng test


👤 Autor
Tiago Marinho Sousa

[]([https://www.linkedin.com/in/tiagomarinho-dev/])