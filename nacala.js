const form = document.getElementById('product-form');
const productsDiv = document.getElementById('products');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Função para exibir produtos
function displayProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;

    productsDiv.innerHTML = '';

    products
        .filter(p => 
            (p.name.toLowerCase().includes(searchText)) &&
            (selectedCategory === "" || p.category === selectedCategory)
        )
        .forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
            <h3>${product.name}</h3>
            <p><strong>Preço:</strong> ${product.price}</p>
            <p><strong>Categoria:</strong> ${product.category}</p>
            <p>${product.description}</p>
            <button onclick="contact('${product.contact}')">Contactar</button>
        `;
        productsDiv.appendChild(card);
    });
}

// Função para abrir WhatsApp
function contact(number) {
    window.open(`https://wa.me/${number}`, '_blank');
}

// Adicionar produto
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('image').files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function() {
            saveProduct(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveProduct('');
    }
});

function saveProduct(image) {
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        contact: document.getElementById('contact').value,
        image: image
    };
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    form.reset();
}

// Pesquisar produtos em tempo real
searchInput.addEventListener('input', displayProducts);
filterCategory.addEventListener('change', displayProducts);

// Inicializar
displayProducts();

