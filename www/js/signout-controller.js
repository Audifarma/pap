var pap = pap || {};

pap.SignOutController = function () {

    this.$signInPage = null;
    this.bookingsPageId = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtdocumento = null;
    this.$txtPassword = null;
    this.$txtRegId = null;
    this.$chkKeepSignedIn = null;
};

pap.SignOutController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.bookingsPageId = "#pap";
    this.papPageId = "#pap";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtdocumento = $("#txt-documento", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$txtRegId = $("#txt-regId", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};
