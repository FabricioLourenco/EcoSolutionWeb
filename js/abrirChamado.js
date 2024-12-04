document.addEventListener("DOMContentLoaded", () => {
    const abrirChamadoBtn = document.getElementById("btnAbrirChamado"); // Seleciona o botão pelo ID

    if (abrirChamadoBtn) {
        abrirChamadoBtn.addEventListener("click", () => {
            const phoneNumber = "5549991782992"; // Substitua pelo número de telefone desejado
            const message = encodeURIComponent("Olá, estou abrindo um chamado para relatar um problema na estação."); // Mensagem inicial
            const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

            window.open(whatsappUrl, "_blank");
        });
    } else {
        console.error("Botão Abrir Chamado não encontrado!");
    }
});
