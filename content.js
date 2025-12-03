(function () {
  // Regras de comissão por categoria
  const COMMISSION_RULES = [
    {
      rate: 0.13,
      includes: [
        "Bebê",
        "Beleza",
        "Beleza de Luxo",
        "Saúde e Cuidados Pessoais",
        "Saúde e residência",
        "Aparelhos de Cuidados Pessoais",
        "Bebidas Alcoólicas",
        "Alimentos e Bebidas",
        "Audiolivros"
      ]
    },
    {
      rate: 0.11,
      includes: ["Roupas", "Pet Shop"]
    },
    {
      rate: 0.10,
      includes: ["Livros", "Livros Digitais", "Livros e livros didáticos"]
    },
    {
      rate: 0.095,
      includes: ["Dispositivos Amazon"]
    },
    {
      rate: 0.08,
      includes: [
        "Aventura e Lazer",
        "Esportes",
        "Brinquedos e Jogos",
        "Móveis",
        "Casa",
        "Construção e Reforma",
        "Ferramentas",
        "Cozinha",
        "Jardim e Piscina",
        "Gramado, Jardim e Quintal",
        "Eletrodomésticos"
      ]
    },
    {
      rate: 0.08,
      includes: [
        "Câmeras e Foto",
        "Eletrônicos",
        "Informática",
        "Instrumentos Musicais",
        "Papelaria e Escritório",
        "Celulares e Tecnologia Sem Fio",
        "Games e Consoles",
        "TV e Áudio"
      ]
    },
    {
      rate: 0.07,
      includes: [
        "Bolsas",
        "Malas e Mochilas",
        "Calçados",
        "Jóias",
        "Relógios"
      ]
    },
    {
      rate: 0.07,
      includes: [
        "CD e Vinil",
        "DVD e Blu-ray",
        "Automotivo",
        "Produtos Industriais e Científicos",
        "Assinaturas Prime",
        "Outros"
      ]
    }
  ];

  function getCommissionRate(categoryText) {
    if (!categoryText) return 0;
    const cat = categoryText.trim();
    for (const rule of COMMISSION_RULES) {
      if (rule.includes.some(keyword => cat.includes(keyword))) {
        return rule.rate;
      }
    }
    return 0.07;
  }

  function parsePrice(text) {
    if (!text) return 0;
    let clean = text.replace(/[^\d.,]/g, "").trim();
    if (!clean) return 0;

    const hasComma = clean.includes(",");
    const hasDot = clean.includes(".");

    if (hasComma && hasDot) {
      clean = clean.replace(/\./g, "").replace(",", ".");
    } else if (hasComma) {
      clean = clean.replace(/\./g, "").replace(",", ".");
    } else if (hasDot) {
      const parts = clean.split(".");
      if (parts.length > 2) {
        const last = parts.pop();
        clean = parts.join("") + "." + last;
      }
    }

    const value = parseFloat(clean);
    return isNaN(value) ? 0 : value;
  }

  function formatBRL(value) {
    return value.toFixed(2).replace(".", ",");
  }

  function findOrdersTable() {
    const tables = document.querySelectorAll("table");
    if (!tables.length) return null;

    for (const table of tables) {
      const headerText = (table.textContent || "").trim();
      if (
        headerText.includes("Produtos pedidos") &&
        headerText.includes("Categoria")
      ) {
        return table;
      }
    }

    return tables[0];
  }

  // ---- ACÚMULO ENTRE PÁGINAS ----
  // Conjunto com chaves únicas das linhas já consideradas no acumulado
  const seenRowKeys = new Set();
  let globalTotalValue = 0;
  let globalTotalCommission = 0;

  function getRowKey(row) {
    // Usa o texto inteiro da linha como "assinatura"
    // Se a mesma linha aparecer em outra página, a key será igual.
    return (row.innerText || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function calculateCommission() {
    const table = findOrdersTable();
    if (!table) return;

    let rows = table.querySelectorAll("tbody tr");
    if (!rows.length) rows = table.querySelectorAll("tr");
    if (!rows.length) return;

    let pageValue = 0;
    let pageCommission = 0;

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const category = cells[1].innerText;
      const priceText = cells[cells.length - 1].innerText;
      const price = parsePrice(priceText);
      if (price <= 0) return;

      const rate = getCommissionRate(category);
      const commission = price * rate;

      // Sempre soma o total da página atual
      pageValue += price;
      pageCommission += commission;

      // Agora cuida do ACUMULADO (sem repetir)
      const key = getRowKey(row);
      if (!seenRowKeys.has(key)) {
        seenRowKeys.add(key);
        globalTotalValue += price;
        globalTotalCommission += commission;
      }
    });

    showResult(pageValue, pageCommission, globalTotalValue, globalTotalCommission);
  }

  function showResult(pageValue, pageCommission, totalValue, totalCommission) {
    let box = document.getElementById("amazon-comissao-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "amazon-comissao-box";
      box.style.position = "fixed";
      box.style.top = "10px";
      box.style.right = "10px";
      box.style.zIndex = "99999";
      box.style.background = "#232f3e";
      box.style.color = "#fff";
      box.style.padding = "12px 16px";
      box.style.borderRadius = "8px";
      box.style.fontFamily = "system-ui";
      box.style.fontSize = "13px";
      box.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      box.style.maxWidth = "280px";
      box.style.lineHeight = "1.4";
      document.body.appendChild(box);
    }

    box.innerHTML = `
      <strong>Resumo de Comissões</strong><br>
      <span>Página atual – pedidos:</span> <strong>R$ ${formatBRL(pageValue)}</strong><br>
      <span>Página atual – comissão:</span> <strong>R$ ${formatBRL(pageCommission)}</strong>
      <hr style="border:0;border-top:1px solid rgba(255,255,255,0.3);margin:6px 0;">
      <span>Acumulado – pedidos:</span> <strong>R$ ${formatBRL(totalValue)}</strong><br>
      <span>Acumulado – comissão:</span> <strong>R$ ${formatBRL(totalCommission)}</strong><br>
      <small style="opacity:.8;">(Acumula somente linhas únicas vistas nesta sessão)</small>
    `;
  }

  // --- MULTI-PÁGINAS! MutationObserver ---
  let lastHTML = "";
  let debounceTimeout = null;

  const observer = new MutationObserver(() => {
    const table = findOrdersTable();
    if (!table) return;
    const html = table.innerHTML;

    if (html !== lastHTML) {
      lastHTML = html;

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        calculateCommission();
      }, 250);
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      const target = document.body;
      observer.observe(target, {
        childList: true,
        subtree: true
      });
      calculateCommission();
    }, 1500);
  });
})();

