const URL = "js/servicios.json";
const carrito = [];
let servicios = []; // Definida como variable global

function cargarServicios() {
    const container = document.getElementById("servicios-container");
    servicios.forEach(servicio => {
        container.innerHTML += crearTarjeta(servicio);
    });
    // Aquí cualquier otra lógica que dependa de los servicios cargados
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
  
    if (carrito.length > 0) {
        Swal.fire({
            title: 'CARRITO LLENO!',
            text: `Solo puedes contratar un servicio.`,
            icon: 'warning',
            showConfirmButton: true,
        });
        return;
    }

    servicio.cantidad = 1;
    carrito.push(servicio);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
        title: 'AGREGADO AL CARRITO!',
        text: `Se añadió ${servicio.nombre} correctamente.`,
        imageUrl: `${servicio.img}`,
        imageWidth: 350,
        imageHeight: 200,
        imageAlt: 'Imagen del Servicio',
        showClass: {
            popup: 'fondo_oscuro animate__animated animate__backInDown'
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        hideClass: {
            popup: 'fondo_oscuro animate__animated animate__backOutDown'
        }
    });

    mostrarServiciosCarrito();
}



/* container.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonCarrito')) {
        const servId = event.target.dataset.id;
        const servicio = servicios.find((servicio) => servicio.id === (servId));
        agregarAlCarrito(servicio);
    }
}); */


