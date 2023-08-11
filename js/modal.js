

function mostrarServiciosCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let carritoDetalle = "";
    let total = 0;
    
    if (carrito.length > 0) {
        carrito.forEach((servicio, index) => {
            carritoDetalle += `
                <div class="carritoItem">
                    <img src="${servicio.img}" alt="...">
                    <p><b>ID: </b>${servicio.id}</p>
                    <p><b>NOMBRE: </b>${servicio.nombre}</p>
                    <p><b>PRECIO: </b>$${servicio.precio}</p>
                    <p><b>CANTIDAD: </b>${servicio.cantidad}</p>
                    <button class="eliminar" data-index="${index}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>`;
            total += servicio.precio * servicio.cantidad;
        });
        carritoDetalle += `
                <p class="total">TOTAL: $${total}</p>`;
    } else {
        carritoDetalle = "<b>El carrito está vacío.</b>";
    }
    document.getElementById('cart-button').addEventListener('click', function() {mostrarServiciosCarrito();
    document.getElementById('cart-modal').style.display = 'block';});
    document.getElementsByClassName('close-button')[0].addEventListener('click', function() {
        document.getElementById('cart-modal').style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        let modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.querySelector('.carritoContainer').innerHTML = carritoDetalle;
    document.querySelectorAll('.eliminar').forEach(button => button.addEventListener('click', eliminarProducto));
    document.querySelector('.finalizar-compra').addEventListener('click', finalizarCompra);
}

mostrarServiciosCarrito()

// No olvides incluir tus funciones eliminarProducto y finalizarCompra

mostrarServiciosCarrito(); // Si quieres que se muestre inicialmente
