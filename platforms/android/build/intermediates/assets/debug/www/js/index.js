var pap = pap || {};

// Begin boilerplate code generated with Cordova project.
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        document.addEventListener("backbutton", backButtonHandler, false);
        var push = PushNotification.init({
            "android": {
                "senderID": "372883883978"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"},
            "windows": {}
        });

        push.on('registration', function (data) {
            console.log("registration event");
            document.getElementById("txt-regId").value = data.registrationId;
            console.log(JSON.stringify(data));
        });

        push.on('notification', function (data) {
            console.log("notification event");
            console.log(JSON.stringify(data));
            //var cards = document.getElementById("cards");
            var card = '<div class="row">' +
                    '<div class="col s12 m6">' +
                    '  <div class="card darken-1">' +
                    '    <div class="card-content black-text">' +
                    '      <span class="card-title black-text">' + data.title + '</span>' +
                    '      <p>' + data.message + '</p>' +
                    '    </div>' +
                    '  </div>' +
                    ' </div>' +
                    '</div>';
            //cards.innerHTML += card;

            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function (e) {
            console.log("push error");
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function backButtonHandler (e )
{
    if (pap.Session.getInstance().get().userProfileModel ) {
        navigator.app.backHistory();
    }
    else {
        $.mobile.changePage('#page-index');
    }
    alert(pap.Session.getInstance().get().userProfileModel);
}
            
app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

//app.signUpController = new pap.SignUpController();
app.signInController = new pap.SignInController();
//app.signOutController = new pap.SignOutController();
app.registroUsuarioController = new pap.RegistroUsuarioController();
app.autorizacionController = new pap.AutorizacionController();
app.usuarioController = new pap.UsuarioController();
app.alistamientoController = new pap.AlistamientoController();
app.papController = new pap.PapController();
//app.bookingsController = new pap.BookingsController();

$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signInController.init();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

$(document).delegate("#page-remember", "pagebeforecreate", function () {
    app.signInController.initRemember();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onRememberCommand();
    });
});

$(document).delegate("page-bookings", "pagebeforecreate", function () {

    app.bookingsController.init();

    app.signInController.$btnRefresh.off("tap").on("tap", function () {
        app.bookingsController.onRefreshCommand();
    });

    // Show  the list of bookings.
//    app.bookingsController.showBookings();
});

$(document).delegate("#divRegistrarUsuario", "pagebeforecreate", function () {
    app.registroUsuarioController.init();
});

$(document).delegate("#cerrarSesion", "pagebeforecreate", function () {
    app.signOutController.init();
    app.signOutController.$btnSubmit.off("tap").on("tap", function () {
        app.signOutController.cerrarSession();
    });
});

$(document).delegate("#confirmar", "pagebeforecreate", function () {
    app.autorizacionController.init();
//    var usuario = pap.Session.getInstance().get().usuario;
//    app.autorizacionController.cargarAutorizacionesUsuario(usuario);
//    cargarMapa();
    app.autorizacionController.$btnConfirmar.off("tap").on("tap", function () {
        app.autorizacionController.onConfirmar();
    });
});

$(document).delegate("#domicilio", "pagebeforecreate", function () {
//    app.autorizacionController.init();
    app.usuarioController.init();
    app.usuarioController.cargarDireccionesUsuario(pap.Session.getInstance().get().usuario)
    app.usuarioController.$btnDomicilioConfirmar.off("tap").on("tap", function () {
        app.usuarioController.onConfirmarDomicilio();
        app.usuarioController.cargarDireccionesUsuario(pap.Session.getInstance().get().usuario)
    });

    app.usuarioController.$departamentoEnvio.change(function () {
        app.usuarioController.cargarMunicipiosEnvio();
    });
    app.usuarioController.$direccionesUsuario.change(function () {
        app.usuarioController.onSeleccionarDireccion();
    });


});

$(document).delegate("#confirmar", "pageshow", function () {
    var usuario = pap.Session.getInstance().get().usuario;
    app.autorizacionController.cargarAutorizacionesUsuario(usuario, false);
    cargarMapa();
});
$(document).delegate("#domicilio", "pageshow", function () {
    var usuario = pap.Session.getInstance().get().usuario;
    app.autorizacionController.cargarAutorizacionesUsuario(usuario, true);
});

$(document).delegate("#mis_ordenes", "pagebeforecreate", function () {
    app.alistamientoController.init();
});

$(document).delegate("#mis_ordenes", "pageshow", function () {
    var usuario = pap.Session.getInstance().get().usuario;
    app.alistamientoController.cargarAlistamientosUsuario(usuario);
});

$(document).delegate("#pap", "pagebeforecreate", function () {
    app.papController.init();
    $("#usuario-registrado").text(pap.Session.getInstance().get().userProfileModel);
    app.papController.$labelUsuarioRegistrado.text(pap.Session.getInstance().get().userProfileModel);
    app.papController.$linkCerrarSession.off("tap").on("tap", function () {
        app.papController.cerrarSession();
    });
    app.papController.$divIniciarConfirmacion.off("tap").on("tap", function () {
        app.papController.iniciarConfirmacion();
    });

});

$(document).on("pagecontainerbeforechange", function (event, ui) {

    if (typeof ui.toPage !== "object")
        return;

    switch (ui.toPage.attr("id")) {
        case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = pap.Session.getInstance().get(),
                        today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#pap");
                }
            }
    }
});

function validarRegistroUsuario(usuario, solicitudRegistro) {
    return app.registroUsuarioController.validarRegistroUsuario(usuario, solicitudRegistro);
}