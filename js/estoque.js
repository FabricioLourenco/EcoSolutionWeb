const stockItems = [
    {
        title: "Produto 1",
        description: "Descrição do produto 1",
        quantity: 50,
        unit: "Litros",
        image: "https://via.placeholder.com/150"
    },
    {
        title: "Produto 2",
        description: "Descrição do produto 2",
        quantity: 30,
        unit: "Quilos",
        image: "https://via.placeholder.com/150"
    },
    {
        title: "Produto 3",
        description: "Descrição do produto 3",
        quantity: 70,
        unit: "Unidades",
        image: "https://via.placeholder.com/150"
    },
    {
        title: "Produto 4",
        description: "Descrição do produto 4",
        quantity: 25,
        unit: "Caixas",
        image: "https://via.placeholder.com/150"
    },
    {
        title: "Produto 5",
        description: "Descrição do produto 5",
        quantity: 25,
        unit: "Caixas",
        image: "https://via.placeholder.com/150"
    }
];

function createProductCard(item) {
    return `
        <div class="col">
            <div class="card bg-dark text-white">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>Quantidade:</strong> ${item.quantity} ${item.unit}</p>
                </div>
            </div>
        </div>
    `;
}

function loadStockItems() {
    const container = document.getElementById("stock-cards-container");
    stockItems.forEach(item => {
        container.innerHTML += createProductCard(item);
    });
}

document.addEventListener("DOMContentLoaded", loadStockItems);
