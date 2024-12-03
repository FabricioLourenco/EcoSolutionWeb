function inserirMateriais(){
    GerarToken.obterToken(token => {
        fetch('https://localhost:7214/api/v1/Material/inserir-material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
            }
        })
        .then(response => {

    });
})}