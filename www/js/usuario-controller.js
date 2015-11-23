var pap = pap || {};

pap.AutorizacionController = function () { 
    this.$autorizacionPage = null;
};

pap.AutorizacionController.prototype.init = function () {
    this.$autorizacionPage = $("#confirmar");  
};

pap.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario) {
    
};