document.addEventListener("DOMContentLoaded", buscarTarefas);

function buscarTarefas() {

    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Tarefa/buscar-tarefas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

function carregarTarefas(tarefas) {
    const container = document.getElementById("task-container");
    container.innerHTML = '';

    tarefas.forEach(tarefa => {
        const cardHTML = createTaskCard(tarefa);
        container.innerHTML += cardHTML;
    });
}

function createTaskCard(tarefa) {
    const dataTarefa = new Date(tarefa.horario);
    const dia = dataTarefa.getDate().toString().padStart(2, '0');
    const mes = dataTarefa.toLocaleString('default', { month: 'short' });
    const horario = dataTarefa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `
        <div class="col">
            <div class="card bg-light text-dark h-100">
                <div class="card-body">
                    <h5 class="card-title">${tarefa.titulo || 'Tarefa'}</h5>
                    <p class="card-text">${tarefa.descricao || 'Sem descrição disponível'}</p>
                    <p class="card-text"><strong>Data:</strong> ${dia} ${mes}</p>
                    <p class="card-text"><strong>Hora:</strong> ${horario}</p>
                </div>
            </div>
        </div>
    `;
}

