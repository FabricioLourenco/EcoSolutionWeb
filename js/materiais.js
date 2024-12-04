/**
 * Envia os dados do formulário de solicitação de materiais para o servidor.
 */
function inserirMateriais() {
    // Obtendo os valores dos campos do formulário
    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value, 10);
    const unidadeMedida = parseInt(document.getElementById('unidadeMedida').value, 10);
    const setor = parseInt(document.getElementById('setor').value, 10);

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
