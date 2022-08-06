const products = [{
    id: 0,
    nombre: "MSI Nvidia GeForce RTX 3080 VENTUS 3X PLUS 10GB GDDR6X OC LHR",
    precio: 193390,
    imgSrc: "./assets/img/1614779151_placa-de-video-msi-nvidia-geforce-rtx-3080-ventus-3x-oc-10gb-gddr6x.png",
  },
  {
    id: 1,
    nombre: "AMD Radeon PowerColor Rx 6650 XT Red Devil 8GB GDDR6",
    precio: 98638,
    imgSrc: "./assets/img/Placa de Video AMD Radeon PowerColor Rx 6650 XT Red Devil 8GB GDDR6.jpg",
  },
  {
    id: 2,
    nombre: "PNY Nvidia Geforce RTX 3070 Ti XLR8 REVEL EPIC-X RGB 8GB GDDR6 LHR",
    precio: 175036,
    imgSrc: "./assets/img/PNY Nvidia Geforce RTX 3070 Ti XLR8 REVEL EPIC-X RGB 8GB GDDR6 LHR.jpg",
  },
  {
    id: 3,
    nombre: "Palit Nvidia Geforce GTX 1660 Super GP 6GB GDDR6",
    precio: 68991,
    imgSrc: "./assets/img/Palit Nvidia Geforce GTX 1660 Super GP 6GB GDDR6.png",
  },
  {
    id: 4,
    nombre: "MSI Nvidia Geforce RTX 3060 Ti GAMING X 8GB GDDR6 LHR",
    precio: 124898,
    imgSrc: "./assets/img/MSI Nvidia Geforce RTX 3060 Ti GAMING X 8GB GDDR6 LHR.jpg",
  },
];

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subTotalEl = document.querySelector('.subTotal');
const removeButton = document.querySelectorAll('.removeButton')
const darkModeButton = document.getElementById('switch');
const mostSold = document.querySelector('.mostSold')
const contadorDeItems = document.querySelector('.contador-carrito')
const toDark = document.getElementById('toDark')



let cart = JSON.parse(localStorage.getItem('CART')) || []; 
actualizarCarrito();

function renderizarProducts() {
  products.forEach((product) => {   
    productsEl.innerHTML += `
    <div class="item">
    <div class="item-container" class="item-flex"> 
        <div>
            <img src="${product.imgSrc}" alt="">
        </div>
        <div class="description">
            <div class="prodname">
                <h4>${product.nombre}</h4>
            </div>
            <div class="data">
                <h4> $ ${product.precio}</h4>
            
                <p class="add-to-cart" onclick="addToCart(${product.id})">Agregar al carrito</p>
            </div>
        </div>
    </div>
</div>
    `
  }) 
}
renderizarProducts();

function addToCart(id) { 

  if (cart.some((item) => item.id === id)) {
    callToast() 
  } else { 
    callToast2()
    const item = products.find((product) => product.id === id); 
    cart.push({
      ...item,
      cantidad: 1, 
    })
  }
  actualizarCarrito()
};

function actualizarCarrito() {
  renderizarItemsCarrito();
  renderizarSubTotal();
  localStorage.setItem('CART', JSON.stringify(cart)); 
}

function renderizarItemsCarrito() {
  cartItemsEl.innerHTML = ""; 
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <div class="cart-item"> 
            <div class="info">
            <div class="item-img"  src="${item.imgSrc}" alt="${item.nombre}"></div>
            <h4>${item.nombre}</h4>  
        </div>
        <div class="price">
            <h4> $ ${item.precio}</h2>
        </div>
        <div class="cantidad">
            <div class="btnm" onclick="elegirUnidades('restar', ${item.id})">-</div>
            <p>${item.cantidad}</p>
            <div class="btnm" onclick="elegirUnidades('sumar', ${item.id})">+</div>
        </div>
        <div>
            <input type="button" class="removeButton" onclick="removeFromCart(${item.id})" value="X">
        </div>
    </div>  
    `
  })
};

function elegirUnidades(acc, id) {
  cart = cart.map((item) => {
    let unidadesEnCarrito = item.cantidad
    if (item.id === id) {
      if (acc === 'restar' && unidadesEnCarrito > 1) { 
        unidadesEnCarrito--
      } else if (acc === 'sumar') {
        unidadesEnCarrito++
      }
    };
    return {
      ...item, 
      cantidad: unidadesEnCarrito,
      
    };
  })
  actualizarCarrito(); 
};


function renderizarSubTotal() {
  let precioTotal = 0;
  let totalDeItems = 0;
  cart.forEach((item) => {
    precioTotal += item.precio * item.cantidad;
    totalDeItems += item.cantidad;
  })
  subTotalEl.innerHTML = ''; 
  subTotalEl.innerHTML += `
  Subtotal: $${precioTotal}
  <input type="button" value="Comprar!" onclick="realizarCompra()">
  `
  contadorDeItems.innerHTML = `<p>${totalDeItems}</p>`
};

function removeFromCart(id) { 
  cart = cart.filter((item) => item.id !== id) 
  actualizarCarrito();
};

function realizarCompra() {
  cartItemsEl.innerHTML = ``;
  subTotalEl.innerHTML = `<p>Subtotal: $</p>`;
  Swal.fire({ 
    position: 'center',
    icon: 'success',
    title: 'Gracias por tu compra!',
    showConfirmButton: false,
    timer: 1500
  })
  cart = [];
  contador = [];
  actualizarCarrito();
};

////fetch////

fetch("./assets/products.json")
  .then((resp) => resp.json())
  .then((productos) => {
    productos.forEach((prod) => {
      mostSold.innerHTML += `
                              <div class="mostSoldItem">
                              <div class="mostSoldImg">
                              <img src="${prod.imgSrc}" alt="">
                              </div>
                              <div class="titlecont">
                              <h5>${prod.nombre}</h5>
                              </div>
                              <p>$ ${prod.precio}</p>
                              <div class="mostSoldLink">
                              <a href="#">Ver!</a>
                              </div>
                              </div>
                              `
    })
  });


///// dark mode ////
darkModeButton.addEventListener('click', turnToDark);

function turnToDark() {
  document.body.classList.toggle('dark');
  document.body.classList.contains('dark') ? localStorage.setItem('darkMode', 'true') : (localStorage.setItem('darkMode', 'false'));
};
if (localStorage.getItem('darkMode') === 'true') { 
  document.body.classList.add('dark')
};

//// toastify ////
function callToast() {
  Toastify({
    text: "Ya esta en el carrito",
    duration: 3000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ff0000, #d84f00)",
    },
    onClick: function () {}
  }).showToast();
};

function callToast2() {
  Toastify({
    text: "Nuevo item en el carrito",
    duration: 1500,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #5AE664, #5AC864)",
    },
    onClick: function () {}
  }).showToast();
};