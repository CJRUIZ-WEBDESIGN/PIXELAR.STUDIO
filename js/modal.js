

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

async function eliminarProducto(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(event.target.dataset.index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha eliminado el producto del carrito'
      })

    mostrarServiciosCarrito();
}

const botonFinalizar = document.querySelector('.finalizar-compra');
if (botonFinalizar) {
    botonFinalizar.addEventListener('click', finalizarCompra);
}

async function finalizarCompra() {
    const pasos = ['1', '2']
    const finCompra = Swal.mixin({
        progressSteps: pasos,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: { backdrop: 'swal2-noanimation' },
        hideClass: { backdrop: 'swal2-noanimation' }
    })
    await finCompra.fire({
        title: '<b>Su compra finalizo con exito!</b> Muchas gracias por visitarnos',
        currentProgressStep: 0,
        showClass: { backdrop: 'swal2-noanimation' },
    })
    await finCompra.fire({
        title: '<b>CR Diseño Web</b> Le agradece por su Visita!',
        currentProgressStep: 2,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        showClass: { backdrop: 'swal2-noanimation' },
    })
    localStorage.removeItem("carrito");

    window.location.href = "index.html"

    mostrarServiciosCarrito();
}


// incluido funciones eliminarProducto y finalizarCompra
mostrarServiciosCarrito()
