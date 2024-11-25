function carregarTarefas(tarefas) {
    const container = document.querySelector('.container-baixo');

    tarefas.forEach(tarefa => {
        const dataTarefa = new Date(tarefa.horario);
        const dia = dataTarefa.getDate().toString().padStart(2, '0');
        const mes = dataTarefa.toLocaleString('default', { month: 'short' });
        const horario = dataTarefa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
        container.innerHTML += tarefaElement;
    });
}

function buscarTarefas() {
    fetch('https://localhost:7214/api/v1/Tarefa/buscar-tarefas', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.sucesso) {
            carregarTarefas(data.data);
        } else {
            console.error('Erro: Não foi possível carregar as tarefas');
        }
    })
    .catch(error => console.error('Erro ao buscar tarefas:', error));
}

window.onload = buscarTarefas;
