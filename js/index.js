const container = document.querySelector("#container");
const buscarBtn = document.querySelector("#buscarBtn");
const busquedaInput = document.querySelector("#busquedaInput");
const carritoContainer = document.querySelector("#carritoContainer");
const vaciarCarritoBtn = document.querySelector("#vaciarCarritoBtn");
const gridContainer = document.querySelector(".grid-container");
const serviciosContainer = document.querySelector("#servicios-container");

function crearTarjeta(servicio) {
  return `
      <div class="tarjeta">
          <img src="${servicio.img}" alt="Imagen de ${servicio.nombre}">
          <h3>${servicio.nombre}</h3>
          <p>${servicio.descripcion}</p>
          <button onclick="mostrarModal('${servicio.id}')">Ver Más</button>
      </div>
  `;
}

function mostrarModal(idServicio) {
  const servicio = servicios.find((s) => s.id === idServicio);
  if (!servicio) {
    console.error("Servicio no encontrado");
    return;
  }

  const modal = document.getElementById("modal");
  modal.innerHTML = `
               <div class="modal-content">
               <span class="close-button" onclick="cerrarModal()">&times;</span>
               <div class="servicio-contenedor">
               <img class="card-img" src="${servicio.img}" alt="${servicio.nombre}">
               <h2 class="nombre-servicio">${servicio.nombre}</h2>
              </div>
               <p>${servicio.descripcion}</p>
               <table>
                   <tr>
                       <th>Servicio</th>
                       <th>Detalles</th>
                   </tr>
                   <tr>
                       <td>Correo</td>
                       <td>${servicio.correo}</td>
                   </tr>
                   <tr>
                       <td>Dominio</td>
                       <td>${servicio.dominio}</td>
                   </tr>
                   <tr>
                       <td>Hosting</td>
                       <td>${servicio.hosting}</td>
                   </tr>
                   <tr>
                       <td>SSL</td>
                       <td>${servicio.ssl}</td>
                   </tr>
                   <tr>
                       <td>Responsive</td>
                       <td>${servicio.responsive}</td>
                   </tr>
                   <tr>
                       <td>Secciones</td>
                       <td>${servicio.section}</td>
                   </tr>
                   <tr>
                       <td>Mapa</td>
                       <td>${servicio.mapa}</td>
                   </tr>
                   <tr>
                      <td>WhatsApp</td>
                     <td>${servicio.wsp}</td>
                  </tr>
                                 <tr>
                     <td>Formulario</td>
                      <td>${servicio.formulario}</td>
                  </tr>
                 <tr>
                     <td>Precio:</td>
                     <td class="td-precio"><b>$ ${servicio.precio}</b></td>
                 </tr>
                          
                <div class="container-skill skill__class">
  <p>Trabajamos con las tecnologias:</p>
                <div class="skill__class--icons1">
                    <li><i class="fa-brands fa-html5"></i></li>
                    <h5>HTML</h5>
                    </div>

                <div class="skill__class--icons2">
                    <li><i class="fa-brands fa-css3"></i></li>
                    <h5>CSS3</h5>

                </div>

                <div class="skill__class--icons3">
                    <li><i class="fa-brands fa-js"></i>
                    <h5>JAVASCRIPT</h5>
         

             </div>
                 <!-- Continúa agregando filas según sea necesario -->
              </table>
              <button class="botonCarrito" onclick="agregarAlCarrito('${servicio.id}')">CONTRATAR</button>
              </div>

        `;
  modal.style.display = "block";
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarServiciosCarrito();
  let timerInterval;
  Swal.fire({
    title: "ELIMINANDO SERVICIO DEL CARRITO...",
    html: "En <b></b> Milisegundos.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
}
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

buscarBtn.addEventListener("click", () => {
  const searchTerm = busquedaInput.value.toLowerCase().trim();
  const resultados = servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(searchTerm)
  );

    serviciosContainer.innerHTML = resultados.map(servicio => crearTarjeta(servicio)).join("");

});


/* SCROLLED PAGE */

window.addEventListener("scroll", function () {
  let header = document.querySelector(".bg-body-tertiary");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".hidden");
  const windowTop = window.pageYOffset + (window.innerHeight * 3) / 4;

  elements.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add("visible");
      element.classList.remove("hidden");
    }
  });
});

/* nav lateral */
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      scrollToSection(e.target.getAttribute("data-section"));
    });
  });

  window.addEventListener("scroll", () => {
    updateActiveDot();
  });

  updateActiveDot();
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "instant",
    });
  }
}

function updateActiveDot() {
  const sections = [
    "inicio",
    "trabajo",
    "acordion",
    "nosotros",
    "servicios",
    "contacto",
    "footer",
  ];
  let currentSection = sections[0];

  sections.forEach((sectionId, index) => {
    const section = document.getElementById(sectionId);
    if (section && window.scrollY >= section.offsetTop) {
      currentSection = sectionId;
    }
  });

  document.querySelectorAll(".dot").forEach((dot, index) => {
    if (dot.getAttribute("data-section") === currentSection) {
      dot.classList.add("dot-active");
    } else {
      dot.classList.remove("dot-active");
    }
  });
}
window.addEventListener("scroll", updateActiveDot);

/* VOLVER ARRIBA */

window.onscroll = scrollFunction;

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  let navbarLinks = document.querySelectorAll(
    "#navbarSupportedContent a.nav-link"
  );

  let cartButton = document.getElementById("#cart-button");

  const collapseMenu = () => {
    let navbarToggler = document.querySelector(".navbar-toggler");

    if (
      !navbarToggler.getAttribute("aria-expanded") ||
      navbarToggler.getAttribute("aria-expanded") === "true"
    ) {
      navbarToggler.click();
    }
  };

  navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      collapseMenu();
    });
  });

  cartButton.addEventListener("click", () => {
    mostrarServiciosCarrito();
    collapseMenu();
  });
});

//Cerrar menu de navegacion al hacer click

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("navbarSupportedContent");
    const menuButton = document.getElementById("menuButton");
    const cartButton = document.getElementById("cart-button");

    const isOpen = menu.classList.contains("show");

    if (
      isOpen &&
      !menu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      menu.classList.remove("show");
    }

    if (isOpen && cartButton.contains(event.target)) {
      menu.classList.remove("show");
    }
  });
});
