const URL = "js/productos.json"
const carrito = [];
const productos = [];

async function getProductosAsync() {
    const response = await fetch(URL)
    const data = await response.json()
    productos.push(...data)
    cargarProductos()
}

const container = document.querySelector("#container");
const buscarBtn = document.querySelector("#buscarBtn");
const busquedaInput = document.querySelector("#busquedaInput");
const carritoContainer = document.querySelector("#carritoContainer");
const vaciarCarritoBtn = document.querySelector('#vaciarCarritoBtn');

function cardReturn(producto) {
    return `<div class="productDiv">
                <h3 class="productos__h2">${producto.nombre}</h3>
                <img src="${producto.img}" class="imagProduc" alt="Imagen Ilustrativa">
                <p class="productos__precio">$ ${producto.precio}</p>
                <button class="botonCarrito" id="boton${producto.id}">Comprar</button>
            </div>`;
  }