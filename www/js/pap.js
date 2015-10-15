/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.write("<script type='text/javascript' src='util.js'></script>");

var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null, clave: null, claveConfirmacion: null, sexo: null
};

function registrarUsuario() {
    usuario.codTipoDocumento = document.getElementById("tipoDocumentoUsuario").value;
    usuario.documentoIdentidad = document.getElementById("documentoUsuario").value;
    usuario.nombre = document.getElementById("nombreUsuario").value;
    usuario.apellido = document.getElementById("apellidoUsuario").value;
    usuario.correo = document.getElementById("correoUsuario").value;
    usuario.clave = document.getElementById("claveUsuario").value;
    usuario.claveConfirmacion = document.getElementById("claveConfirmacionUsuario").value;
    if ($('#radio1:checked').val() !== 'undefined') {
        usuario.sexo = $('#radio1:checked').val();
    }
    if ($('#radio2:checked').val() !== 'undefined') {
        usuario.sexo = $('#radio2:checked').val();
    }
    
    $.ajax({
        url: servicio + 'generic/post/usuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            //función cargar cupones usuario.
            alert('Usuario registrado');
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

function iniciarSesion() {   
    usuario.documentoIdentidad = document.getElementById("documentoUsuario").value;    
    usuario.clave = document.getElementById("claveUsuario").value;
    $.ajax({
        url: servicio + 'generic/post/validarUsuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            //función cargar cupones usuario.
            alert('Usuario logueado');
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
