document.addEventListener("DOMContentLoaded", buscarTarefas);

function buscarTarefas() {
    const container = document.getElementById("task-container");
    const spinner = document.getElementById("loading-spinner");

    // Exibe o spinner enquanto carrega as tarefas
    spinner.style.display = 'block';

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
                spinner.style.display = 'none'; // Oculta o spinner
                if (data.sucesso) {
                    carregarTarefas(data.data);
                } else {
                    console.error('Erro ao carregar tarefas:', data.mensagens);
                    alert('Erro ao carregar tarefas.');
                }
            })
            .catch(error => {
                spinner.style.display = 'none'; // Oculta o spinner
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

    // Adiciona eventos aos botões dinâmicos
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", editarTarefa);
    });

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", excluirTarefa);
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
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-warning btn-sm edit-button" data-id="${tarefa.id}">Editar</button>
                        <button class="btn btn-danger btn-sm ms-2 delete-button" data-id="${tarefa.id}">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function editarTarefa(event) {
    const tarefaId = event.target.getAttribute("data-id");
    // Lógica para abrir modal ou redirecionar para a tela de edição com o ID
    console.log("Editar tarefa com ID:", tarefaId);
    alert(`Função de edição chamada para a tarefa ID: ${tarefaId}`);
}

function excluirTarefa(event) {
    const tarefaId = event.target.getAttribute("data-id");
    const confirmacao = confirm("Tem certeza de que deseja excluir esta tarefa?");
    if (!confirmacao) return;

    GerarToken.obterToken(token => {
        fetch(`https://localhost:7214/api/v1/Tarefa/excluir-tarefa/${tarefaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao excluir tarefa: ' + response.statusText);
                }
                alert('Tarefa excluída com sucesso!');
                buscarTarefas(); // Atualiza a lista de tarefas
            })
            .catch(error => {
                console.error('Erro ao excluir tarefa:', error);
                alert('Erro ao excluir tarefa. Tente novamente.');
            });
    });
}
