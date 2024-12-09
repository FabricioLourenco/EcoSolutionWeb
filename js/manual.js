/**
 * Renderiza os manuais de equipamentos na página.
 * @param {Array} manuais - Lista de manuais retornados pela API.
 */
function carregarManuais(manuais) {
    const container = document.getElementById('manuais-container');
    container.innerHTML = '';

    manuais.forEach(manual => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = '/assets/pdf.png';
        img.alt = 'Manual em PDF';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = manual.nome;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = manual.descricao;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('card-buttons');

        const visualizarBtn = document.createElement('button');
        visualizarBtn.classList.add('btn', 'btn-success', 'flex-grow-1');
        visualizarBtn.textContent = 'Visualizar';
        visualizarBtn.addEventListener('click', () => {
            const base64PDF = manual.arquivosVinculados[0]?.arquivo.dados;
            if (base64PDF) {
                const pdfWindow = window.open();
                pdfWindow.document.write(`<iframe width="100%" height="100%" src="data:application/pdf;base64,${base64PDF}"></iframe>`);
            } else {
                alert("PDF não encontrado.");
            }
        });

        const apagarBtn = document.createElement('button');
        apagarBtn.classList.add('btn', 'btn-danger', 'flex-grow-1');
        apagarBtn.textContent = 'Apagar';
        apagarBtn.addEventListener('click', () => {
            if (confirm(`Deseja apagar o manual "${manual.nome}"?`)) {
                // Implementar lógica de exclusão aqui.
                alert('Manual apagado com sucesso.');
            }
        });

        buttonsContainer.appendChild(visualizarBtn);
        buttonsContainer.appendChild(apagarBtn);

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(buttonsContainer);

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
                'Authorization': `Bearer ${token}`
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
