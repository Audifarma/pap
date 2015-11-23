var papUsuario = papUsuario || {};

papUsuario.AutorizacionController = function () { 
    this.$autorizacionPage = null;
};

papUsuario.AutorizacionController.prototype.init = function () {
    this.$autorizacionPage = $("#confirmar");  
};

papUsuario.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario) {
    
};