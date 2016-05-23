var servicio = "http://190.14.226.155:8095/paprs/webresources/";

var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null,
    clave: null, claveConfirmacion: null, sexo: null, direccion: null, telefono: null, telefonoCelular: null, regId: null, tUsuarioSiuDirecciones: tUsuarioSiuDirecciones
};

var solicitudRegistro = {
    codSolicitudRegistro: 0, codCliente: 0, codDpto: 0, codCiudad: 0, fechaRegistro: null, horaRegistro: null
};

var alistamientoPK = {
    codEmpresa: 0, codCaf: null, numeroAlistamiento: 0
};

var alistamiento = {
    alistamientoPK: alistamientoPK, nap: null, estado: null
};

var tUsuarioSiuDireccionesPK = {
    codTipoDocumento: 0, documentoIdentidad: null, codMpio: 0, direccion: null
};

var tUsuarioSiuDirecciones = {
    tUsuarioSiuDireccionesPK: tUsuarioSiuDireccionesPK, telefono: null
};
//var servicio = "http://10.1.1.185:8095/paprs/webresources/";
//var servicio = "http://localhost:9090/webresources/";
//var servicio = "http://localhost:8080/webresources/";
//var servicio = "http://localhost:8091/webresources/";

var pap = pap || {};
pap.Settings = pap.Settings || {};
pap.Estados = pap.Estados || {};
pap.Estados.ALISTAR_PAP_MOVIL = 'ALISTAR_PAP_MOVIL';
pap.Estados.ALISTAR_PAP_MOVIL_DOMICILIO = 'ALISTAR_PAP_MOVIL_DOMICILIO';
pap.Settings.TYPE_POST = 'POST';
pap.Settings.TYPE_GET = 'GET';
pap.Settings.APPLICATION_JSON = 'application/json';
pap.Settings.DATA_TYPE_JSON = 'json';

//pap.Settings.signUpUrl = "http://127.0.0.1:30000/api/account/register";  //"http://192.168.1.104:30000/api/account/register"; //;
//pap.Settings.signInUrl = "http://190.14.226.155:8095/paprs/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/account/logon"; //"http://192.168.1.104:30000/api/account/logon"; //
pap.Settings.signInUrl = servicio + "generic/post/validarUsuario";
pap.Settings.recordarUrl = servicio + "generic/post/recordarUsuario";
pap.Settings.autorizacionUrl = servicio + "pap/get/autorizacionesUsuario";
pap.Settings.confirmarAutorizacionUrl = servicio + 'pap/post/autorizacionesUsuario';
pap.Settings.alistamientoUrl = servicio + "pap/get/alistamientosUsuario";
pap.Settings.bookingsUrl = servicio + "generic/post/validarUsuario";
pap.Settings.direccionesUsuarioUrl = servicio + "generic/get/direccionesUsuario";
pap.Settings.sessionIdKey = "pap-session";
pap.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.
pap.Settings.usuario = usuario;
pap.Settings.solicitudRegistro = solicitudRegistro;
pap.Settings.municipiosUrl = servicio + 'generic/get/municipios/';

