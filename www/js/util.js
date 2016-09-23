//var servicio = "http://190.14.226.155:8095/paprs/webresources/";
//var servicio = "http://localhost:9090/webresources/";
//var servicio = "http://localhost:8080/webresources/";

function message(e) {
    var html = $.parseHTML(e.responseText)
    if (html != null) {
        for (var i = 0; i < html.length; i++) {
            if (html[i].innerHTML != null && html[i].innerHTML.indexOf('java.lang') !== -1) {
                return html[i].innerHTML.split(":")[1].replace("&lt;","<").replace("&lt;","<").replace("&gt;",">").replace("&gt;",">")
            }
        }
    }
}

function mensajeSoporte() {
    alert('Error no controlado, contactenos para asistirte o intenta de nuevo.');
}

function getMsjSoporte() {
    return 'Ocurrio un problema no controlado. Por favor intentelo en unos minutos.';
}


function status() {
    return "<center><img src='./img/spinner.gif'/></center>";
}
