var pap = pap || {};
pap.AutorizacionController = function () {
    this.$confirmarPage = null;
    this.$domicilioPage = null;
    this.$divAutorizacionesUsuario = null;
    this.$divAutorizacionesDomicilioUsuario = null;
    this.$btnConfirmar = null;
    this.$btnDomicilioConfirmar = null;
    this.$membersCtrlGroup = null;
};
pap.AutorizacionController.prototype.init = function () {
    this.$confirmarPage = $("#confirmar");
    this.$domicilioPage = $("#domicilio");
    this.$divAutorizacionesUsuario = $("#div-autorizaciones-usuario", this.$confirmarPage);
    this.$divAutorizacionesDomicilioUsuario = $("#div-autorizaciones-domicilio-usuario", this.$domicilioPage);
    this.$btnConfirmar = $("#btn-confirmar", this.$confirmarPage);
    this.$btnDomicilioConfirmar = $("#btn-domicilio-confirmar", this.$domicilioPage);

    this.$membersCtrlGroup = $("#members-ctrlgroup", this.$divAutorizacionesUsuario);
};

pap.AlistamientoController = function () {
    this.$mis_ordenesPage = null;
    this.$divAlistamientosUsuario = null;
};

pap.AlistamientoController.prototype.init = function () {
    this.$mis_ordenesPage = $("#mis_ordenes");
    this.$divAlistamientosUsuario = $("#div-alistamientos-usuario", this.$mis_ordenesPage);

};

pap.UsuarioController = function () {
    this.$domicilioPage = null;
    this.$btnDomicilioConfirmar = null;
    this.$direccionesUsuario = null;
    this.$departamentoEnvio = null;
    this.$municipioEnvio = null;
    this.$direccionEnvio = null;
};

pap.UsuarioController.prototype.init = function () {
    this.$domicilioPage = $("#domicilio");
    this.$btnDomicilioConfirmar = $("#btn-domicilio-confirmar", this.$domicilioPage);
    this.$direccionesUsuario = $("#direccionesUsuario", this.$domicilioPage);
    this.$departamentoEnvio = $("#departamentoEnvio", this.$domicilioPage);
    this.$municipioEnvio = $("#municipioEnvio", this.$domicilioPage);
    this.$direccionEnvio = $("#direccionEnvio", this.$domicilioPage);

};

pap.UsuarioController.prototype.cargarDireccionesUsuario = function (usuario) {
    if ($('#direccionesUsuario').has('option').length <= 1) {
        var data = JSON.stringify(usuario);
        $.ajax({
            url: pap.Settings.direccionesUsuarioUrl,
            type: pap.Settings.TYPE_POST,
            dataType: pap.Settings.DATA_TYPE_JSON,
            contentType: pap.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                for (var n = 0; n < resp.length; n++)
                {
                    var object = JSON.parse(resp[n]);
                    $('#direccionesUsuario').append($('<option>', {
                        value: object.tUsuarioSiuDireccionesPK.direccion,
                        text: object.municipio.nombre + ' ' + object.tUsuarioSiuDireccionesPK.direccion
                    }));
                }
                $('#direccionesUsuario').selectmenu('refresh');

            }
        });
    }
};

pap.UsuarioController.prototype.cargarMunicipiosEnvio = function () {
    var codDepartamento = this.$departamentoEnvio.val();
    this.$municipioEnvio.find('option').remove();
    this.$municipioEnvio.append($('<option>', {
        value: -1,
        text: 'Seleccione Ciudad Envio'
    }, true));

    $.ajax({
        url: pap.Settings.municipiosUrl + codDepartamento,
        type: pap.Settings.TYPE_GET,
        dataType: pap.Settings.DATA_TYPE_JSON,
        contentType: pap.Settings.APPLICATION_JSON,
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#municipioEnvio').append($('<option>', {
                    value: object.codigo,
                    text: object.nombre
                }));
            }
        }
    });
    this.$municipioEnvio.selectmenu('refresh');
};



pap.AutorizacionController.prototype.onConfirmar = function () {
//    this.$membersCtrlGroup.find('INPUT').each(function () {
//        var value = $(this).filter(':checked').val();
//        if (value != null) {
//            console.log(value);
//            alert('check => ' + value);
//        }
//    });
    var alistamientoList = [];
    var i = 0;
    $('#members-ctrlgroup').find('INPUT').each(function () {
        var value = $(this).filter(':checked').val();
        alistamiento = new Object();
        alistamientoPK = new Object();
        if (value != null) {
            console.log(value);
            alistamiento.nap = value.split('-')[0];
            alistamientoPK.numeroAlistamiento = value.split('-')[1];
            alistamiento.alistamientoPK = alistamientoPK;
            alistamiento.estado = pap.Estados.ALISTAR_PAP_MOVIL;
            alistamientoList[i] = alistamiento;
            i++;
        }
    });

    if (alistamientoList.length > 0) {
        var data = JSON.stringify({alistamiento: alistamientoList});
        $.ajax({
            url: pap.Settings.confirmarAutorizacionUrl,
            type: pap.Settings.TYPE_POST,
            dataType: pap.Settings.DATA_TYPE_JSON,
            contentType: pap.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                $('#members-ctrlgroup').find('INPUT').each(function () {
                    var value = $(this).filter(':checked').val();
                    if (value != null) {
                        $(this).prop("checked", false).checkboxradio("refresh");
                        $(this).attr("disabled", true);
                    }
                });

                alert('Autorizaciones Alistadas', 'Se envío la solicitud de alistar las solicitudes indicadas.');
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
    } else {
        alert('Seleccione las autorizaciones a confirmar.', 'Indica Autorización');
    }
};

pap.UsuarioController.prototype.onConfirmarDomicilio = function () {
    var alistamientoList = [];
    var i = 0, invisibleStyle = "bi-invisible", invalidInputStyle = "bi-invalid-input", invalidSelect = "bi-invalid-select", camposValidos = true;

    this.$departamentoEnvio.removeClass(invalidSelect);
    this.$municipioEnvio.removeClass(invalidSelect);
    this.$direccionEnvio.removeClass(invalidInputStyle);

    if (this.$departamentoEnvio.val() == -1) {
        this.$departamentoEnvio.addClass(invalidSelect);
        camposValidos = false;
    }
    if (this.$municipioEnvio.val() == -1) {
        this.$municipioEnvio.addClass(invalidSelect);
        camposValidos = false;
    }
    if (this.$direccionEnvio.length <= 1) {
        this.$direccionEnvio.addClass(invalidInputStyle);
        camposValidos = false;
    }
    this.$departamentoEnvio.selectmenu('refresh');
    this.$municipioEnvio.selectmenu('refresh');
    if (!camposValidos) {
        alert('valide los campos.');
        return;
    }

    $('#members-ctrlgroup').find('INPUT').each(function () {
        var value = $(this).filter(':checked').val();
        alistamiento = new Object();
        alistamientoPK = new Object();
        if (value != null) {
            console.log(value);
            alistamiento.nap = value.split('-')[0];
            alistamientoPK.numeroAlistamiento = value.split('-')[1];
            alistamiento.alistamientoPK = alistamientoPK;
            alistamiento.estado = pap.Estados.ALISTAR_PAP_MOVIL_DOMICILIO;
            alistamientoList[i] = alistamiento;
            i++;
        }
    });

    if (alistamientoList.length > 0) {
        var data = JSON.stringify({alistamiento: alistamientoList});
        $.ajax({
            url: pap.Settings.confirmarAutorizacionUrl,
            type: pap.Settings.TYPE_POST,
            dataType: pap.Settings.DATA_TYPE_JSON,
            contentType: pap.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                $('#members-ctrlgroup').find('INPUT').each(function () {
                    var value = $(this).filter(':checked').val();
                    if (value != null) {
                        $(this).prop("checked", false).checkboxradio("refresh");
                        $(this).attr("disabled", true);
                    }
                });

                alert('Autorizaciones Alistadas', 'Se envío la solicitud de alistar las solicitudes indicadas.');
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
    } else {
        alert('Seleccione las autorizaciones que desea a domicilio.', 'Indica Autorización');
    }
};

pap.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario, domicilio) {
    var $divAutorizaciones = "#div-autorizaciones-usuario";
    var $btn = "#btn-confirmar";
    if (domicilio) {
        $divAutorizaciones = "#div-autorizaciones-domicilio-usuario";
        $btn = "#btn-domicilio-confirmar";
    }

    var fset = '<fieldset data-role="controlgroup" id="members-ctrlgroup"><legend>Autorizaciones Usuario</legend>';
    var labels = '';
    $.mobile.loading("show");
//    $("#div-autorizaciones-usuario").html('<p>*** Cargando Autorizaciones ***</p>');
//    $("#div-autorizaciones-usuario").trigger("create");
    $($divAutorizaciones).html('<p>*** Cargando Autorizaciones ***</p>');
    $($divAutorizaciones).trigger("create");

//    $("#btn-confirmar").button();
//    $("#btn-confirmar").prop('disabled', true).button("refresh");
    $($btn).button();
    $($btn).prop('disabled', true).button("refresh");

    $.ajax({
        type: 'POST',
        url: pap.Settings.autorizacionUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
//                $("#btn-confirmar").prop('disabled', false).button("refresh");
                $($btn).prop('disabled', false).button("refresh");
                var object = JSON.parse(resp[i]);
                labels += '<input type="checkbox" value=' + object.nap + '-' + object.alistamientoPK.numeroAlistamiento + ' id="s'
                        + i
                        + '"><label for="s'
                        + i
                        + '">Autorización-'
                        + object.nap
                        + '</label>';
                var labelMx = '';
                for (var ix = 0; ix < object.medicamentoComercialList.length; ix++) {
                    labelMx += '<ul><li>';
                    var mx = object.medicamentoComercialList[ix];
                    labelMx += mx.descripcion;
                    labelMx += '</li></ul>';
                }
                labels += labelMx;
            }
//            $("#div-autorizaciones-usuario").html(fset + labels + '</fieldset>');
//            $("#div-autorizaciones-usuario").trigger("create");
            $($divAutorizaciones).html(fset + labels + '</fieldset>');
            $($divAutorizaciones).trigger("create");

            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
//                $("#div-autorizaciones-usuario").html('<p>' + getMsjSoporte() + '</p>');
                $($divAutorizaciones).html('<p>' + getMsjSoporte() + '</p>');
            } else {
//                $("#div-autorizaciones-usuario").html('<p>' + mensaje + '</p>');
                $($divAutorizaciones).html('<p>' + mensaje + '</p>');
            }
//            $("#div-autorizaciones-usuario").trigger("create");
            $($divAutorizaciones).trigger("create");
        }
    });
};

pap.AlistamientoController.prototype.cargarAlistamientosUsuario = function (usuario) {
    var fset = '';
    var labels = '';
    $.mobile.loading("show");
    $("#div-alistamientos-usuario").html('<p>*** Cargando Alistamientos ***</p>');
    $("#div-alistamientos-usuario").trigger("create");
    $.ajax({
        type: 'POST',
        url: pap.Settings.alistamientoUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            labels += '<table data-role="table" id="movie-table" data-mode="column" class="ui-body-d ui-shadow table-stripe ui-responsive"  data-column-popup-theme="a"> '
                    + '<thead> <th data-priority="persist">Nap</th> <th data-priority="persist">Estado</th> </tr>   </thead> '
                    + '<tbody> ';
            for (var i = 0; i < resp.length; i++) {
                var object = JSON.parse(resp[i]);
                labels += '<tr><td><a href="#alistamiento-popup" onclick="mostrarAlistamientoDetalle(' + object.nap + ',\'' + object.caf.nombre + '\',\'' + object.estado + '\');" '
                        + ' data-rel="popup" data-position-to="window" data-transition="pop" >' + object.nap + '</a></td> '
                        + ' <td>' + object.estado + '</td></tr>';
            }
            labels += '</tbody> </table>';
            $("#div-alistamientos-usuario").html(labels);
            $("#div-alistamientos-usuario").trigger("create");
            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
                $("#div-alistamientos-usuario").html('<p>' + getMsjSoporte() + '</p>');
            } else {
                $("#div-alistamientos-usuario").html('<p>' + mensaje + '</p>');
            }
            $("#div-alistamientos-usuario").trigger("create");
        }
    });
};

function mostrarAlistamientoDetalle(nap, caf, estado) {
    $('#alistamiento-detalle').html('<p>Caf: ' + caf + '</p><p>Autorización: ' + nap + '</p><p>Estado: ' + estado + '</p>');
}
