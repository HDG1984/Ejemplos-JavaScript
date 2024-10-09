// addEventListener que se activa cuando la ventana se ha cargado completamente.
window.addEventListener('load',iniciar,false);

//Array con los id de los iconos de las casillas que se van a reproducir.
var idImgPlay = [];

//Array con las canciones que se van a reproducir.
var listaCanciones = [];

//Colores de las casillas.
var listaColores = ["#15e6cc","#2ef8a0","#67ff6b","#c6e602","#e7c500",
                    "#c501e2","#9a27f7","#6664ff","#2b97fa","#01c4e7",
                    "#903495","#6f3460","#4a354f","#d20076","#ff0076",
                    "#c501e2","#2ef8a0","#e7c500","#f82d97","#e830ce",
                    "#ae3dff","#55ffe2","#ff3b93","#a7fd2a","#37023a"]

// Función que se ejecuta cuando la ventana se ha cargado completamente.
function iniciar(){

    //Se crea el botón de inicio con la función crearBoton.
    let botonInicio = crearBoton("Inicio", "inicio_id");
    
    //Se crea el contendor que contiene la aplicación con la función craerDiv.
    let contenedor = crearDiv("contenedor_id", "contenedor");

    //Se crea el contendor principal que contendrá la barra de título y el div de la aplicación.
    let principal = crearDiv("principal_id", "principal");

    //Se crea el contenedor que tendrá el título de la aplicación.
    let barraTitulo = crearDiv("barra_titulo_id", "barra_titulo");
    
    //Elemento h1 y texto que colgara de él.
    let titulo = document.createElement("h1");
    let textoTitulo = document.createTextNode("Mini Daw");
    titulo.appendChild(textoTitulo);

    //Función que inicia la aplicación al hacer clic en el botón inicio.
    botonInicio.addEventListener("click", function(){

        //Se elimina el botón inicio una vez clicado.
        contenedor.removeChild(botonInicio);

        //Se crea el contenedor tablero que contendrá las casillas.
        let tablero = crearDiv("tablero_id", "tablero"); 

        // Bucle para crear las casillas del tablero.
        for(let i = 0; i < 25; i++){

            //Se crea las casillas con la función crearDiv en cada iteración del bucle.
            var casilla = crearDiv("casilla_" + (i + 1), "casilla");

            //Se crea un nuevo elemento audio por cada casilla con rutas a los diferentes audios.
            var audio = document.createElement("audio");
            audio.src = "./loops/" + (i + 1) + ".wav";
            audio.setAttribute("id", "audio_" + (i + 1));
            casilla.appendChild(audio);

            //Se crea un elemento img por cada casilla con display none para que no se vea.
            var imgPlay = document.createElement("img");
            imgPlay.setAttribute("id", "imgPlay_" + (i + 1));
            imgPlay.src = "img/play1.png";
            imgPlay.style.display = "none";
            casilla.appendChild(imgPlay);
            
            //Se crea un evento click al clicar en cada casilla.
            casilla.addEventListener("click", function() {
                //Se obtiene el id de la imagen de la casilla clicada y se almacena en el array idImgPlay.
                var imgID = this.getElementsByTagName("img")[0].id;
                idImgPlay.push(imgID);
                //console.log(idImgPlay);

                // Se obtien el ID de la casilla clicada.
                var casillaID = this.id;

                //Se obtiene el id del audio de la casilla clicada y se almacena en el array listaCanciones.
                var audioID = this.getElementsByTagName("audio")[0].id;
                listaCanciones.push(audioID);
                //console.log(listaCanciones);
                
                //Se obtien la casilla clicada y se le agrega un color de los del array listaColores y una sombra interior.
                var casillaActual = document.getElementById(casillaID);
                casillaActual.style.backgroundColor = listaColores[i];
                casillaActual.style.boxShadow = "inset 0 0 5px 5px rgba(0, 0, 0, 0.5)";

            });

            //Se agrega cada casilla al tablero.
            tablero.appendChild(casilla);
        }

        //Se crea el botón reproducir y se le añade un evento click llamando a la función loops.
        let reproducir = crearBoton("Reproducir", "reproducir_id");
        reproducir.addEventListener("click",loops);
   
        //Se crea el botón parar y se le añade un evento click llamando a la función pararLoops.
        let parar = crearBoton("Parar", "parar_id");
        parar.addEventListener("click", pararLoops);

        //Se crea el botón borrar y se le añade un evento click llamando a la función reiniciar.
        let borrar = crearBoton("Borrar", "borrar_id");
        borrar.addEventListener("click", reiniciar);

        //Se crea el contenedor que contendrá las imágenes y el texto.
        let seccion = crearDiv("seccion_id", "seccion");

        let imagen1 = crearImagen("img/img1.jpg", "img1_id");
        let imagen2 = crearImagen("img/img2.jpg", "img2_id");

        //Se crea un elemento <p> para el primer párrafo de texto y se justifica el texto.
        let elementoP = document.createElement('p');
        elementoP.style.textAlign = "justify";

        //Se crea un elemento <b> para resaltar una parte del texto.
        let elementoB = document.createElement('b');

        //Se crea un salto de línea.
        let elementoBR = document.createElement('br');

        //Se crean cuatro nodos de texto.
        let texto1 = document.createTextNode('La música electrónica es aquel tipo de música que emplea ');
        let texto2 = document.createTextNode('instrumentos musicales electrónicos y tecnología musical electrónica ');
        let texto3 = document.createTextNode('para su producción e interpretación.');
        let texto4 = document.createTextNode(' En general, se puede distinguir entre el sonido producido mediante la utilización de medios electromecánicos, de aquel producido mediante tecnología electrónica, que también pueden ser mezclados. Algunos ejemplos de dispositivos que producen sonido electro-mecánicamente son el telarmonio,2​ el órgano Hammond3​ y la guitarra eléctrica.')

        //Se agregan los textos a los elementos  <p> y dos saltos de línea, se agrega el texto al elemento <b>.
        elementoP.appendChild(texto1);
        elementoB.appendChild(texto2);
        elementoP.appendChild(elementoB);
        elementoP.appendChild(texto3);
        elementoP.appendChild(elementoBR);
        elementoP.appendChild(texto4);
        elementoP.appendChild(elementoBR);

        //Se crean tres nodos de texto.
        let texto5 = document.createTextNode('El ritmo');
        let texto6 = document.createTextNode(', como un recurso fundamental en la visualidad (del griego ῥυθμός rhythmós, ‘cualquier movimiento regular y recurrente’, ‘simetría’),1​ puede definirse generalmente como un «movimiento marcado por la sucesión regular de elementos débiles y fuertes, o bien de condiciones opuestas o diferentes».2​ Es decir, un flujo de movimiento, controlado o medido, sonoro o visual, generalmente producido por una ordenación de elementos diferentes del medio en cuestión.');
        let texto7 = document.createTextNode('Se trata de un rasgo básico de todas las artes, especialmente de la música, la poesía y la danza. En música la mayoría de las definiciones tradicionales aluden al ritmo como fuerza dinámica y organizativa de la música. La naturaleza del ritmo es primordialmente subjetiva.')

        //Se crean dos elementos <p> y <b> para el segundo párrafo.
        var elementop2 = document.createElement("p");
        var elementoB2 = document.createElement("b");

        //Se agregan los textos a los elementos  <p> y el texto al elemento <b>.
        elementoB2.appendChild(texto5);
        elementop2.appendChild(elementoB2);
        elementop2.appendChild(texto6);
        elementop2.appendChild(texto7);

        //Se agrega el tablero al contenedor.
        contenedor.appendChild(tablero);

        //Se agregan los botones al body.
        document.body.appendChild(reproducir);
        document.body.appendChild(parar);
        document.body.appendChild(borrar);

        //Se agrga la seccion al contendor.
        contenedor.appendChild(seccion);
      
        //se agregan las imágenes y el primer parrafo a la seccion y el segundo parrafo al primero.
        seccion.appendChild(imagen1);
        seccion.appendChild(imagen2);
        seccion.appendChild(elementoP);
        elementoP.appendChild(elementop2);
       
    });

    //Se agrega el contendor principal al body.
    document.body.appendChild(principal);
    
    //Se agrega el contenedor barraTitulo al principal.
    principal.appendChild(barraTitulo);

    //Se agraga el el contendor al principal.
    principal.appendChild(contenedor);

    //SE agraga titulo a barraTitulo.
    barraTitulo.appendChild(titulo);

    //Se agraga el botonInicio al contenedor.
    contenedor.appendChild(botonInicio);

}

//Función que crea un botón con un texto, un id y un className.
function crearBoton(texto , nombreId){
    let boton = document.createElement("button");
    boton.textContent = texto;
    boton.setAttribute("id", nombreId);
    boton.className = "boton";
    return boton;
}

//Función que crea un div con un id y un className.
function crearDiv(nombreId, nombreClass){
    let contenedor = document.createElement("div");
    contenedor.setAttribute("id", nombreId);
    contenedor.className = nombreClass;
    return contenedor;
}

//Función que crea una imágen con un ruta y un id.
function crearImagen(ruta, nombreId){
    let imagen = document.createElement("img");
    imagen.src = ruta;
    imagen.setAttribute("id", nombreId);
    return imagen;
}


//Función que reproduce los audios.
function loops(){
    let posicion = 0;
    
    /*
    Función que va reproduciendo el audio correspondiente según el array listaCanciones y haciendo visible la imágen de play según el orden 
    en que se ha clicado, cuando el audio ha terminado, controlado por el evento de audio ended, se pone la imagen en oculto se incrementa la 
    posición y se vuelve a llamar a la función para reproducir el siguiente.
    */
    function reproducirLoops(){
        if(posicion < listaCanciones.length){
            var imgPlay = document.getElementById(idImgPlay[posicion]);
            var audio = document.getElementById(listaCanciones[posicion]);
            
            audio.play();
            
            imgPlay.style.display = "block";
   
            audio.addEventListener("ended", function(){
                imgPlay.style.display = "none";
               
                posicion++;
                
                reproducirLoops();
            })
        }
    }
    
    reproducirLoops();
}

//Función que para la reproducción y oculta la imagen de play.
function pararLoops(){
    
    for(let i = 0; i < listaCanciones.length; i++){
        var imgPlay = document.getElementById(idImgPlay[i]);
        var audio = document.getElementById(listaCanciones[i]);

        audio.pause();
      
        imgPlay.style.display = "none"; 
    }
    
}

//Función que reinicia la selección hecha quitando los estilos a las casillas y vaciando los arrays listaCanciones y idImgPlay.
function reiniciar(){
    for(let i = 0; i < 25; i++){
        var casilla = document.getElementById("casilla_" + [(i + 1)]);
        casilla.style.backgroundColor = "#a3a8b7";
        casilla.style.boxShadow = "none";
    }

    listaCanciones = [];
    idImgPlay = [];

}