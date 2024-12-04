document.addEventListener("DOMContentLoaded", buscarMateriais);

function buscarMateriais() {
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Material/buscar-materiais', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
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
                carregarMateriais(data.data); // Carregar os materiais
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
    container.innerHTML = ''; // Limpar o container antes de adicionar os novos cards
    materiais.forEach(material => {
        const cardHTML = createMaterialCard(material);
        container.innerHTML += cardHTML; // Adicionar o card ao container
    });
}

function createMaterialCard(material) {
    return `
        <div class="col">
            <div class="card bg-dark text-white">
                <img src="${material.imagem || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF76l_Pv-jXi15U7a0-zL_b7EnupIHe1R8ZwjMAWoWqkKng_drNBGV8TB71TfAUfgHfdk&usqp=CAU'}" 
                    class="card-img-top" alt="${material.nome || 'Produto'}">
                <div class="card-body">
                    <h5 class="card-title">${material.nome || 'Sem nome'}</h5>
                    <p class="card-text">${material.descricao || 'Sem descrição'}</p>
                    <p class="card-text"><strong>Quantidade:</strong> ${material.quantidade || 0} ${material.unidadeMedida || 'Unidade'}</p>
                </div>
            </div>
        </div>
    `;
}

