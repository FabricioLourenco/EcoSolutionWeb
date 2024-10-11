// menu.js

// Função para carregar o menu no placeholder
function loadMenu() {
    fetch('../components/menu.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('menu-placeholder').innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o menu:', error));
  }
  
  // Chama a função quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', loadMenu);
  