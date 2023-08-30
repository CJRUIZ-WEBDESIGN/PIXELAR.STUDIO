

function mostrarServiciosCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let carritoDetalle = "";
    let total = 0;

    if (carrito.length > 0) {
        carrito.forEach((servicio, index) => {
            carritoDetalle += `
                <div class="carritoItem">
                    <img src=" ${servicio.img}" alt="...">
                    <p><b>ID: </b> ${servicio.id}</p>
                    <p><b>NOMBRE: </b> ${servicio.nombre}</p>
                    <p><b>PRECIO: </b>$ ${servicio.precio}</p>
                    <button class="eliminar" data-index="${index}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>`;
            total = servicio.precio;
        });
        carritoDetalle += `
                <p class="total">TOTAL: $${total}</p>`;
    } else {
        carritoDetalle = "<b>El carrito está vacío.</b>";
    }
    document.getElementById('cart-button').addEventListener('click', function () {
        mostrarServiciosCarrito();
        document.getElementById('cart-modal').style.display = 'block';
    });
    document.getElementsByClassName('close-button')[0].addEventListener('click', function () {
        document.getElementById('cart-modal').style.display = 'none';
    });
    window.addEventListener('click', function (event) {
        let modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }

    });

    document.querySelector('.carritoContainer').innerHTML = carritoDetalle;
    document.querySelectorAll('.eliminar').forEach(button => button.addEventListener('click', eliminarServicio));
    document.querySelector('.finalizar-compra').addEventListener('click', finalizarCompra);
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('seguirCompraBtn').addEventListener('click', function() {
            window.location.href = "index.html";
        });
    });
    
}

mostrarServiciosCarrito()

async function eliminarServicio(event) {
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
        title: 'EL SERVICIO HA SIDO ELIMINADO DEL CARRITO'
    })

    mostrarServiciosCarrito();
}

const botonFinalizar = document.querySelector('.finalizar-compra');
if (botonFinalizar) {
    botonFinalizar.addEventListener('click', finalizarCompra);
}
document.querySelector('.finalizar-compra').addEventListener('click', finalizarCompra);


async function finalizarCompra() {

    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    let carritoTabla = 'Detalles del Carrito:\n';
    carrito.forEach(servicio => {
        carritoTabla += `Nombre del Servicio: ${servicio.nombre}\n  Cantidad: ${servicio.cantidad}\n  Precio: ${servicio.precio}\n\n`;
    });
    

    let modalHTML = `
        <div id="contact-modal-fin" class="modal-fin">

            <div class="modal-content-fin">

                <span class="close-button-fin" id="close-contact-modal-fin">&times;</span>

                <h1 class="h1-fin">Finalizando la Compra</h1>

                <div class="formu">

                    <p class="p-fin">Por favor, complete el siguiente formulario para finalizar la compra:</p>

                    <form class="form-fin" action="https://formsubmit.co/b8de3035ad7d73811be0ce0ae8805a72" method="POST">

                    <input type="hidden" name="carrito" value="${carritoTabla}">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_next" value="https://cr-diseñoweb.com.ar">

                        <label for="nombre">Nombre y Apellido</label>
                        <input type="text" name="name" required>

                        <label for="email">Correo Electronico</label>
                        <input type="email" name="email" required>

                        <label for="tel">Numero de Telefono</label>
                        <input type="tel" name="tel" required>

                        <label for="payment">Como desea abonar</label>

                        <select name="payment" required>
                            <option value="tarjeta-credito">Tarjeta de Crédito</option>
                            <option value="transferencia-bancaria">Transferencia Bancaria</option>
                            <option value="mercado-pago">Mercado Pago</option>
                            <option value="efectivo">Efectivo</option>
                        </select>

                        <textarea class="text-area" placeholder="Escriba aqui su mensaje" class="form-control" name="message" rows="15" required></textarea>
                        
                        <button class="submit-fin" type="submit">Enviar petición</button>
                    </form>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.querySelector('#contact-modal-fin').style.display = "block";
    document.querySelector('.modal-fin').style.display = "none";

    document.querySelector('#close-contact-modal-fin').addEventListener('click', () => {
        document.querySelector('#contact-modal-fin').style.display = "none";
    });

    ///////////

    let modalFin = document.querySelector('#contact-modal-fin');
    let modalContentFin = document.querySelector('.modal-content-fin');

    modalFin.style.display = "block";

    function handleClose() {
        Swal.fire({
            title: '¿Deseas abandonar el formulario? ',
            text: "Deberas seleccionar nuevamente el servicio.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#393646',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar con la compra',
            cancelButtonText: 'Salir de la compra'
        }).then((result) => {
            if (!result.isConfirmed) {
                document.querySelector('#contact-modal-fin').style.display = "none";
            } else {
                document.querySelector('#contact-modal-fin').style.display = "block";

            }
        });
    }

    document.querySelector('#close-contact-modal-fin').addEventListener('click', handleClose);

    modalFin.addEventListener('click', function (e) {
        if (e.target === modalFin) {
            handleClose();
        }
    });

    modalContentFin.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    localStorage.removeItem("carrito");
    mostrarServiciosCarrito()
}

