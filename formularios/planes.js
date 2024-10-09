// addEventListener que se activa cuando la ventana se ha cargado completamente.
window.addEventListener('load',iniciar,false); 

// Función que se ejecuta cuando la ventana se ha cargado completamente.
function iniciar(){

    console.log("Iniciado.");

	// Salida del número de veces que se entra en la página sumándole uno al dato (visitas1) que se almacena en la memoria local (localStorage).
	salida_visitas.innerHTML = "";

	if(!localStorage["visitas2"]){
		localStorage.setItem("visitas2", 1);
		
		salida_visitas.innerHTML += "Visitas de la página: " + localStorage.getItem("visitas2");
	}else{
		let visitas = localStorage.getItem("visitas2");
		visitas = parseInt(visitas) + 1;
		localStorage.setItem("visitas2", visitas);
		console.log(localStorage.getItem("visitas2"));
	
		salida_visitas.innerHTML += "Visitas de la página: " + localStorage.getItem("visitas2");
	}

	// addEventListener para escuchar el evento click en el elemento con el id enviar.
	enviar.addEventListener('click',validar,false);

	// addEventListener para escuchar el evento keyup en el elemento con el id nombre.
    nombre.addEventListener('keyup', nomMayus,false);

	// Obtiene todos los elementos input del documento.
	let input = document.getElementsByTagName("input");

	// Itera sobre cada elemento input y agrega addEventListener con el evento focus o blur según se pulse dentro o fuera del recuadro.
	for(let i = 0; i < input.length; i++){
		input[i].addEventListener("focus", function(){

			document.getElementById(this.id).classList.add("foco");

		})
	}

	for(let i = 0; i < input.length; i++){
		input[i].addEventListener("blur", function(){

			document.getElementById(this.id).classList.remove("foco");

		})
	}

}

//Función que pone los caracteres del campo nombre en mayúsculas.
function nomMayus(){
    nombre.value=nombre.value.toUpperCase();  
}

// Función para validar los campos del formulario.
function validar(e)	{

	let devolver=""; 
	salida.innerHTML="";

	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarNombre() & validarCodigo() & validarPaises() & validarPlan()) {

		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		e.preventDefault(); 

		devolver=true;
		console.log(e);
		console.log(e.target);
    }
	else
	{
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		e.preventDefault();		
		devolver=false;	
	}
	// Retorna el resultado de la validación.
	return(devolver);
}


function validarNombre()
{

	let devolver=false;
    
	 // Elimina el estilo del campo de nombre.
	document.getElementById("nombre").className = "";

	//Verifica que el campo nombre no este vacío.
    if(nombre.value !== ""){
		console.log(nombre.value);

		// Agrega el estilo correcto al campo de nombre y lo muestra.
		document.getElementById("nombre").className="correcto";	
        salida.innerHTML += '<b class="ok">✓</b> Nombre del plan: ' + nombre.value + ' <br><br>';
		devolver=true;
        
    }
	else
	{
		// Muestra el fallo, añade el foco en el campo con el fallo y agrega el stilo error.
		salida.innerHTML += '<b class="mal">✕</b> El campo nombre: no puede estar vacío. <br><br>';
		
		document.getElementById("nombre").focus();
		document.getElementById("nombre").className="error";	
		devolver=false;
	}
	// Retorna el resultado de la validación.
	return (devolver);
}


function validarCodigo()
{
	
	let devolver=false;
    
	 // Elimina el estilo del campo de código.
	document.getElementById("codigo").className = "";

	// Obtiene el elemento de código.
    let cod = document.getElementById('codigo');

	// Verifica si el valor del campo de código está vacío, si es así, muestra el fallo pone el foco y le añade el estilo error.
	if(cod.value === ""){
		salida.innerHTML += '<b class="mal">✕</b> El campo código: no puede estar vacío. <br><br>';
		
		document.getElementById("codigo").focus();
		document.getElementById("codigo").className="error";	
		devolver=false;

	// Verifica si el campo cod concuerda con el patron descrito en el html y si no es correcto, muestra el fallo pone el foco y le añade el estilo error.
	}else if(cod.validity.patternMismatch){
        salida.innerHTML += '<b class="mal">✕</b> El campo código: no es correcto. <br><br>';
		
		document.getElementById("codigo").focus();
		document.getElementById("codigo").className="error";	
		devolver=false;
	// Si es correcto muestra el código y le añade el estilo correcto.
    }else{
        document.getElementById("codigo").className="correcto";	
		salida.innerHTML += ' <b class="ok">✓</b> Código: ' + document.getElementById("codigo").value + '<br><br>';
		devolver=true;
    }
	// Retorna el resultado de la validación.
	return (devolver);
}


function validarPaises()
{
	let devolver = false;

	 // Elimina el estilo del campo de paises.
	document.getElementById("paises").className = "";
	
	// Valor del campo paises.
    let valor = document.getElementById('paises').value;
	console.log(valor);

	// Valor de las opciones.
    let eleccion =document.getElementById('lista-paises').getElementsByTagName('option');
	console.log(eleccion);

	// Itera sobre las opciones de países.
	for (let i = 0; i < eleccion.length; i++) {
		// Verifica si el valor del campo de países coincide con alguna opción y pone devolver a true.
        if (eleccion[i].value === valor) {
            devolver = true;
        }
    }

	// Si es true muestra el país y le añade es estilo correcto, si es false y no esta el campo vacío muestra el error.
    if (devolver) {
        document.getElementById("paises").className="correcto";
        salida.innerHTML += '<b class="ok">✓</b> País: ' + valor + ' <br><br>';
    } else if(valor !== "") {
		document.getElementById("paises").className="error";	
        salida.innerHTML += '<b class="mal">✕</b> El país: ' + valor + ' no es válido. <br><br>';
    }

	// Retorna el resultado de la validación.
	return devolver;
}


function validarPlan(){

	let devolver = false;

	// Valor de las opciones.
    let opciones = document.getElementsByName("tipo-plan");

	// Itera sobre las opciones de tipo-plan.
	for(let i = 0; i< opciones.length; i++){

		// Si alguna opción está seleccionada la muestra. 
		if(opciones[i].checked){
			devolver=true;
            salida.innerHTML+='<b class="ok">✓</b> Tipo de plan: ' + opciones[i].value + ' <br><br>';
		}
	}

	//Muestra un mensaje de error si no hay opción seleccionada.
	if(!devolver){
		salida.innerHTML += '<b class="mal">✕</b> El campo tipo de plan es obligatorio, seleccione uno. ';
	}

	// Retorna el resultado de la validación.
	return (devolver);

}

