const usuarios = [
    { login: "admin", senha: "123456" },
    { login: "usuario", senha: "senha123" }
];


function autenticar(event) {
    event.preventDefault();

    const loginInput = document.querySelector('input[placeholder="Login"]').value;
    const senhaInput = document.querySelector('input[placeholder="Senha"]').value;

    const usuarioValido = usuarios.find(
        (usuario) => usuario.login === loginInput && usuario.senha === senhaInput
    );

    if (usuarioValido) {

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
        window.location.href = "/html/agenda.html";
    } else {
        alert("Login ou senha inválidos!");
    }
}


function verificarSessao() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
        window.location.href = "/html/agenda.html";
    }
}

// Adiciona evento ao carregar a página de login
document.addEventListener("DOMContentLoaded", () => {
    verificarSessao();
    const form = document.querySelector("form");
    form.addEventListener("submit", autenticar);
});
