// Função para logout
function logout() {
    sessionStorage.clear();
    alert("Sessão encerrada com sucesso!");
    window.location.href = "./index.html"; // Página de login
}

// Preencher informações do usuário com dados da sessão
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
        // Preenche o nome e a função no topo
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-role").textContent = user.role;

        // Preenche a tabela com informações do usuário
        document.getElementById("nome").textContent = user.name;
        document.getElementById("funcao").textContent = user.role;
        document.getElementById("planta").textContent = "Chapecó-SC"; // Planta fixa como exemplo

        // Gera data de admissão aleatória
        const randomDate = generateRandomDate(new Date(2010, 0, 1), new Date(2020, 11, 31));
        document.getElementById("data-admissao").textContent = randomDate.toLocaleDateString("pt-BR");
    } else {
        alert("Usuário não encontrado. Por favor, faça login novamente.");
        window.location.href = "./index.html";
    }
});

// Função para gerar uma data aleatória entre duas datas
function generateRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
}
