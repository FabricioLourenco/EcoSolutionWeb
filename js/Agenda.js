// Função para carregar as tarefas no calendário
function carregarTarefas(tarefas) {
    // Acessando o contêiner de tarefas no HTML
    const container = document.querySelector('.container-baixo');

    // Iterando sobre as tarefas
    tarefas.forEach(tarefa => {
        // Criando o formato de data
        const dataTarefa = new Date(tarefa.horario);
        const dia = dataTarefa.getDate().toString().padStart(2, '0');
        const mes = dataTarefa.toLocaleString('default', { month: 'short' });
        const horario = dataTarefa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Criando os elementos HTML para cada tarefa
        const tarefaElement = `
            <div class="row text-center mt-5">
                <div class="col-md-4">
                    <div class="day mb-3">
                        <span class="fs-4">${dia}</span> <small>${mes}</small>
                    </div>
                    <div class="task bg-warning text-white p-3 rounded mb-2">
                        ${tarefa.titulo} <span class="float-end">${horario}</span>
                    </div>
                </div>
            </div>
        `;

        // Adicionando o elemento da tarefa ao contêiner
        container.innerHTML += tarefaElement;
    });
}

// Função para buscar as tarefas do servidor
function buscarTarefas() {
    fetch('https://localhost:7214/api/v1/Tarefa/buscar-tarefas', {
        method: 'GET', // Método GET para buscar os dados
        headers: {
            'Content-Type': 'application/json', // Definindo o tipo de conteúdo
        }
    })
    .then(response => response.json()) // Transformando a resposta em JSON
    .then(data => {
        if (data.sucesso) {
            // Chama a função para exibir as tarefas
            carregarTarefas(data.data);
        } else {
            console.error('Erro: Não foi possível carregar as tarefas');
        }
    })
    .catch(error => console.error('Erro ao buscar tarefas:', error));
}

// Chama a função para buscar as tarefas assim que a página carregar
window.onload = buscarTarefas;
