//===== FUNÇÃO: Carrega CSS da página dinâmica =====//
function carregarCSSPagina(pagina) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `css/${pagina}.css`;
  link.onload = () => console.log(`${pagina}.css carregado`);
  link.onerror = () => console.warn(`CSS da página ${pagina} não encontrado`);
  document.head.appendChild(link);
}

//===== DEFINIR PÁGINA COM BASE NA URL =====//
const params = new URLSearchParams(window.location.search);
const pagina = params.get('p') || 'home';

//===== INCLUIR HEADER E FOOTER VIA FETCH =====//
function incluirHTML(id, arquivo) {
  fetch(arquivo)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
}
incluirHTML('header', 'includes/header.html');
incluirHTML('footer', 'includes/footer.html');

//===== CARREGAR CONTEÚDO DA PÁGINA E CSS ESPECÍFICO =====//
const container = document.getElementById('conteudo');
fetch(`paginas/${pagina}.html`)
  .then(res => {
    if (!res.ok) throw new Error('Página não encontrada');
    return res.text();
  })
  .then(html => {
    if (container) container.innerHTML = html;
  })
  .catch(() => {
    if (container) container.innerHTML = "<h2>Página não encontrada!</h2>";
  });

carregarCSSPagina(pagina);

//===== MENU HAMBÚRGUER =====//
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-conteiner');
const conteudo = document.querySelector('.conteudo-max');
const logo = document.getElementById('logo-img');

if (toggle && nav && conteudo && logo) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    conteudo.classList.toggle('menu-aberto');

    logo.classList.add('fade-out');

    setTimeout(() => {
      logo.src = conteudo.classList.contains('menu-aberto')
        ? "img/logo-branca.png"
        : "img/logo-preta.png";

      logo.classList.remove('fade-out');
    }, 300);
  });
}

//===== CARROSSEL DESLIZANTE =====//
const imagens = document.querySelectorAll('.carrossel-imagens img');
const anterior = document.querySelector('.anterior');
const proximo = document.querySelector('.proximo');
let index = 0;

function mostrarImagem(i) {
  imagens.forEach((img, idx) => {
    img.classList.remove('ativa');
    if (idx === i) img.classList.add('ativa');
  });
}

if (anterior && proximo) {
  anterior.addEventListener('click', () => {
    index = (index - 1 + imagens.length) % imagens.length;
    mostrarImagem(index);
  });

  proximo.addEventListener('click', () => {
    index = (index + 1) % imagens.length;
    mostrarImagem(index);
  });
}

//===== FAQ =====//
const perguntas = document.querySelectorAll('.faq-question');
perguntas.forEach(pergunta => {
  pergunta.addEventListener('click', () => {
    const respostaAtual = pergunta.nextElementSibling;
    document.querySelectorAll('.faq-answer').forEach(resposta => {
      if (resposta !== respostaAtual) resposta.style.display = 'none';
    });
    respostaAtual.style.display =
      respostaAtual.style.display === 'block' ? 'none' : 'block';
  });
});
function carregarPagina(hash) {
  const pagina = hash ? hash.substring(1) : 'home';
  const caminhoHtml = `paginas/${pagina}.html`;

  fetch(caminhoHtml)
    .then(res => res.ok ? res.text() : Promise.reject())
    .then(html => {
      document.getElementById("conteudo").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("conteudo").innerHTML = '<p>Página não encontrada.</p>';
    });
}

window.addEventListener("hashchange", () => {
  carregarPagina(location.hash);
});

window.addEventListener("DOMContentLoaded", () => {
  carregarPagina(location.hash);
});
function carregarPagina(hash) {
  const pagina = hash ? hash.substring(1) : 'home';
  const caminhoHtml = `paginas/${pagina}.html`;
  const caminhoCss = `css/${pagina}.css`;

  fetch(caminhoHtml)
    .then(res => res.ok ? res.text() : Promise.reject())
    .then(html => {
      document.getElementById("conteudo").innerHTML = html;
      carregarCssPagina(caminhoCss);
    })
    .catch(() => {
      document.getElementById("conteudo").innerHTML = '<p>Página não encontrada.</p>';
    });
}

function carregarCssPagina(caminhoCss) {
  // Remove CSS anterior se existir
  const cssExistente = document.getElementById('css-pagina');
  if (cssExistente) cssExistente.remove();

  // Cria novo link
  const link = document.createElement('link');
  link.id = 'css-pagina';
  link.rel = 'stylesheet';
  link.href = caminhoCss;

  document.head.appendChild(link);
}

window.addEventListener("hashchange", () => {
  carregarPagina(location.hash);
});

window.addEventListener("DOMContentLoaded", () => {
  carregarPagina(location.hash);
});
