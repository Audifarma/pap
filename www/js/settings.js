var servicio = "http://190.14.226.155:8095/paprs/webresources/";

var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null,
    clave: null, claveConfirmacion: null, sexo: null, direccion: null, telefono: null, telefonoCelular: null, regId: null
};

var solicitudRegistro = {
    codSolicitudRegistro: 0, codCliente: 0, codDpto: 0, codCiudad: 0, fechaRegistro: null, horaRegistro: null
};
//var servicio = "http://10.1.1.185:8095/paprs/webresources/";
//var servicio = "http://localhost:9090/webresources/";
//var servicio = "http://localhost:8080/webresources/";
//var servicio = "http://localhost:8091/webresources/";

var pap = pap || {};
pap.Settings = pap.Settings || {};
pap.Settings.signUpUrl = "http://127.0.0.1:30000/api/account/register";  //"http://192.168.1.104:30000/api/account/register"; //;
//pap.Settings.signInUrl = "http://190.14.226.155:8095/paprs/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/account/logon"; //"http://192.168.1.104:30000/api/account/logon"; //
pap.Settings.signInUrl = servicio + "generic/post/validarUsuario";//"http://localhost:8080/webresources/generic/post/validarUsuario";
pap.Settings.autorizacionUrl = servicio + "pap/get/autorizacionesUsuario";//"http://localhost:8080/webresources/generic/post/validarUsuario";
pap.Settings.bookingsUrl = servicio + "generic/post/validarUsuario";//"http://localhost:9090/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/bookings"; //"http://192.168.1.104:30000/api/bookings"; //
pap.Settings.sessionIdKey = "pap-session";
pap.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.
pap.Settings.usuario = usuario;
pap.Settings.solicitudRegistro = solicitudRegistro;

