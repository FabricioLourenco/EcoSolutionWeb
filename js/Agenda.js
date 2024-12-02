function carregarTarefas(tarefas) {
    const container = document.querySelector('.container-baixo');
    container.innerHTML = ''; // Limpa o conteúdo atual da página para carregar novamente

    tarefas.forEach(tarefa => {
        const dataTarefa = new Date(tarefa.horario);
        const dia = dataTarefa.getDate().toString().padStart(2, '0');
        const mes = dataTarefa.toLocaleString('default', { month: 'short' });
        const horario = dataTarefa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Criação de elementos diretamente no DOM (evita reflow/repaint desnecessário)
        const row = document.createElement('div');
        row.classList.add('row', 'text-center', 'mt-5');

        const col = document.createElement('div');
        col.classList.add('col-md-4');

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day', 'mb-3');
        dayDiv.innerHTML = `<span class="fs-4">${dia}</span> <small>${mes}</small>`;

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', 'bg-warning', 'text-white', 'p-3', 'rounded', 'mb-2');
        taskDiv.innerHTML = `${tarefa.titulo} <span class="float-end">${horario}</span>`;

        col.appendChild(dayDiv);
        col.appendChild(taskDiv);
        row.appendChild(col);
        container.appendChild(row); // Adiciona a nova linha ao container
    });
}

/**
 * Busca tarefas utilizando o token.
 */
function buscarTarefas() {
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Tarefa/buscar-tarefas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar tarefas: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.sucesso) {
                    carregarTarefas(data.data);
                } else {
                    console.error('Erro ao carregar tarefas:', data.mensagens);
                    alert('Erro ao carregar tarefas.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
                alert('Erro ao buscar tarefas. Verifique a sua conexão.');
            });
    });
}

// Executar ao carregar a página
window.onload = function () {
    buscarTarefas();
};