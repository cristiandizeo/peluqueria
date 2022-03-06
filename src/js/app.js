let paso = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp(){
    tabs(); //Cambia las secciones al presionar tabs)
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( boton =>{
        boton.addEventListener('click', function(){
            console.log('Click');
        });
    })
}