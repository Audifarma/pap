var pap = pap || {}, papUsuario = papUsuario || {};

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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

//app.signUpController = new pap.SignUpController();
app.signInController = new pap.SignInController();
app.registroUsuarioController = new pap.RegistroUsuarioController();
app.autorizacionController = new papUsuario.AutorizacionController();
//app.bookingsController = new pap.BookingsController();

$(document).delegate("#page-signin", "pagebeforecreate", function () {

    app.signInController.init();

    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

$(document).delegate("page-bookings", "pagebeforecreate", function () {

    app.bookingsController.init();

    app.signInController.$btnRefresh.off("tap").on("tap", function () {
        app.bookingsController.onRefreshCommand();
    });

    // Show  the list of bookings.
    app.bookingsController.showBookings();
});

$(document).delegate("#divRegistrarUsuario", "pagebeforecreate", function () {
    app.registroUsuarioController.init();
});

$(document).delegate("#confirmar", "pagebeforecreate", function () {
    app.autorizacionController.init();
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
