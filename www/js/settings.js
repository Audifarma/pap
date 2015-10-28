var pap = pap || {};
pap.Settings = pap.Settings || {};
pap.Settings.signUpUrl = "http://127.0.0.1:30000/api/account/register";  //"http://192.168.1.104:30000/api/account/register"; //;
pap.Settings.signInUrl = "http://localhost:9090/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/account/logon"; //"http://192.168.1.104:30000/api/account/logon"; //
pap.Settings.bookingsUrl = "http://localhost:9090/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/bookings"; //"http://192.168.1.104:30000/api/bookings"; //
pap.Settings.sessionIdKey = "pap-session";
pap.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.