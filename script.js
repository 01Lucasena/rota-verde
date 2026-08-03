const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('aberto');
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('aberto');
  });
});

const form = document.querySelector('#contato form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const nome = document.querySelector('#nome');
  const email = document.querySelector('#email');
  const mensagem = document.querySelector('#mensagem');

  let valido = true;


  [nome, email, mensagem].forEach((campo) => {
    if (campo.value.trim() === '') {
      mostrarErro(campo, 'Esse campo é obrigatório');
      valido = false;
    } else {
      limparErro(campo);
    }
  });


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() !== '' && !emailRegex.test(email.value)) {
    mostrarErro(email, 'Digite um email válido');
    valido = false;
  }

  if (valido) {
    mostrarSucesso();
    form.reset();
  }
});

function mostrarErro(campo, texto) {
  limparErro(campo); // evita duplicar mensagem
  campo.style.borderColor = '#E85A4A';

  const erro = document.createElement('span');
  erro.className = 'erro-campo';
  erro.textContent = texto;
  campo.insertAdjacentElement('afterend', erro);
}

function limparErro(campo) {
  campo.style.borderColor = '';
  const proximoEl = campo.nextElementSibling;
  if (proximoEl && proximoEl.classList.contains('erro-campo')) {
    proximoEl.remove();
  }
}

function mostrarSucesso() {
  const msg = document.createElement('p');
  msg.className = 'sucesso-envio';
  msg.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
  form.insertAdjacentElement('afterend', msg);

  setTimeout(() => msg.remove(), 4000);
}