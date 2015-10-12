/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.write("<script type='text/javascript' src='util.js'></script>");
var usuario = {
    nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null, clave: null, claveConfirmacion: null
};

function registrarUsuario() {
    usuario.nombre = document.getElementById("nombreUsuario").value;
    usuario.apellido = document.getElementById("apellidoUsuario").value;
    usuario.correo = document.getElementById("correoUsuario").value;
    usuario.clave = document.getElementById("claveUsuario").value;
    usuario.claveConfirmacion = document.getElementById("claveConfirmacionUsuario").value;

    $.ajax({
        url: servicio + 'generic/post/usuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            //función cargar cupones usuario.
            alert('Usuario registrado')
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                alert(mensaje);
            }
        }
    });
}