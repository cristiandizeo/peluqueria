let paso = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp(){
    mostrarSeccion();
    tabs(); //Cambia las secciones al presionar tabs)
}

function mostrarSeccion(){
    //Ocultar la seccion mostrar
    const seccionAnterior = document.querySelector('.mostrar')
    if(seccionAnterior){
    seccionAnterior.classList.remove('mostrar');
}
    //Seleccionar la seccion/paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Quitar la clase actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    //Color tab seleccionado
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( boton =>{
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
        });
    })
}