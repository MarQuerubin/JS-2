


const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

let allProducts = [];

const vaciarCarrito = () => {
    allProducts = [];
    showHTML(); 
    updateLocalStorage(); 
};

Swal.fire({
    position: "top-center",
    icon: "success",
    title: "BIENVENIDO A LUMOSMAXIMA",
    showConfirmButton: false,
    timer: 1550
});

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
    
    document.getElementById('boton-compra').addEventListener('click', async () => {
        vaciarCarrito();

        try {
            const response = await fetch( 'https://apifrases.esmeldy.com/api/frases/random', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Swal.fire({
                title: 'MUCHAS GRACIAS POR SU COMPRA!',
                text: data.frase,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un problema con su compra.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (cartProducts) {
        allProducts = cartProducts;
        showHTML();
    }
});

const updateLocalStorage = () => {
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));
};

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(item => item.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(item => {
                if (item.title === infoProduct.title) {
                    item.quantity++;
                    return item;
                } else {
                    return item;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
        updateLocalStorage();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(item => item.title !== title);
        showHTML();
    }
});

const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += parseInt(product.quantity * product.price.slice(1));
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};