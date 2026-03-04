# 🚀 Treinos-API

> **A inteligência por trás do seu shape.** O Treinos-API é uma solução Full Stack desenvolvida para automatizar e organizar a montagem de treinos de academia, entregando uma rotina personalizada de forma prática e eficiente.

---

## 📋 Sobre o Projeto

O **Treinos-API** foi criado para resolver a indecisão na hora de treinar. Combinando um backend robusto em Node.js com uma interface dinâmica em React, a aplicação permite que o usuário foque no que importa: o treino. O projeto é totalmente conteinerizado com Docker, garantindo que a aplicação rode em qualquer ambiente sem conflitos de dependências.

### ✨ Principais Funcionalidades
* **Montagem de Treinos:** Algoritmo que estrutura sua rotina de exercícios.
* **Gestão de Dados:** Persistência confiável utilizando PostgreSQL.
* **Interface Responsiva:** Frontend em React focado na experiência do usuário.
* **Infraestrutura Ágil:** Setup simplificado através de Docker e Docker Compose.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) |
| **Backend** | [Node.js](https://nodejs.org/) |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/) |
| **Infraestrutura** | [Docker](https://www.docker.com/) |

---

## 📸 Demonstração

*(Adicione prints de tela ou GIFs aqui para dar brilho ao seu projeto!)*

> 💡 **Exemplo:**
> ![Dashboard do Treinos-API](https://via.placeholder.com/800x400?text=Sua+Interface+Aqui)

---

## 🚀 Como Rodar o Projeto

### 🛠 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
* [Git](https://git-scm.com)
* [Docker](https://www.docker.com/products/docker-desktop) e **Docker Compose**

### 📦 Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/allanflm/Treinos-API.git](https://github.com/allanflm/Treinos-API.git)
    cd Treinos-API
    ```

2.  **Configuração de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example` (se disponível).

3.  **Suba os containers:**
    ```bash
    docker-compose up -d --build
    ```

4.  **Acesse a aplicação:**
    * **Frontend:** `http://localhost:3000`
    * **API (Backend):** `http://localhost:5000`

---

## 📁 Estrutura de Pastas

```text
├── server/          # Backend Node.js & API
├── client/          # Frontend React
├── docker/          # Configurações Docker (Dockerfile, etc)
├── docker-compose.yml
└── README.md
