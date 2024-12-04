document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    // Dados simulados de usuários para validação
    const users = [
        { username: "admin@gmail.com", password: "1234", name: "Fabrício Borges", role: "Operador II" },
        { username: "usuario", password: "abcd", name: "João Silva", role: "Operador I" },
    ];

    // Verificar se já existe uma sessão ativa
    if (sessionStorage.getItem("user")) {
        redirectToDashboard();
    }

    // Evento de login
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = formLogin.querySelector("input[placeholder='Login']").value;
        const password = formLogin.querySelector("input[placeholder='Senha']").value;

        // Verifica os dados do usuário
        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            // Salva os dados do usuário na sessão
            sessionStorage.setItem("user", JSON.stringify(user));

            // Redireciona para o painel
            redirectToDashboard();
        } else {
            alert("Usuário ou senha inválidos!");
        }
    });

    // Função para redirecionar ao painel de controle
    function redirectToDashboard() {
        window.location.href = "./PainelControle.html"; // Nome da sua página de painel de controle
    }
});
