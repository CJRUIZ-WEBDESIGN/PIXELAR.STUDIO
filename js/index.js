const container = document.querySelector("#container");
const buscarBtn = document.querySelector("#buscarBtn");
const busquedaInput = document.querySelector("#busquedaInput");
const carritoContainer = document.querySelector("#carritoContainer");
const vaciarCarritoBtn = document.querySelector('#vaciarCarritoBtn');
const gridContainer = document.querySelector('.grid-container');

function cardReturn(servicio) {
  return `   <div class="grid-container">


        <div class="card">

            <div class="card__details">
                <div class="card__side card__side--front-1">
                    <div class="card__title card__title--1">
                        <img src="${servicio.img}" class="imagProduc" alt="Imagen Ilustrativa">
                        <h4 class="card__heading">${servicio.nombre}</h4>
                    </div>
                    <ul>
                        <li>${servicio.correo}</li>
                        <li>${servicio.dominio}</li>
                        <li>${servicio.hosting}</li>
                        <li>${servicio.ssl}</li>
                        <li>${servicio.responsive}</li>
                        <li>${servicio.section}</li>
                        <li>${servicio.mapa}</li>
                        <li>${servicio.wsp}</li>
                        <li>${servicio.seo}</li>
                        <li>${servicio.formulario}</li>
                    </ul>
                </div>

            </div>
            <div class="card__side card__side--back card__side--back-1">
                <div class="card__cta">
                    <div class="card__price-box">
                        <li class="p-det">${servicio.descripcion}</li>

                        <p class="card__price-value">$ ${servicio.precio}</p>
                    </div>
         
                    <li class="p-det">Desarrollado con tecnologia:</li>
                    
                <div class="container-skill skill__class">

                    <div class="skill__class--icons1">
                        <li><i class="fa-brands fa-html5"></i></li>
                        </div>

                    <div class="skill__class--icons2">
                        <li><i class="fa-brands fa-css3"></i></li>

                    </div>

                    <div class="skill__class--icons3">
                        <li><i class="fa-brands fa-js"></i></li>

                    </div>
                </div>

                    <button class="botonCarrito btn btn--white" data-id="${servicio.id}">COMPRAR</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  
`;
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarServiciosCarrito();
  let timerInterval
  Swal.fire({
    title: 'Vaciando Carrito!',
    html: 'El carrito se vaciara en <b></b> milisegundos.',
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  })
}
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

buscarBtn.addEventListener("click", () => {
  const searchTerm = busquedaInput.value.toLowerCase().trim();
  const resultados = servicios.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(searchTerm));
 
  container.innerHTML = resultados.length > 0 ? resultados.map(servicio => cardReturn(servicio)).join("") : "<b>No se encontraron productos.</b>";
});
