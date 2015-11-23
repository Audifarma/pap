var pap = pap || {};

pap.AutorizacionController = function () {
    this.$confirmarPage = null;
    this.$divAutorizacionesUsuario = null;
};

pap.AutorizacionController.prototype.init = function () {
    this.$confirmarPage = $("#confirmar");
    this.$divAutorizacionesUsuario = $("#div-autorizaciones-usuario", this.$confirmarPage);
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

    var labels = null;
    $.mobile.loading("show");
    console.log(pap.Settings.autorizacionUrl);
    $.ajax({
        type: 'POST',
        url: pap.Settings.autorizacionUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
                var object = JSON.parse(resp[i]);
                labels += '<input type="checkbox" id="s'
                        + i
                        + '"><label for="s'
                        + i
                        + '">'
                        + object.medicamentoComercial.descripcion
                        + '</label>';
            }

//            this.$divAutorizacionesUsuario.html(fset + labels + '</fieldset>');
//            this.$divAutorizacionesUsuario.trigger("create");
            $("#div-autorizaciones-usuario").html(fset + labels + '</fieldset>');
            $("#div-autorizaciones-usuario").trigger("create");

            $.mobile.loading("hide");

        }, error: function (e) {
            $.mobile.loading("hide");
            console.log(message(e));
        }
    });



};