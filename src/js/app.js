let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Mostrar/ocultar secciones
  tabs(); // Cambia las secciones al presionar tabs
  botonesPaginador(); // Agrega o quita botones paginador
  paginaSiguiente();
  paginaAnterior();

  consultarAPI(); // Consulta API en el backend

  nombreCliente(); // Añade nombre de cliente a la cita
  seleccionarFecha(); // Añade la fecha de la cita
  seleccionarHora(); // Añade la Hora de la cita
}

function mostrarSeccion() {
  //Ocultar la seccion mostrar
  const seccionAnterior = document.querySelector(".mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }
  //Seleccionar la seccion/paso
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  //Quitar la clase actual al tab anterior
  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  //Color tab seleccionado
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);

      mostrarSeccion();

      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;

    botonesPaginador();
  });
}
function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;

    botonesPaginador();
  });
}

async function consultarAPI() {
  try {
    const url = "http://localhost:3000/api/servicios";
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;

    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `$${precio}`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add("servicio");
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio; // Extraigo 'id' del obj servicio
  const { servicios } = cita; // Extraigo 'servicios' del obj cita

  // Identificar elemento al que se da click
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  // Comprobar si un servicio ya fue seleccionado
  if (servicios.some((agregado) => agregado.id === id)) {
    // Eliminarlo
    cita.servicios = servicios.filter((agregado) => agregado.id !== id);
    divServicio.classList.remove("seleccionado");
  } else {
    // Agregarlo
    cita.servicios = [...servicios, servicio]; // Tomo una copia de 'servicios' y le agrego un nuevo servicio
    divServicio.classList.add("seleccionado");
    console.log(cita);
  }
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", function (e) {
    const dia = new Date(e.target.value).getUTCDay();
    const alertaPrevia = document.querySelector(".alerta");

    if ([6, 0].includes(dia)) {
      e.target.value = "";
      mostrarAlerta("Sabados y domingo cerrado", "error");
    } else {
      cita.fecha = e.target.value;
      if (alertaPrevia) {
        alertaPrevia.remove();
      }
    }
  });
}
function seleccionarHora(){
  const inputHora = document.querySelector('#hora');
  inputHora.addEventListener('input', function(e){
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    const alertaPrevia = document.querySelector(".alerta");
    if(hora < 9 || hora > 20){
      e.target.value = '';
      mostrarAlerta('Hora no válida', 'error');
    } else {
      cita.hora = e.target.value;
      if (alertaPrevia) {
        alertaPrevia.remove();
      }
      console.log(cita);
    }
  });
}

function mostrarAlerta(mensaje, tipo) {
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) return;

  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  const formulario = document.querySelector(".formulario");
  formulario.appendChild(alerta);

  // setTimeout(() => {
  //   alerta.remove();
  // }, 2000);
}
