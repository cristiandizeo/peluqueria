let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id: '',
  nombre: '',
  fecha: '',
  hora: '',
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

  idCliente();
  nombreCliente(); // Añade nombre de cliente a la cita
  seleccionarFecha(); // Añade la fecha de la cita
  seleccionarHora(); // Añade la Hora de la cita

  mostrarResumen(); //Muestra resumen del pedido
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
    seleccionarFecha(); // Añade la fecha de la cita
    seleccionarHora(); // Añade la Hora de la cita
    mostrarResumen();
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
const server = window.location.origin;
async function consultarAPI() {
  try {
    const url = `${server}/api/servicios`;
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
  }
}

function idCliente() {
  cita.id = document.querySelector("#id").value;
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
      mostrarAlerta("Sabados y domingo cerrado", "error", ".formulario");
    } else {
      cita.fecha = e.target.value;
    }
  });
}
function seleccionarHora() {
  const inputHora = document.querySelector("#hora");
  inputHora.addEventListener("input", function (e) {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    const alertaPrevia = document.querySelector(".alerta");
    if (hora < 9 || hora > 20) {
      e.target.value = "";
      cita.hora = e.target.value;
      mostrarAlerta("Hora no válida", "error", ".formulario");
    } else {
      cita.hora = e.target.value;
    }
  });
}

function mostrarAlerta(mensaje, tipo, elemento) {
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) {
    alertaPrevia.remove();
  }

  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  // setTimeout(() => {
  //   alerta.remove();
  // }, 2000);
}

function mostrarResumen() {
  const resumen = document.querySelector(".contenido-resumen");

  // Limpiar el contenido de Resumen
  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "Faltan datos para crear la cita",
      "error",
      ".contenido-resumen"
    );

    return;
  }

  // Formatear el div de resumen
  const { nombre, fecha, hora, servicios } = cita;

  // Heading para Servicios en Resumen
  const headingServicios = document.createElement("H3");
  headingServicios.textContent = "Resumen de servicios";
  resumen.appendChild(headingServicios);

  // Iterando y mostrando los servicios
  servicios.forEach((servicio) => {
    const { id, precio, nombre } = servicio;
    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("contenedor-servicio");

    const textoServicio = document.createElement("P");
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  // Heading para Cita en Resumen
  const headingCita = document.createElement("H3");
  headingCita.textContent = "Resumen de cita";
  resumen.appendChild(headingCita);


  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  // Formatear fecha
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(year, mes, dia));

  const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  const fechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${hora} hs.`;

  // Boton para crear Cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar cita';
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);

  resumen.appendChild(botonReservar);

}

async function reservarCita(){  
  const {nombre, fecha, hora, servicios, id} = cita;
  
  const idServicios = servicios.map(servicio => servicio.id);

  const datos = new FormData();
  datos.append('fecha', fecha);
  datos.append('hora', hora);
  datos.append('usuarioId', id);
  datos.append('servicios', idServicios);
  
  // console.log([...datos]); //spread syntax
  try {
    // Peticion hacia la api
    const url = `${server}/api/citas`;
  
    const respuesta = await fetch(url, {
      method: 'POST',
      body: datos
    });
  
    const resultado = await respuesta.json();
    if(resultado.resultado){
      Swal.fire({
        icon: 'success',
        title: 'Cita creada',
        text: 'Tu cita ha sido creada correctamente!',
        button: 'OK'
      }).then(() =>{
        window.location.reload();
      } )
    }    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al guardar la cita'
    })
  }



}