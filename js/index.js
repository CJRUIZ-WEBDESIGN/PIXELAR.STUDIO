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
                      </p>
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


/* SCROLLED PAGE */

window.addEventListener('scroll', function() {
  let header = document.querySelector('.bg-body-tertiary');
  if (window.scrollY > 50) { // Puedes ajustar este valor
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

window.addEventListener('scroll', function () {
  const elements = document.querySelectorAll('.hidden');
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);

  elements.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add('visible');
      element.classList.remove('hidden');
    }
  });
});


/* nav lateral */
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.dot');

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          scrollToSection(e.target.getAttribute('data-section'));
      });
  });

  // Evento para actualizar el punto activo al desplazarse
  window.addEventListener('scroll', () => {
      updateActiveDot();
  });

  // Función para actualizar el punto activo inicialmente
  updateActiveDot();
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      window.scrollTo({
          top: section.offsetTop,
          behavior: 'instant'
      });
  }
}

function updateActiveDot() {
  const sections = ['inicio', 'trabajo', "acordion", 'nosotros',  "servicios", "contacto"];
  let currentSection = sections[0];

  sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);
      if (section && window.scrollY >= section.offsetTop) {
          currentSection = sectionId;
      }
  });

  document.querySelectorAll('.dot').forEach((dot, index) => {
      if (dot.getAttribute('data-section') === currentSection) {
          dot.classList.add('dot-active');
      } else {
          dot.classList.remove('dot-active');
      }
  });
}
window.addEventListener('scroll', updateActiveDot);

/* VOLVER ARRIBA */

window.onscroll = scrollFunction;

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("backToTop").style.display = "block";
    } else {
      document.getElementById("backToTop").style.display = "none";
    }
  }

  document.getElementById("backToTop").addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  /* Comportamiento de los enlaces del responsive. */

/*   document.addEventListener('DOMContentLoaded', function() {
    // Obtiene todos los elementos "a" dentro del contenedor del menú colapsable.
    let navbarLinks = document.querySelectorAll('#navbarSupportedContent a.nav-link');

    // Agrega un escuchador de evento para cada enlace.
    navbarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            let navbarToggler = document.querySelector('.navbar-toggler');
            
            // Verifica si el menú está siendo mostrado.
            if(!navbarToggler.classList.contains('collapsed')) {
                // Emula un click en el botón para colapsar el menú.
                navbarToggler.click();
            }
        });
    });
});
 */
document.addEventListener('DOMContentLoaded', function() {
  // Obtiene todos los elementos "a" dentro del contenedor del menú colapsable.
  let navbarLinks = document.querySelectorAll('#navbarSupportedContent a.nav-link');
  
  // Obtiene el botón del carrito de compras.
  let cartButton = document.getElementById('#cart-button');

  // Función para colapsar el menú.
  const collapseMenu = () => {
    let navbarToggler = document.querySelector('.navbar-toggler');

    // Verifica si el menú está siendo mostrado (puedes omitir esta parte si siempre deseas colapsar el menú).
    if (!navbarToggler.getAttribute('aria-expanded') || navbarToggler.getAttribute('aria-expanded') === 'true') {
      navbarToggler.click();
    }
  };

  // Agrega un escuchador de evento para cada enlace.
  navbarLinks.forEach((link) => {
    link.addEventListener('click', () => {
      collapseMenu();
    });
  });

  // Agrega un escuchador de evento para el botón del carrito.
  cartButton.addEventListener('click', () => {
    // Suponiendo que tienes una función llamada "mostrarCarrito" que se encarga de mostrar el carrito de compras.
    mostrarServiciosCarrito();
    collapseMenu();
  });
});

