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

const urlVelas = "./data.json"



const format_money = (money) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(money)
  
}


const vaciarCarrito = () => {
    allProducts = [];
    showHTML(); 
    updateLocalStorage(); 
};

const finalizarCompra = () => {
    vaciarCarrito();
    Swal.fire({
        title: 'MUCHAS GRACIAS POR SU COMPRA!',
        //text: data.frase,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

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
        

        try {
            /*
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
            */

            if (allProducts.length > 0) {
                
        

            const { value: formaPago } = await Swal.fire({
                title: "Seleccione una forma de pago",
                input: "select",
                inputOptions: {
                  efectivo: "Efectivo",
                  tarjetad: "Tarjeta débito",
                  tarjetac: "Tarjeta credito",
                },
                inputPlaceholder: "Forma de pago",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "Debe seleccionar una forma de pago para continuar!";
                      }
                }
              });

              if (formaPago == 'efectivo') {
                finalizarCompra();
                
              } else if (formaPago == 'tarjetad' || formaPago == 'tarjetac') {


                const { value: numero_tarjeta } = await Swal.fire({
                    title: "Ingrese su tarjeta",
                    input: "number",
                    inputLabel: "Complete los datos para finalizar la compra",
                    inputPlaceholder: "xxxx-xxxx-xxxx-xxxx",
                    inputValidator: (value) => {
                        if (!value) {
                            return "Debe completar los datos para continuar!";
                          }
                    }
                  });
                  
                  if (numero_tarjeta == undefined) {
                    Swal.fire({
                        title: 'Se cancelo la operacion!',
                        text: 'Por favor intente nuevamente',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                  } else {
                        finalizarCompra();
                  }

              }

            } else {

                Swal.fire({
                    title: 'Debe seleccionar al menos un producto!',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });

            }

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

productsList.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const result = await fetch(urlVelas)

        let velas = await result.json()
        let nombre = product.querySelector('h2').textContent

        let vela = velas.find(v => v.name == nombre)

        const infoProduct = {
            quantity: 1,
            title: vela.name,
            price: vela.price,
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

        total += parseFloat(product.quantity * product.price);
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = format_money(total);
    countProducts.innerText = totalOfProducts;
};



const showProducts = (items) => {
    items.forEach(product => {
        let card = document.createElement('div');

        card.innerHTML = `
            <div class="item">
				<figure>
					<img
						src="${product.image}"
						alt="producto"
					/>
				</figure>
				<div class="info-product">
					<h2>${product.name}</h2>
					<p class="price">${format_money(product.price)}</p>
					<button class="btn-add-cart">Añadir al carrito</button>
				</div>
			</div>
        `;

        productsList.append(card);
    });
}

fetch(urlVelas)
    .then(result => result.json())
    .then(data => showProducts(data)); 
