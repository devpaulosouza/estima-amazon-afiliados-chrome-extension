# Amazon Afiliados – Calculadora Automática de Comissão  
Extensão para Google Chrome

Uma extensão simples e eficiente que calcula automaticamente o valor total dos pedidos e a comissão estimada no painel de Afiliados da Amazon Brasil.  
Desenvolvida originalmente para facilitar a vida do glorioso Zé Bunda 🐦🤖✨

---

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success)
![Chrome](https://img.shields.io/badge/Chrome-Extension-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🖼️ Preview da Extensão

A extensão adiciona automaticamente um pequeno painel no canto superior direito da tela mostrando:

- Total dos pedidos  
- Total estimado da comissão  

Segue um exemplo real de como ela aparece durante o uso:

![Preview da extensão](screenshot.png)

*(coloque `screenshot.png` na raiz do repositório ou ajuste o nome conforme o arquivo que você subir)*

---

## 📌 Funcionalidades
- Lê automaticamente a tabela de pedidos do painel da Amazon Afiliados.
- Identifica a categoria de cada item e aplica a porcentagem de comissão correta.
- Soma automaticamente o valor total dos pedidos.
- Calcula a comissão estimada com base na tabela oficial da Amazon.
- Exibe um box fixo na tela com os totais.
- **Detecta automaticamente mudanças de página e filtros** (via MutationObserver).
- Funciona mesmo quando o site usa carregamento dinâmico (AJAX).

---

## 🚀 Instalação (Modo Desenvolvedor)
1. Baixe ou clone este repositório.
2. Abra o Chrome e vá para:  
   `chrome://extensions/`
3. Ative o **Modo de desenvolvedor**.
4. Clique em **"Carregar sem compactação" / "Load unpacked"**.
5. Selecione a pasta da extensão.
6. Abra o painel da Amazon Afiliados e pronto!  
   A calculadora aparece automaticamente no canto superior direito.

---

## 🛠 Arquivos
- `manifest.json` – define permissões e scripts.
- `content.js` – script que lê a tabela, calcula tudo e atualiza dinamicamente.

---

## 📘 Como funciona
A lógica principal:
1. O script encontra a tabela de pedidos.
2. Lê cada linha e extrai:
   - Categoria  
   - Preço  
3. Aplica a taxa de comissão correspondente.
4. Atualiza os resultados automaticamente sempre que:
   - a página muda,  
   - filtros são aplicados,  
   - a tabela é atualizada dinamicamente.

---

## 🧪 Melhorias Futuras
- Coluna adicional na tabela com comissão por item  
- Exportação para CSV/Excel  
- Customização das taxas de comissão  
- Modo escuro do painel de resumo  

---

## 📜 Licença – MIT
Este projeto está licenciado sob a **MIT License**.  
Você pode usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias deste software livremente.

O texto completo da licença está disponível no arquivo `LICENSE`.

---

# 🇺🇸 English Version

# Amazon Affiliates – Automatic Commission Calculator  
Chrome Extension

A simple and efficient Chrome extension that automatically calculates the total order value and estimated commission on the Amazon Brazil Affiliates dashboard.  
Originally crafted to make life easier for the mighty Zé Bunda 🐦🤖✨

---

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success)
![Chrome](https://img.shields.io/badge/Chrome-Extension-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🖼️ Extension Preview

The extension automatically adds a small floating panel in the top-right corner of the page showing:

- Total order value  
- Estimated commission  

Here’s an example of how it looks in action:

![Extension preview](screenshot.png)

*(place `screenshot.png` in the repository root or adjust to whatever filename you upload)*

---

## 📌 Features
- Automatically reads the orders table from Amazon Affiliates.
- Detects item categories and applies the correct commission percentage.
- Automatically sums the total value of orders.
- Calculates the estimated commission using Amazon’s official rates.
- Displays a floating summary box on the top-right corner.
- **Auto-updates when pages or filters change** (via MutationObserver).
- Works even when the dashboard loads data dynamically.

---

## 🚀 Installation (Developer Mode)
1. Download or clone this repository.
2. Open Chrome and go to:  
   `chrome://extensions/`
3. Enable **Developer mode**.
4. Click **"Load unpacked"**.
5. Select the extension folder.
6. Open the Amazon Affiliates dashboard — the calculator will appear automatically.

---

## 📜 License – MIT
This project is licensed under the **MIT License**.  
You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software freely.

See the full license text in the `LICENSE` file.

