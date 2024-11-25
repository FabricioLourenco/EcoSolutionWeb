function gerarToken() {
    const dados = {
        estacaoId: 1517,
        chaveSecreta: "1F9D3FBFAD75C93745259F202DDD1EC8C7C9FDE3"
    };

    fetch('https://localhost:7214/api/v1/Autenticacao/token', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'vx-api-key': 'FB4094C80D1E2FE51D931A9726C134DACCD8197B439E33079C20BB9F98D01260'  // API Key no cabeçalho
        },
        body: JSON.stringify(dados), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json(); // Converte a resposta em JSON
    })
    .then(data => {
        if (data.sucesso) {
            const token = data.data.bearerToken; 
            console.log("Token gerado com sucesso:", token);

            // Armazena o token no localStorage
            localStorage.setItem("bearerToken", token);
        
            alert("Token gerado com sucesso!");
        } else {
            console.error("Erro ao gerar o token:", data.mensagens);
            alert("Erro ao gerar o token. Verifique a resposta do servidor.");
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Falha na requisição. Verifique sua conexão e tente novamente.");
    });
}

window.onload = function() {
    gerarToken(); // Chama a função para gerar o token quando a página for carregada
};
