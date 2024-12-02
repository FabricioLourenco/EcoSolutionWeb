
const GerarToken = (() => {
    /**
     * Gera um novo token e o armazena no localStorage junto com o tempo de expiração.
     * @param {function} callback - Função a ser executada após o token ser gerado.
     */
    function gerarToken(callback) {
        const dados = {
            estacaoId: 1517,
            chaveSecreta: "1F9D3FBFAD75C93745259F202DDD1EC8C7C9FDE3"
        };

        fetch('https://localhost:7214/api/v1/Autenticacao/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'FB4094C80D1E2FE51D931A9726C134DACCD8197B439E33079C20BB9F98D01260'
            },
            body: JSON.stringify(dados),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.sucesso) {
                    const token = data.data.bearerToken;
                    const expiresIn = new Date(data.data.expiresIn).getTime();

                    // Armazenar o token e a validade no localStorage
                    localStorage.setItem("bearerToken", token);
                    localStorage.setItem("tokenExpiresIn", expiresIn);

                    console.log("Token gerado com sucesso:", token);
                    if (callback) callback(token);
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

    /**
     * Obtém o token armazenado, verificando sua validade.
     * Se o token expirou ou não existe, gera um novo.
     * @param {function} callback - Função a ser executada com o token válido.
     */
    function obterToken(callback) {
        const token = localStorage.getItem("bearerToken");
        const tokenExpiresIn = localStorage.getItem("tokenExpiresIn");

        const agora = new Date().getTime();

        if (!token || !tokenExpiresIn || agora >= tokenExpiresIn) {
            console.log("Token expirado ou não encontrado. Gerando novo token...");
            gerarToken(callback);
        } else {
            console.log("Token válido encontrado:", token);
            if (callback) callback(token);
        }
    }

    // Exponha as funções que deseja usar globalmente
    return {
        gerarToken,
        obterToken
    };
})();
