/**
 * Renderiza os manuais de equipamentos na página.
 * @param {Array} manuais - Lista de manuais retornados pela API.
 */
function carregarManuais(manuais) {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    manuais.forEach(manual => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-center');
        card.style.width = '18rem';
        card.style.backgroundColor = '#2c2c38';
        card.style.color = 'white';
        card.style.border = 'none';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'flex-start'; // Alinha itens no topo do card
        card.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = '/assets/pdf.png';  // A imagem associada ao PDF
        img.alt = 'Manual em PDF';
        img.className = 'card-img-top';
        img.style.borderRadius = '10px';
        img.style.marginTop = '20px';
        img.style.width = '120px';  // Ajustando a largura da imagem
        img.style.height = '120px'; // Ajustando a altura da imagem

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = manual.nome; // Nome do manual

        const description = document.createElement('p');
        description.classList.add('card-text', 'text-muted');
        description.textContent = manual.descricao; // Descrição do manual

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-success', 'w-100');
        button.textContent = 'Visualizar Manual';

        // Criação do link para abrir o PDF em base64 em uma nova guia
        button.addEventListener('click', () => {
            // Acessar o PDF vinculado (base64)
            const base64PDF = manual.arquivosVinculados[0]?.arquivo.dados;
            if (base64PDF) {
                const pdfWindow = window.open();
                pdfWindow.document.write(`<iframe width="100%" height="100%" src="data:application/pdf;base64,${base64PDF}"></iframe>`);
            } else {
                alert("PDF não encontrado.");
            }
        });

        // Colocando o título e descrição acima do botão
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(button);

        card.appendChild(img);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}

/**
 * Busca os manuais de equipamentos utilizando o token.
 */
function buscarManuais() {
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Manual/buscar-manuais', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Token gerado e válido
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar manuais: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.sucesso) {
                    carregarManuais(data.data);
                    console.log(data.data);
                } else {
                    console.error('Erro ao carregar manuais:', data.mensagens);
                    alert('Erro ao carregar manuais.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição dos manuais:', error);
                alert('Erro ao buscar manuais. Verifique a sua conexão.');
            });
    });
}

// Executar ao carregar a página
window.onload = function () {
    buscarManuais();
};
