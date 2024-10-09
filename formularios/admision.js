// addEventListener que se activa cuando la ventana se ha cargado completamente.
window.addEventListener('load',iniciar,false);


// Función que se ejecuta cuando la ventana se ha cargado completamente.
function iniciar(){

    console.log("Iniciado.");


	// Salida del número de veces que se entra en la página sumándole uno al dato (visitas1) que se almacena en la memoria local (localStorage).
	salida_visitas.innerHTML = "";

	if(!localStorage["visitas1"]){
		localStorage.setItem("visitas1", 1);
		
		salida_visitas.innerHTML += "Visitas de la página: " + localStorage.getItem("visitas1");
	}else{
		let visitas = localStorage.getItem("visitas1");
		visitas = parseInt(visitas) + 1;
		localStorage.setItem("visitas1", visitas);
		console.log(localStorage.getItem("visitas1"));
	
		salida_visitas.innerHTML += "Visitas de la página: " + localStorage.getItem("visitas1");
	}


	// addEventListener para escuchar el evento click en el elemento con el id enviar.
	enviar.addEventListener('click',validar,false);

	// addEventListener para los eventos mousedown y mouseup en el elemento con el id ver_pass.
	ver_pass.addEventListener('mousedown', mostrarPass);
	ver_pass.addEventListener('mouseup', noMostrarPass);

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


// Función para mostrar la contraseña.
function mostrarPass(){
	document.getElementById("pass_r").type = "text";
	document.getElementById("pass_r").classList.add("claro");	
	
}

// Función para ocultar la contraseña.
function noMostrarPass(){
	document.getElementById("pass_r").type = "password";
	document.getElementById("pass_r").classList.remove("claro");	

}


// Función para validar los campos del formulario.
function validar(e)	{

	let devolver=""; 
	salida.innerHTML="";
	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarNombre() & validarNacionalidad() & validarContraseña() & validarContraseñaRepetida()) {

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

	/* ^[A-Za-zÇçÑñÁÉÍÓÚáéíóú]{10,25}$ --> Controla que la cadena contenga letras del alfabeto en mayúsculas y minúsculas, incluyendo la ñ, Ç y 
	los acentos de las vocales entre 10 y 25 caracteres.*/
	
	let patron = /^[A-Za-zÇçÑñÁÉÍÓÚáéíóú]{10,25}$/;
	let devolver=false;

	 // Elimina el estilo del campo de nombre.
	document.getElementById("nombre").className = "";

	// Verificación del valor del campo nombre con su patrón.
	if (patron.test(document.getElementById("nombre").value) )
	{
		// Agrega el estilo correcto al campo de nombre y lo muestra.
		document.getElementById("nombre").className="correcto";	
		salida.innerHTML+='<b class="ok">✓</b> Nombre: ' + document.getElementById("nombre").value + "<br><br>";
		devolver=true;
	}
	else
	{
		// Muestra el fallo, añade el foco en el campo con el fallo y agrega el stilo error.
		salida.innerHTML+='<b class="mal">✕</b> El campo: Nombre no es correcto.<br><br>';
		
		document.getElementById("nombre").focus();
		document.getElementById("nombre").className="error";	
		devolver=false;
	}

	// Retorna el resultado de la validación.
	return (devolver);
}


function validarNacionalidad()
{
	let devolver = false;

	// Verifica si se ha seleccionado una opción en el campo de nacionalidad y la muestra.
	if(document.getElementById("pais").selectedIndex != 0){

		// Obtiene el elemento seleccionado.
		let objNacionalidad = document.getElementById("pais");
		
		salida.innerHTML+='<b class="ok">✓</b> Nacionalidad: ' + objNacionalidad.options[objNacionalidad.selectedIndex].text + "<br><br>";

		devolver = true;
	}

	// Retorna el resultado de la validación.
	return devolver;
}


function validarContraseña()
{
	//Primer intento que funcionaba, pero no controlaba la cantidad de números.
	//let patron = /^(?![ç,$])(?!.*select)(?!.*where)(?!.*;)[a-zA-Z0-9]{6,19}\d\.$/;


	// ^(?![ç,$]) --> lookahead negativo que indica que la cadena no puede empezar por Ç o, o $.
	// (?!.*select)(?!.*where)(?!.*;) --> lookahead negativo que no permite la existencia de select, where o ;.
	// (?=.*\d\.$) --> lookahead que verifica que al final de la cadena exista un número seguido de un ".".
	// (?=.*[a-zA-Z0-9ÑñÇç]) --> lookahead que verifica que exista caracteres alfabéticos (incluido ñ y ç) y números.
	/*
	(Este me costó mucho y lo hice fijándome en un ejemplo de internet que era parecido).
	(?=(?:\D*\d){1,3}\D*$) --> Busca un máximo de tres dígitos que no necesariamente van juntos.
	*/
	// .{8,21}$ --> Acepta entre 8 y 21 caracteres de cualquier tipo (".").


	let patron = /^(?![ç,$])(?!.*select)(?!.*where)(?!.*;)(?=.*\d\.$)(?=.*[a-zA-Z0-9ÑñÇç])(?=(?:\D*\d){1,3}\D*$).{8,21}$/;

	
	let devolver=false;
    
	// Elimina el estilo del campo de pass.
	document.getElementById("pass").className = "";

	// Verificación del valor del campo contraseña con su patrón.
	if (patron.test(document.getElementById("pass").value) ){

		// Agrega el estilo correcto al campo de contraseña y lo muestra.
		document.getElementById("pass").className="correcto";	
		salida.innerHTML+='<b class="ok">✓</b> Contraseña: ' + document.getElementById("pass").value + "<br><br>";
		devolver=true;

	}else{
		// Muestra el fallo, añade el foco en el campo con el fallo y agrega el stilo error.
		salida.innerHTML+='<b class="mal">✕</b> El campo: contraseña no es correcto.<br><br>';
		
		document.getElementById("pass").focus();
		document.getElementById("pass").className="error";	
		devolver=false;
	}
	// Retorna el resultado de la validación.
	return (devolver);
}


function validarContraseñaRepetida(){

	let devolver = false;

	// Obtiene el valor del campo de contraseña.
	let passw = document.getElementById("pass").value;
	// Obtiene el valor del campo de contraseña repetida.
	let passwRep = document.getElementById("pass_r").value;

	// Verifica si los valores de ambos campos coinciden y no están vacíos, si coinciden se añade el estilo correcto y se muestra.
	if(passw === passwRep && passw != ""){
		document.getElementById("pass_r").className="correcto";	
		salida.innerHTML+='<b class="ok">✓</b> Contraseña repetida: ' + document.getElementById("pass_r").value + "<br><br>";
		devolver=true;
	}else{

		// Muestra el fallo, añade el foco en el campo con el fallo y agrega el stilo error.
		salida.innerHTML+='<b class="mal">✕</b> El campo: contraseña repetida no coincide.<br><br>';
		
		document.getElementById("pass_r").focus();
		document.getElementById("pass_r").className="error";	
		devolver=false;
	}

	// Retorna el resultado de la validación.
	return (devolver);

}












