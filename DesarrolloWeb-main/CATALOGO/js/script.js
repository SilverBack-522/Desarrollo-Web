// Cargar Header y Footer dinámicamente
async function loadComponent(path, containerId) {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
}

// Inicializar componentes
loadComponent('components/header/header.html', 'header-container');
loadComponent('components/footer/footer.html', 'footer-container');

// ------------------ Web Component ------------------
class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('nombre');
        const price = this.getAttribute('precio');
        const desc = this.getAttribute('descripcion');

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 200px;
                    text-align: center;
                    background-color: #fff;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                }
                .card:hover {
                    transform: scale(1.05);
                }
                .card h3 {
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }
                .card p {
                    color: #555;
                    font-size: 0.9rem;
                }
                .card span {
                    font-weight: bold;
                    color: #f39c12;
                    display: block;
                    margin-top: 0.5rem;
                }
            </style>
            <div class="card">
                <h3>${name}</h3>
                <p>${desc}</p>
                <span>$${price}</span>
            </div>
        `;
    }
}

customElements.define('product-card', ProductCard);

// ------------------ Array de Productos ------------------
const productos = [
    {
        nombre: "Guitarra Eléctrica",
        precio: 1200,
        descripcion: "Perfecta para rock y blues."
    },
    {
        nombre: "Batería Acústica",
        precio: 1500,
        descripcion: "Sonido potente y claro."
    },
    {
        nombre: "Bajo electrico",
        precio: 900,
        descripcion: "Ideal para producción musical."
    }
];

// Renderizar productos en el catálogo
const productList = document.getElementById('product-list');
productos.forEach(prod => {
    const card = document.createElement('product-card');
    card.setAttribute('nombre', prod.nombre);
    card.setAttribute('precio', prod.precio);
    card.setAttribute('descripcion', prod.descripcion);
    productList.appendChild(card);
});