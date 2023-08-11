const URL = "js/servicios.json"
const carrito = [];
const servicios = [];


function cargarServicios() {
    container.innerHTML = "";
    servicios.forEach((servicio) => {
        container.innerHTML += cardReturn(servicio);
    });
}
 
async function getServiciosAsync() {
    const response = await fetch(URL)
    const data = await response.json() 
    servicios.push(...data)
    cargarServicios()
}
getServiciosAsync()

function agregarAlCarrito(servicio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let servicioEncontrado = carrito.find(serv => serv.id === servicio.id);
    if (servicioEncontrado) {
        servicioEncontrado.cantidad++;
    } else {
        servicio.cantidad = 1;
        carrito.push(servicio);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
        title: 'Agregado al Carrito!',
        text: `Agregaste ${servicio.nombre} correctamente.`,
        imageUrl: `${servicio.img}`,
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: 'Imagen de Producto',
        showClass: {
            popup: 'fondo_oscuro animate__animated animate__backInDown'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        hideClass: {
            popup: 'fondo_oscuro animate__animated animate__backOutDown'
        }
    })
    mostrarServiciosCarrito();
}

async function eliminarProducto(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(event.target.dataset.index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
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

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonCarrito')) {
        const servId = event.target.dataset.id;
        const servicio = servicios.find((servicio) => servicio.id === (servId));
        agregarAlCarrito(servicio);
    }
});
const botonFinalizar = document.querySelector('.finalizar-compra');
if (botonFinalizar) {
    botonFinalizar.addEventListener('click', finalizarCompra);
}

async function finalizarCompra() {
    const pasos = ['1', '2']
    const finCompra = Swal.mixin({
        progressSteps: pasos,
        showConfirmButton: false,
        timer: 2800,
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

cargarServicios()


let cartcontainer = document.querySelector(".producto")

//funcion

cargarListeners()
function cargarListeners() {
    carritoContainer.addEventListener("click", agregarProducto);
}

function agregarProducto(e){
    console.log()
}