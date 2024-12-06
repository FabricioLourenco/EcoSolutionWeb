// Definição dos enums para UnidadeMedida e Setor
const UnidadeMedidaEnum = {
    1: 'Metro',
    2: 'Quilograma'
};

const SetorEnum = {
    1: 'Almoxarifado',
    2: 'Produção',
    3: 'Vendas'
};

// Função que carrega os valores dos enums nos selects
document.addEventListener("DOMContentLoaded", function () {
    carregarEnums();
});

function carregarEnums() {
    // Preenchendo o select de UnidadeMedida
    const unidadeMedidaSelect = document.getElementById('unidadeMedida');
    for (const [key, value] of Object.entries(UnidadeMedidaEnum)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        unidadeMedidaSelect.appendChild(option);
    }

    // Preenchendo o select de Setor
    const setorSelect = document.getElementById('setor');
    for (const [key, value] of Object.entries(SetorEnum)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        setorSelect.appendChild(option);
    }
}

// Função que envia os dados do formulário de solicitação de materiais para o servidor
function inserirMateriais() {
    // Obtendo os valores dos campos do formulário
    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value, 10);
    const unidadeMedida = parseInt(document.getElementById('unidadeMedida').value, 10); // Envia o valor numérico do enum
    const setor = parseInt(document.getElementById('setor').value, 10); // Envia o valor numérico do enum

    // Criando o objeto JSON para envio
    const material = {
        nome,
        descricao,
        quantidade,
        unidadeMedida,
        setor
    };

    // Gerando o token e enviando a requisição
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Material/inserir-material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(material) // Convertendo o objeto para JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao inserir material: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.sucesso) {
                    alert('Material solicitado com sucesso!');
                    // Opcional: limpar os campos do formulário
                    document.querySelector('form').reset();
                } else {
                    console.error('Erro no servidor:', data.mensagens);
                    alert('Erro ao solicitar material.');
                }
            })
            .catch(error => {
                console.error('Erro ao inserir material:', error);
                alert('Erro ao inserir material. Verifique sua conexão ou tente novamente.');
            });
    });
}

// Adicionando o evento de submit ao formulário
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    inserirMateriais();
});
