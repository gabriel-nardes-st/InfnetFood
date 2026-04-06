# 🍔 InfnetFood

O **InfnetFood** é um aplicativo de delivery desenvolvido com **React Native** e **Expo**. O projeto simula uma plataforma completa de pedidos, desde a navegação por categorias e restaurantes até o fluxo de checkout e perfil do usuário.

---

## 🚀 Tecnologias Utilizadas

* **React Native**: Framework para desenvolvimento mobile.
* **Expo**: Plataforma para facilitar o desenvolvimento e testes.
* **React Navigation**: Gerenciamento de rotas (Stack e Tab Navigation).
* **Context API**: Gerenciamento de estado global (Temas e Carrinho).

---

## 📂 Estrutura de Pastas

```text
├── assets/          # Imagens, ícones e arquivos JSON de animação
├── components/      # Componentes reutilizáveis (Cards de produtos, Mapas, etc.)
├── context/         # Gerenciamento de temas (Dark/Light Mode)
├── data/            # Mock de dados (Produtos e Restaurantes)
├── navigation/      # Configuração das rotas (Home, Login, Tabs)
├── screens/         # Telas principais do aplicativo
├── scripts/         # Scripts auxiliares de dados
└── App.js           # Ponto de entrada do aplicativo
````

---

## 📱 Principais Funcionalidades

- **Autenticação**: Tela de Login integrada ao fluxo de navegação.
    
- **Navegação por Categorias**: Filtro de restaurantes e pratos por tipo de comida.
    
- **Carrinho de Compras**: Adição de itens e visualização de valores.
    
- **Geolocalização**: Integração de mapa para visualização de entrega.
    
- **Temas**: Suporte a modo claro e escuro via Context API.
    
- **Checkout**: Fluxo final de confirmação de pedido.
    

---

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**

    ```
    git clone https://github.com/gabriel-nardes-st/InfnetFood.git
    ```

2. **Instale as dependências:**

    ```
    cd InfnetFood
    npm install
    ```
3. **Inicie o Expo:**

    ```
   npx expo start
    ```

4. **Abra no seu dispositivo:**

- Use o app **Expo Go** no celular (escaneie o QR Code).

5. Entre com "admin@admin.com"  e 123, para e-mail e senha respectivamente.

---

## 📄 Telas Documentadas

- **Login**: Acesso do usuário.

- **Home**: Listagem de categorias e mapa.

- **Restaurante**: Detalhes do estabelecimento e menu de produtos.

- **Carrinho/Checkout**: Revisão do pedido e finalização.

- **Perfil/Configurações**: Gerenciamento de conta e preferências de tema.

- **Detalhes**: Ver detalhes da comida e botão para adicionar ao carrinho.

- **Pedidos**: Ver pedidos finalizados.

---
### 🌐 Integrações com API Externa

O projeto consome a API do **ViaCEP** para agilizar o preenchimento de endereços e melhorar a experiência do usuário (UX) no checkout.

- **Endpoint utilizado:** `https://viacep.com.br/ws/${cep}/json/`
    
- **Localização no código:** O consumo da API está implementado na tela de **Checkout** (ou onde você inseriu o campo de endereço).
    
- **Funcionamento:** 1. O usuário digita o CEP. 2. Uma função assíncrona (`fetch`) é disparada. 3. Os dados de  Cidade são preenchidos automaticamente no endereço do formulário.

---



<img width="241" height="530" alt="image" src="https://github.com/user-attachments/assets/cefd5ebe-ffb3-4a6a-9b9e-2b16c05e3ddf" />
<img width="245" height="532" alt="image" src="https://github.com/user-attachments/assets/e2c651ef-bab9-4eab-9791-1791bdebad93" />
<img width="251" height="530" alt="image" src="https://github.com/user-attachments/assets/5c596905-2b6d-4728-896f-b8ebb6cac409" />
<img width="251" height="528" alt="image" src="https://github.com/user-attachments/assets/2773d791-8cdc-4190-a65a-ce286263ff50" />


**Desenvolvido por [Sedran18](https://www.google.com/search?q=https://github.com/sedran18&authuser=4)**
