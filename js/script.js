var nombre, apellidos, email, fchN, tel;
var encuesta, enviado;
var pre1, pre2, pre3, libros, comen

function encuesta() {
    var nombreU = document.getElementById("nombre").value;
    var apellidosU = document.getElementById("apellidos").value;
    var emailU = document.getElementById("email").value;
    var fchU = document.getElementById("fchNac").value;
    var telU = document.getElementById("tel").value;

    if (nombreU != "" && apellidosU != "" && emailU != "" && telU != "" && fchU != "") {
        if (validarEmail(emailU)) {
            if (validarFecha(fchU)) {
                if (validarTel(telU)) {
                    debugger;
                    document.cookie = "nombre=" + nombreU;
                    document.cookie = "apellidos=" + apellidosU;
                    document.cookie = "email=" + emailU;
                    document.cookie = "fechaNacimiento=" + fchU;
                    document.cookie = "telefono=" + telU;
                    location.href = "./encuesta.html";
                } else {
                    alert("El teléfono es incorrecto")
                }
            } else {
                alert("La fecha es incorrecta")
            }
        } else {
            alert("El correo electrónico es incorrecto")
        }
    } else {
        alert("Es obligatorio rellenar todo el formulario")
    }
}

function validarTel(tel) {
    var valido = false;

    if (/^(\d{9})/.test(tel)) {
        valido = true;
    } else {
        valido = false;
    }
    return valido;
}

function validarEmail(mail) {
    var valido = false;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
        valido = true;
    } else {
        valido = false;
    }
    return valido;
}

function validarFecha(fch) {
    var valido = false;
    var correcto = false;

    var fchNacimiento = fch;
    var fecha = fchNacimiento.split("/")
    var dia = fecha[0];
    var mes = fecha[1];
    var anyo = fecha[2];

    var fNac = new Date(mes + "," + dia + "," + anyo);
    var fchActual = new Date();

    if (/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(fch)) {
        valido = true;
    } else {
        valido = false;
    }
    if (valido) {
        if (fNac < fchActual) {
            correcto = true;
        } else {
            alert("La fecha debe ser menor a la fecha actual")
            correcto = false;
        }
    }

    return correcto;
}

function nomApe(evento) {
    var letraCod = event.keyCode;
    if (letraCod >= 65 && letraCod <= 90 || letraCod >= 97 && letraCod <= 122) {
        return true;
    } else
        return false;
}

function contardor() {
    var total = 200;
    var cantidad = total - document.getElementById("comentar").value.length;
    document.getElementById('numCaracteres').innerHTML = 'Puedes escribir hasta ' + cantidad + ' carácter/es adicional/es';

    if (cantidad == 0) {
        document.getElementById('numCaracteres').innerHTML = 'Ya no se pueden escribir más carácteres';
    }
}


function ver() {
    document.getElementById("datos").style.display = "block"
}

function ocultar() {
    document.getElementById("datos").style.display = "none";
}

var memoria = "";

function agregar(id) {
    var libro = prompt("Nombre de su libro favorito:");
    libro = libro.trim();
    var pos = document.getElementById(id);
    var listaNode = document.createElement("li");

    if (memoria.includes(libro)) {
        alert("Lo siento no se puede añadir ese libro")
    } else {
        listaNode.innerHTML = libro;
        pos.appendChild(listaNode);
        memoria = memoria + ' ' + libro;
    }
}

function eliminar(id) {
    var elemento = prompt("Nombre de la propiedad o método a eliminar:");
    var pos = document.getElementById(id);
    var listaEle = document.getElementsByTagName("li");
    var encontrado = false;
    var elementoEliminar;

    if (memoria.includes(elemento)) {
        for (var i = 0; i < memoria.length && encontrado == false; i++) {
            if (listaEle[i].textContent == elemento) {
                encontrado = true;
                elementoEliminar = listaEle[i];
            }
        }
        memoria = memoria.replace(elemento, " ");
        elementoEliminar.parentElement.removeChild(elementoEliminar);
    } else {
        alert("El elemento o método \"" + elemento + "\" no se encuentra en la lista");
    }
}
var radio1 = "¿Le gusta leer?";
var radio2 = "¿Qué momento del día prefiere para la lectura?";
var pregunta2;

function valorRadio(grupo) {
    var res;
    var radios;
    if (grupo == "pregunta1") {
        radios = document.encuesta.pregunta1.value;
        if (radios.length == 0) radios = "No responde";
        res = radio1 + "" + radios;
    } else {
        radios = document.encuesta.pregunta3.value;
        if (radios.length == 0) radios = "No responde";
        res = radio2 + " " + radios;
    }
    return res;
}

function enviar() {
    debugger;

    pregunta2 = document.getElementById("pregunta2").getElementsByTagName("input");
    pre2 = "Los libros que lee, generalmente... \n";

    pre1 = valorRadio("pregunta1");

    for (i = 0; i < pregunta2.length; i++) {
        if (pregunta2[i].checked) {
            pre2 = pre2 + pregunta2[i].value + ", ";
        }
    }
    pre3 = valorRadio("pregunta3");
    if (document.getElementById("listaLibros").hasChildNodes == true) {
        var librosLi = document.getElementById("listaLibros").childNodes;
        for (j = 0; j < librosLi.length; j++) {
            libros = libros + librosLi[j].textContent + ", ";
        }
    } else {
        libros = "No tiene libros favoritos";
    }
    comen = document.getElementById("comentar").value;

    document.cookie = "pregunta1=" + pre1;
    document.cookie = "pregunta2=" + pre2;
    document.cookie = "pregunta3=" + pre3;
    document.cookie = "comentario=" + comen;

    location.href = "./enviado.html";
}

function cargarDatos() {
    debugger;
    var divDatos = document.getElementById("datos");
    divDatos.innerHTML = "<h2>Datos personales</h2>" +
        "Nombre:" + mostrarCookie(nombre) + "\nApellidos:" + mostrarCookie(apellidos) +
        "Email:" + mostrarCookie(email) + "\nFecha de nacimiento:" + mostrarCookie(fechaNacimiento) +
        "Teléfono:" + mostrarCookie(telefono)
        // + "\n <hr> \n" + "<h2>Respuestas de la encuesta</h2>" +
        // "Pregunta 1:\n" + mostrarCookie(pregunta1) + "\nPergunta2:\n" + mostrarCookie(pregunta1) +
        // "Pergunta 3 \n:" + mostrarCookie(pregunta1) + "\nComentario: \n" + mostrarCookie(comentario);
}

function mostrarCookie(nombre) {
    debugger;

    var listaDatosPer = document.cookie.split(";");
    for (i in listaDatosPer) {
        var busca = listaDatosPer[i].search(nombre);
        if (busca > -1) { micookie = listaDatosPer[i] }
    }

    var igual = micookie.indexOf("=");
    var valor = micookie.substring(igual + 1);

    return valor;

}

// https: //cybmeta.com/cookies-en-javascript
//https://tutobasico.com/cookies-javascript/
//https://geekytheory.com/gestion-de-cookies-en-javascript
//https://developer.mozilla.org/es/docs/DOM/document.cookie