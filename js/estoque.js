document.addEventListener("DOMContentLoaded", buscarMateriais);

function buscarMateriais() {
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Material/buscar-materiais', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar materiais: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.sucesso) {
                    carregarMateriais(data.data);
                } else {
                    console.error('Erro ao carregar materiais:', data.mensagens);
                    alert('Erro ao carregar materiais.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar materiais:', error);
                alert('Erro ao buscar materiais. Verifique a sua conexão.');
            });
    });
}

function carregarMateriais(materiais) {
    const container = document.getElementById("stock-cards-container");
    container.innerHTML = '';
    materiais.forEach(material => {
        const cardHTML = createMaterialCard(material);
        container.innerHTML += cardHTML;
    });
}

function createMaterialCard(material) {
    const unidadeMedida = mapUnidadeMedida(material.unidadeMedida);

    return `
        <div class="card">
            <img src="${material.imagem || '/assets/estoque.png'}" 
                alt="${material.nome || 'Produto'}">
            <div class="card-body">
                <h5 class="card-title">${material.nome || 'Sem nome'}</h5>
                <p class="card-text">${material.descricao || 'Sem descrição'}</p>
                <p class="card-text"><strong>Quantidade:</strong> ${material.quantidade || 0} ${unidadeMedida || 'Unidade'}</p>
            </div>
        </div>
    `;
}

// Função de mapeamento entre o número do enum e o nome da unidade de medida
function mapUnidadeMedida(valor) {
    const unidades = {
        1: 'm',
        2: 'kg'
    };

    return unidades[valor] || 'Unidade';
}
