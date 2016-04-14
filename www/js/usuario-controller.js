var pap = pap || {};
pap.AutorizacionController = function () {
    this.$confirmarPage = null;
    this.$divAutorizacionesUsuario = null;
    this.$btnConfirmar = null;
    this.$membersCtrlGroup = null;
};
pap.AutorizacionController.prototype.init = function () {
    this.$confirmarPage = $("#confirmar");
    this.$divAutorizacionesUsuario = $("#div-autorizaciones-usuario", this.$confirmarPage);
    this.$btnConfirmar = $("#btn-confirmar", this.$confirmarPage);
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

pap.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario) {
    var fset = '<fieldset data-role="controlgroup" id="members-ctrlgroup"><legend>Autorizaciones Usuario</legend>';
    var labels = '';
    $.mobile.loading("show");
    $("#div-autorizaciones-usuario").html('<p>*** Cargando Autorizaciones ***</p>');
    $("#div-autorizaciones-usuario").trigger("create");
    $("#btn-confirmar").button();
    $("#btn-confirmar").prop('disabled', true).button("refresh");;
    $.ajax({
        type: 'POST',
        url: pap.Settings.autorizacionUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
                $("#btn-confirmar").prop('disabled', false).button("refresh");
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
            $("#div-autorizaciones-usuario").html(fset + labels + '</fieldset>');
            $("#div-autorizaciones-usuario").trigger("create");
            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
                $("#div-autorizaciones-usuario").html('<p>' + getMsjSoporte() + '</p>');
            } else {
                $("#div-autorizaciones-usuario").html('<p>' + mensaje + '</p>');
            }
            $("#div-autorizaciones-usuario").trigger("create");
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
                    labels +='<tr><td><a href="#alistamiento-popup" onclick="mostrarAlistamientoDetalle(' + object.nap+ ',\''+object.caf.nombre+'\',\''+object.estado+'\');" '    
                        +' data-rel="popup" data-position-to="window" data-transition="pop" >'+object.nap+'</a></td> '
                        +' <td>'+object.estado+'</td></tr>' ;
            }
            labels += '</tbody> </table>';
            $("#div-alistamientos-usuario").html(labels );
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

function mostrarAlistamientoDetalle(nap,caf,estado) {
    $('#alistamiento-detalle').html('<p>Caf: '+caf+'</p><p>Autorización: '+nap+'</p><p>Estado: '+estado+'</p>');
}
