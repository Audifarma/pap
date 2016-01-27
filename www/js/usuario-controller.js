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
//                    $(this).attr("checked", false);
                    $(this).removeAttr('checked');
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


};

pap.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario) {
    var fset = '<fieldset data-role="controlgroup" id="members-ctrlgroup"><legend>Autorizaciones Usuario</legend>';
//    var labels = '<input type="checkbox" id="c'
//            + usuario.codTipoDocumento
//            + '"><label for="c'
//            + usuario.codTipoDocumento
//            + '">'
//            + usuario.documentoIdentidad
//            + '</label>';

    var labels = '';
    $.mobile.loading("show");
    $("#div-autorizaciones-usuario").html('<p>*** Cargando Autorizaciones ***</p>');
    $("#div-autorizaciones-usuario").trigger("create");
    $.ajax({
        type: 'POST',
        url: pap.Settings.autorizacionUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
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
//            this.$divAutorizacionesUsuario.html(fset + labels + '</fieldset>');
//            this.$divAutorizacionesUsuario.trigger("create");
            $("#div-autorizaciones-usuario").html(fset + labels + '</fieldset>');
            $("#div-autorizaciones-usuario").trigger("create");
            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
//                mensajeSoporte();
            } else {
                $("#div-autorizaciones-usuario").html('<p>' + mensaje + '</p>');
                $("#div-autorizaciones-usuario").trigger("create");
            }
        }
    });
};