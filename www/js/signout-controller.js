var pap = pap || {};

pap.SignOutController = function () {

    this.$signInPage = null;    
    this.$btnSubmit = null;
    this.$ctnErr = null;    
    this.papPageId=null;
};

pap.SignOutController.prototype.init = function () {
    this.$signInPage = $("#page-signin");    
    this.papPageId = "#pap";
    this.$btnSubmit = $("#btn-submit", this.papPageId);    
};

pap.SignOutController.prototype.cerrarSession = function () {
    pap.Session.deleteInstance();
    $.mobile.navigate(this.$signInPage);
};
