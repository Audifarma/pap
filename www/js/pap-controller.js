var pap = pap || {};

pap.PapController = function () {
    this.$papPage = null;
    this.$confirmarPage = null;
    this.$divIniciarConfirmacion = null;
    this.$labelUsuarioRegistrado = null;
};

pap.PapController.prototype.init = function () {
    this.$autorizacionPage = $("#pap");
    this.$confirmarPage = $("#confirmar");  
    this.$divIniciarConfirmacion = $("#div-iniciar-confirmacion", this.$autorizacionPage);
    this.$labelUsuarioRegistrado = $("#label-usuario-registrado", this.$autorizacionPage);
};

pap.PapController.prototype.iniciarConfirmacion = function () {
    console.log("se debe mover el metodo de navegación")
    //$.mobile.navigate(this.$confirmarPage);
    return;
};