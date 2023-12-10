const URL = "js/servicios.json";
const carrito = [];
const servicios = [];

async function getServiciosAsync() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        servicios.push(...data); // Esto añade los elementos de 'data' a 'servicios'
    } catch (error) {
        console.error("Error al cargar los servicios:", error);
    }
    cargarServicios();
}


// Asegúrate de que esta función cree el HTML basado en la variable global `servicios`
function cargarServicios() {
    const container = document.getElementById("servicios-container");
    servicios.forEach(servicio => {
        container.innerHTML += crearTarjeta(servicio);
    });
    // Cualquier otra lógica necesaria
}

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonCarrito')) {
        const servId = event.target.dataset.id;
        const servicio = servicios.find(serv => serv.id === servId);
        if (servicio) {
            agregarAlCarrito(servicio);
        } else {
            console.error('Servicio no encontrado con ID:', servId);
        }
    }
});

function agregarAlCarrito(idServicio) {
    const servicio = servicios.find(servicio => servicio.id === idServicio);

    if (!servicio) {
        console.error('Servicio no encontrado con ID:', idServicio);
        return;
    }
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

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonCarrito')) {
        const servId = event.target.dataset.id;
        const servicio = servicios.find(serv => serv.id === servId);
        if (servicio) {
            agregarAlCarrito(servicio);
        } else {
            console.error('Servicio no encontrado con ID:', servId);
        }
    }
});


