var pap = pap || {};

pap.SignInController = function () {

    this.$signInPage = null;
    this.bookingsPageId = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtdocumento = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
};

pap.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.bookingsPageId = "#pap";
    this.papPageId = "#pap";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtdocumento = $("#txt-documento", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

pap.SignInController.prototype.emailAddressIsValid = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

pap.SignInController.prototype.resetSignInForm = function () {

    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtdocumento.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtdocumento.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);

};
var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null, clave: null, claveConfirmacion: null, sexo: null
};
pap.SignInController.prototype.onSignInCommand = function () {

    var me = this,
        emailAddress = me.$txtdocumento.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtdocumento.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtdocumento.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Porfavor ingrese los datos requeridos.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

//    if (!me.emailAddressIsValid(emailAddress)) {
//        me.$ctnErr.html("<p>Please enter a valid email address.</p>");
//        me.$ctnErr.addClass("bi-ctn-err").slideDown();
//        me.$txtdocumento.addClass(invalidInputStyle);
//        return;
//    }
    usuario.documentoIdentidad = emailAddress ;    
    usuario.clave = password;
    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: pap.Settings.signInUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),//"email=" + emailAddress + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");

            if (resp.success === true) {
                // Create session.                 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + pap.Settings.sessionTimeoutInMSec);

                pap.Session.getInstance().set({
                    userProfileModel: resp.nombre,
                    sessionId: resp.correo,
                    expirationDate: expirationDate,
                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
                });
                // Go to main menu.
                $.mobile.navigate(me.papPageId);
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case pap.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case pap.ApiMessages.INVALID_PWD:
                        case pap.ApiMessages.EMAIL_NOT_FOUND:
                            me.$ctnErr.html("<p>Usuario o contraseña incorrectos.  Por favor intentelo nuevamente.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            me.$txtdocumento.addClass(invalidInputStyle);
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};