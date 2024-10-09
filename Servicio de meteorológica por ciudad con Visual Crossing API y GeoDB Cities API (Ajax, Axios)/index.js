

//Función que se ejecuta cuando el DOM está cargado
$(function() { 

    // Constante para la clave de acceso para la API de Visual Crossing
    const CLAVECROSSING = 'NRNXCYR9BF6TXEMNH6CJ73UKE';

    //Se crean los elementos header, h1, dos botones y un input con sus clases y atributos correspondientes.
    let header = $("<header>").addClass("header").attr("id", "id_header");
    let tituloPagina = $("<h1>").addClass("titulo_pagina").attr("id", "id_titulo").text("El tiempo.dwec");
    let botonPrevActual = $("<button>").addClass("btn_actual").attr("id", "id_btn_actual").text("Tiempo actual");
    let botonPrevDias = $("<button>").addClass("btn_dias").attr("id", "id_btn_dias").text("Predicción 10 días");
    let inputText = $("<input>").addClass("input_text").attr("id", "id_input_text").attr("type", "text").attr("placeholder", "Lugar a buscar...");

    // Se agregan elementos hijos al elemento header.
    header.append(tituloPagina,inputText, botonPrevActual, botonPrevDias);

    //Se crean los elementos header y pie con sus clases y atributos correspondientes.
    let main = $("<main>").addClass("main").attr("id", "id_main");
    let pie = $("<footer>").addClass("pie").attr("id", "id_pie");
  
    // Se agregan elementos hijos al elemento body.
    $("body").append(header, main,pie);

    // Evento de clic en el botón botonPrevActual.
    $("#id_btn_actual").click(function() {

        //valor del input de texto.
        let ciudad = $("#id_input_text").val();
        
        //Se comprueba si el campo del input está vacío y se añade un mensaje.
        if(ciudad === ""){
            $("#id_main").html(""); 
            let error = $("<h2>").text("Introduzca ciudad");
            $("#id_main").append(error);
            return;
        }

        //Se muestra un gif de carga mientras se obtiene la respuesta de la API.
        $("#id_main").html("<img src='img/Settings.gif'>"); 

        //Se codifica la ciudad y se crea la url para la consulta con cidadEscapada y la clave de Visual Crossing.
        let ciudadEscapada = encodeURIComponent(ciudad);
        let consulta = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + 
                        ciudadEscapada + "%2Ces?unitGroup=metric&key=" + CLAVECROSSING + "&contentType=json&lang=es";

        //Se realiza la petición AJAX con la url, tipo get, tipo de datos de respuesta json y true para que sea asíncrona.
        $.ajax({
            url: consulta,
            type: "GET",
            dataType: "json",
            async: true,
            //Función que se ejecuta si la petición es exitosa y llama a la función obtenerDiaActual para procesar los datos.
            success: function(datos_devueltos){

                obtenerDiaActual(datos_devueltos);
      
            },
            //Función que se ejecuta si hay un error en la petición.
            error: function(xhr, estado, error_producido) {
                console.warn("Error producido: " + error_producido);
                console.warn("Estado: " + estado);

            },
            //Función que se ejecuta cuando la petición se completa.
            complete: function(xhr, estado) {
                console.log("Petición completa");
            }
        });

        //Variable para almacenar los datos devueltos.
        let datos_devueltos;
        //Se realiza la petición con AXIOS de tipo get con la url de la consulta de la  API GeoDB Cities con los parámetros necesarios.
        axios({
            method: "get",
            url: "http://geodb-free-service.wirefreethought.com/v1/geo/places",
            params:{
                limit: '5',
                offset: '0',
                types: 'CITY',
                namePrefix: ciudadEscapada,
                languageCode: 'es'
            }
            //Si la promesa (.then) es exitosa se ejecuta la función y se reciben los datos, si el status de la respuesta es 200 
            //se ejecuta la función obtenerNumHabitantes para procesar los datos.
        }).then(function (response){
            console.log(response);
            datos_devueltos = response.data;
            console.log("datos axios" + datos_devueltos);
            
            if(response.status === 200){

                obtenerNumHabitantes(datos_devueltos, ciudad, pie);

            }

        })
        //Función que se ejecuta si hay un error en la solicitud y muestra un h2 con el error.
        .catch(function (error){
            console.warn("Error producido: " + error);
            let errorAxios = $("<h2>").text("Ocurrió un error al obtener los datos.");
            pie.append(errorAxios);
        });

    });

    // Evento de clic en el botón botonPrevDias.
    $("#id_btn_dias").click(function () {
        let ciudad = $("#id_input_text").val();

        //Se comprueba si el campo del input está vacío y se añade un mensaje.
        if(ciudad === ""){
            $("#id_main").html(""); 
            let error = $("<h2>").text("Introduzca ciudad");
            $("#id_main").append(error);
            return;
        }

        //Se muestra un gif de carga mientras se obtiene la respuesta de la API.
        $("#id_main").html("<img src='img/Settings.gif'>"); 

        //Se codifica la ciudad y se crea la url para la consulta con cidadEscapada y la clave de Visual Crossing.
        let ciudadEscapada = encodeURIComponent(ciudad);
        let consulta = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + 
                        ciudadEscapada + "%2Ces?unitGroup=metric&key=" + CLAVECROSSING + "&contentType=json&lang=es";

        //Se realiza una consulta con fetch pasándole la url de la consulta.
        fetch(consulta)
        //Se realiza la primera promesa que obtiene los datos de la consulta y retorna un json.
        .then((result) => {
            console.log(result.status);                    
            console.log(result);
            
            return result.json();
        })
        //Se realiza la segunda promesa que contiene los datos json de la anterior y se ejecuta la función obtenerPredicDias 
        //con esos datos para procesarlos.
        .then((datos_devueltos) => {

            obtenerPredicDias(datos_devueltos);
            
        })
        //Se capturan los errores.
        .catch(console.warn)
        //Se devuelven el console.warn aunque no funcione la promesa para saber que la consulta ha finalizado.
        .finally(console.warn(`La consulta ha finalizado`));
    });


});

/**
 * Función que devuelve de fechaPeticion el nombre del día de la semana y el día del mes.
 * @param {string} fechaPeticion Fecha en formato de cadena (yyyy-mm-dd).
 * @returns {string} Día de la semana y el día del mes.
 */
function diaSemanaMes(fechaPeticion){
    let fechaString = fechaPeticion;
    let fecha = new Date(fechaString);

    let diaSemana = fecha.getDay();

    const NOMBRES_DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let nombreDia = NOMBRES_DIAS[diaSemana];

    let diaMes = fecha.getDate();

    let resultado = nombreDia + " " + diaMes;

    return resultado;
}

/**
 * Función que toma los datos devueltos por la API y los muestra en el elemento con el id 'id_main'.
 * Se muestran detalles sobre el clima actual, incluyendo iconos, descripción, temperatura, probabilidad de lluvia, 
 * índice UV, presión atmosférica, velocidad del viento, visibilidad y estaciones meteorológicas.
 * También añade un mapa de la ubicación usando un iframe de OpenStreetMap.
 * @param {Object} datos_devueltos Datos devueltos por la API de clima.
 */
function obtenerDiaActual(datos_devueltos){
    $("#id_main").html("<br>");
    console.log(datos_devueltos);

    let contenido = $("<div>").addClass("contenido").attr("id", "id_contenido");

    let contenidoDia = $("<div>").addClass("contenido_dia").attr("id", "id_contenido_dia");


    contenidoDia.append("<strong>" + datos_devueltos.address + "</strong><br>");

    contenidoDia.append('<img src="./img/iconos_tiempo/' + datos_devueltos.days[0].icon + '.png">' + "<br>");

    contenidoDia.append(datos_devueltos.days[0].description + "<br><br>");

    let lluvia = datos_devueltos.days[0].precipprob;
    let tipoLLuvia = [];
    if(datos_devueltos.days[0].preciptype !== null){
        for(let i = 0; i < datos_devueltos.days[0].preciptype.length; i++){
            tipoLLuvia.push(datos_devueltos.days[0].preciptype[i]);
        }
    }
  
    if(lluvia > 0){
        contenidoDia.append("Lluvia: " + lluvia + "%" + "<br> (" + tipoLLuvia.toString() + ")<br><br>");
    }else{
        contenidoDia.append("No está lloviendo<br><br>");
    }

    contenidoDia.append(datos_devueltos.days[0].tempmin + "º / " + datos_devueltos.days[0].tempmax + "º<br><br>" );

    contenidoDia.append("Índice de rayos ultravioleta: " + datos_devueltos.days[0].uvindex + "<br><br>");

    contenidoDia.append("Presión atmosférica: " + datos_devueltos.days[0].pressure + " mbar<br><br>");

    let velocidadViento = datos_devueltos.days[0].windspeed;
    if(velocidadViento > 0){
        contenidoDia.append("Viento<br> Velocidad: " + velocidadViento + " km/h Dirección: " + datos_devueltos.days[0].winddir + "º<br><br>");
    }

    contenidoDia.append("Visibilidad: " + datos_devueltos.days[0].visibility + " km<br><br>");

    let estaciones = [];
    for(let clave in datos_devueltos.stations){
        estaciones.push(clave);
    }

    contenidoDia.append("Estaciones meteorológicas: " + estaciones.toString());

    let iframe = $("<iframe>").attr("width", "425").attr("height", "350")
                    .attr("src", "https://www.openstreetmap.org/export/embed.html?bbox=" + 
                    datos_devueltos.longitude + "%2C" + datos_devueltos.latitude + "%2C" + 
                    datos_devueltos.longitude + "%2C" + datos_devueltos.latitude + "&amp;layer=mapnik");
   
    contenido.append(contenidoDia);

    $("#id_main").append(contenido,iframe);
}

/**
 * Función que toma los datos de población devueltos por la API y los muestra en el pie de página.
 * Se muestran detalles sobre la población de la ciudad especificada, incluyendo el país, la región y la cantidad de habitantes.
 * @param {Object} datos_devueltos Datos devueltos por la API de población.
 * @param {string} ciudad Ciudad a buscar.
 * @param {Object} pie Parte donde se mostrará la información.
 */
function obtenerNumHabitantes(datos_devueltos, ciudad, pie){
    $("#id_pie").html("");
    $("#id_pie").css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",
        "color": "white"
    });
    if(datos_devueltos.data.length !== 0){
        let contador = 0;
        for(let i = 0; i < datos_devueltos.data.length; i++){
            if(datos_devueltos.data[i].countryCode === "ES" && datos_devueltos.data[i].name == ciudad){
                console.log(datos_devueltos.data[i].countryCode);
                pie.append("País: " + datos_devueltos.data[i].country +
                            " | Región: " + datos_devueltos.data[i].region +
                            " | Población: " + datos_devueltos.data[i].population + " habitantes");
                
                contador++;
            }
        }

        if(contador === 0){
            pie.append("No existen datos de población para " + ciudad);
        }

    }else{
        pie.append("No existen datos de población para " + ciudad);
    }

}

/**
 * Función que toma los datos devueltos por la API y muestra la predicción de los próximos 10 días en el main.
 * Se muestran detalles como la fecha, iconos del clima y temperaturas para cada día.
 * @param {Object} datos_devueltos Datos devueltos por la API de clima.
 */
function obtenerPredicDias(datos_devueltos){
    $("#id_main").html("<br>");
    console.log(datos_devueltos);
    let contenido = $("<div>").addClass("contenido").attr("id", "id_contenido_dias");

    for(let i = 0; i < 10; i++){
        let tarjeta = $("<div>").addClass("tarjeta").attr("id", "id_tarjeta_" + (i+1));

        let fechaPeticion = datos_devueltos.days[i].datetime;

        tarjeta.append(diaSemanaMes(fechaPeticion) + "<br><br>" + 
                        '<img src="./img/iconos_tiempo/' + datos_devueltos.days[i].hours[12].icon + '.png">' + "<br>"  + 
                        datos_devueltos.days[i].hours[12].temp + "º<br>" +
                        '<img src="./img/iconos_tiempo/' + datos_devueltos.days[i].hours[0].icon + '.png">'  + "<br>" + 
                        datos_devueltos.days[i].hours[0].temp + "º");

        contenido.append(tarjeta);
    }
    $("#id_main").append(contenido);
}
