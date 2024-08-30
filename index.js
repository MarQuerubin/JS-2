const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
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
		
	

	  
	document.getElementById('boton-compra').addEventListener('click', function() {
		const vaciarCarrito = () => {
		allProducts = [];
		showHTML(); 
		updateLocalStorage(); };
  
		

		Swal.fire({
			title: 'MUCHAS GRACIAS POR SU COMPRA!',
			text: 'Nos contactaremos con usted a la brevedad',
			icon: 'success',
			confirmButtonText: 'OK'
			
		})

  



	   boton-compra.addEventListener('click', () => {
		vaciarCarrito();});
	  });

	 
	  
		
	  });
	



document.getElementById('boton-compra').addEventListener('click', () => {
	vaciarCarrito();
  });

let allProducts = [];
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

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
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

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

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

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;


	
	 });

	
	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;


};