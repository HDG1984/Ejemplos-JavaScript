//Función que se inicia cuando el HTML está cargado.
$(document).ready(function(){

    //Llamada a la función iniciar.
    iniciar();

    //Cuando se hace click en el logo se llama a la función cambiarLogo.
    $(".logo_cabecera").click(cambiarLogo);
    
    //Cuando se produce un cambio en el checkbox se llama a la función mostrarContenedorImagen.
    $("#imagen").on("change", mostrarContenedorImagen);
    
    //Cuando se produce un cambio en el checkbox se llama a la función mostrarContenedorTexto.
    $("#texto").change(mostrarContenedorTexto)

    //Al hacer click en el botón se llama a la función iniciar.
    $("#inicializar").click(iniciar);

    //Llamada a la función marcarMini.
    marcarMini();

    //Cuando se produce un cambio en los botones radio de vertical u horizontal se llama a la función contendorVerticalHorizontal.
    $("#vertical, #horizontal").on("change", contendorVerticalHorizontal);

    //Cuando se produce un cambio en el selector se cambia el color de fondo del div que contiene las imágenes grandes.
    $("#seleccion_color").on("change", function(){
        $(".visual_img").css("background-color", $(this).val());
    });    

    //Llamada a la función cagarImagen.
    cargarImagen();

    //Llamada a la función mostrarOrigenes.
    mostrarOrigenes();

    //Cuando se hace click en el botón mostrar / ocultar con efecto se llama a la función ocultarMostrarTexto.
    $("#mostrar_slide").click(ocultarMostrarTexto);

    //Cuando se produce un cambio en el selector de velocidad se llama a la función registrarVelocidad.
    $("#velocidad").on("change", registrarVelocidad);

    //Cuando se produce un cambio en el selector de fuente se llama a la función añadirFuente.
    $("#fuente").on("change", añadirFuente);

    //Cuando se produce un cambio en el selector de espaciado se llama a la función añadirEspaciado.
    $("#separacion").on("change", añadirEspaciado);
});

let imagenselect;

// Función para inicializar la configuración de la página.
function iniciar(){
    //logo
    $(".logo_cabecera").attr("src", "./img/pel_ani_01.png");
    $(".logo_cabecera").css("width","");

    //Checked paneles visibles.
    $("#imagen").prop("checked", true);
    mostrarContenedorImagen();

    $("#texto").prop("checked", true);
    mostrarContenedorTexto();

    //Sobre el panel de imágenes.
    $("#horizontal").prop("checked", true);
    $(".visual_img").css("flex-direction", "row");
    
    $("#seleccion_color").val("#CD5C5C");
    $(".visual_img").css("background-color", "#CD5C5C");


    //Sobre el contenedor de la imagen y la imagen seleccionada.
    $("#filtro option:eq(0)").prop("selected", true);
    $("#borde").val("");
    $("#seleccion_color_borde").val("#95A5A6");
    //imagenselect con la ruta de la miniatura preseleccionada para que esté disponible al clicar en una imagen grande.
    imagenselect = "./img/foto1.jpg";
    //Reseteo de los valores de las imágenes grandes.
    $(".visual_img .div_img_grande").each(function(index){
        $("#img_" + (index +1)).attr("src", "./img/pel_ani_01.png");
        $("#img_" + (index +1)).css({"height": "",
                                    "width": "",
                                    "filter": "none",});
    });
    $(".div_img_grande").css("border", "solid 2px #95A5A6")                            

    //Imágenes mini
    $("#mini1").css({"border": "red 3px solid",
                    "transform": "scale(1.2)"});
    desmarcarMini("mini1");

    //ver orígenes de imágenes
    $(".origen_img > div > p").text("Insertar orígenes de las imágenes");


    //Sobre el texto
    $("#titulo_1").show();
    $("#titulo_2").hide();

    $("#mostrar_slide").show();
    $("#div_velocidad").show();

    $(".visual_txt").css("background-color", "white");

    $("#titulo_1, #titulo_2").css({"letter-spacing": 0,
                                    "font-family": "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"});

    $("#velocidad").val(500);
    $("#separacion").val("");
    $("#fuente option:eq(0)").prop("selected", true);
    $("#texto_registro").css({"border": "none",
                                "margin-top": "-30px"});

}

//Función que cambia con efecto la foto del alumno por el logo del centro.
function cambiarLogo(){
    $(this).fadeOut(700, function(){
        $(this).attr("src", "./img/foto3.jpg");
        $(this).css("width","150");
        $(this).fadeIn(1800);
    })
}

//Función que muestra o esconde la sección de imagen.
function mostrarContenedorImagen(){
    if($("#imagen").is(":checked")){
        $(".contenedor_imagen").slideDown(500);
    }else{
        $(".contenedor_imagen").slideUp(1400);
    }
}

//Función que muestra o esconde la sección de texto.
function mostrarContenedorTexto(){
    if($("#texto").is(":checked")){
        $(".contenedor_texto").fadeIn(1000);
    }else{
        $(".contenedor_texto").fadeOut(1000);
    }
}

//Función que marca y resalta la imagen mini seleccionada.
function marcarMini(){
    $(".miniaturas>img").each(function(){
        $(this).click(function(){
            $(this).css({"border": "red 3px solid",
                        "transform": "scale(1.2)"});
            imagenselect = $(this).attr("src");
            console.log(imagenselect);

            let miniImagenId = $(this).attr("id");
            desmarcarMini(miniImagenId);
        })  
    });
}

//Función que desmarca aquellas mini imágenes que no están seleccionadas.
function desmarcarMini(idImagen){
    $(".miniaturas>img").each(function(){
        if($(this).attr("id") !== idImagen){
            $(this).css({"border": "black 2px solid",
                        "transform": "scale(1)"});
        }
    });
}

//Función que muestra las imágenes grandes en vertical u horizontal según la opción clicada.
function contendorVerticalHorizontal(){
    if($("#vertical").is(":checked")){
        $(".visual_img").css("flex-direction", "column");
    }
    if($("#horizontal").is(":checked")){
        $(".visual_img").css("flex-direction", "row");
    }
}

//Función que carga en cada div clicado la imagen mini seleccionada, añadiéndole efecto, borde y color de borde.
function cargarImagen(){
    $(".visual_img .div_img_grande").each(function(index){
        $(this).click(function(){
            $(".origen_img > div").hide();

            let grosorBorde = $("#borde").val();
            let colorBorde = $("#seleccion_color_borde").val();
            $(this).css("border", "solid " + grosorBorde + "px " + colorBorde);

            $("#img_" + (index +1)).slideUp(1000, function(){
                $("#img_" + (index +1)).attr("src", imagenselect);
                $("#img_" + (index +1)).css({"height": "145",
                                            "width": "145"});
                
                let filtro = $("#filtro").val();
                seleccionFiltro(filtro, index);

                $("#img_" + (index +1)).slideDown(1000);
            }); 
        });
    });
}

//Función que aplica el filtro según selección del usuario a cada imagen grande.
function seleccionFiltro(filtro,index){
    if(filtro === "ninguno"){
        $("#img_" + (index +1)).css("filter", "none");
    }else if(filtro === "sepia"){
        $("#img_" + (index +1)).css("filter", "sepia(50%)");
    }else if(filtro === "invertir"){
        $("#img_" + (index +1)).css("filter", "invert(100%)");
    }else if(filtro === "blur"){
        $("#img_" + (index +1)).css("filter", "blur(3px)");
    }else if(filtro === "blanco_negro"){
        $("#img_" + (index +1)).css("filter", "grayscale(100%)");
    }
}

//Función que muestra las rutas de las imágenes grandes que se muestran en cada div.
function mostrarOrigenes(){
    $(".bot_origen").click(function(){
        $(".origen_img > div").show();;

        let cadena = "";
        $(".visual_img .div_img_grande").each(function(index){
            let ruta = $("#img_" + (index +1)).attr("src");
            cadena += "<strong> Imagen: " + (index +1) + "</strong> - Tiene como origen: " + ruta + "<br>";
            $(".origen_img > div > p").html(cadena);
        });
    })
}

//Función que muestra los registros de los cambios realizados en la sección texto.
let contador = 1;
function registro(dato){
    $("#historial #texto_registro p").prepend( contador + ": " + dato + "<br>");
    contador++;
}

//Función que muestra el texto visible con un espaciado entre letras y añade un registro.
function añadirEspaciado(){
    registro("Cambio separación");
    let espaciado = parseInt($("#separacion").val());
    //console.log(espaciado);
    $("#titulo_1, #titulo_2").css("letter-spacing", espaciado);
}

//Función que modifica la fuente del texto visible y añade un registro.
function añadirFuente(){
    registro("Cambio fuente");
    let fuente = $("#fuente").val();
    $("#titulo_1, #titulo_2").css("font-family", fuente);
}

//Función que un registro de velocidad.
function registrarVelocidad(){
    registro("Cambio velocidad");
}

//Función que muestra el texto oculto con efecto, ocultando el botón y el input de velocidad, poniendo el fondo del texto en negro
// y el texto en blanco, crea un registro.
function ocultarMostrarTexto(){
    registro("Mostrar / Ocultar, activado");
    $("#mostrar_slide").hide();
    $("#div_velocidad").hide();
    let velocidad = parseInt($("#velocidad").val());
    //console.log(velocidad);
    $("#titulo_1").fadeOut(velocidad, function(){

    $("#titulo_2").fadeIn(velocidad);
    $("#titulo_2").css("color", "white");
    $(".visual_txt").css("background-color", "black");
    });
}