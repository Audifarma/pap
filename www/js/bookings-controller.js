var pap = pap || {};

pap.BookingsController = function () {
    this.localStorageKey = "pap.bookings";
    this.$bookingsPage = null;
    this.$btnRefresh = null;
};

pap.BookingsController.prototype.init = function () {
    this.$bookingsPage = $("#page-bookings");
    this.$btnRefresh = $("#btn-refresh", this.$bookingsPage);
};

pap.BookingsController.prototype.getBookingsFromLocalStorage = function () {
    return window.localStorage.getItem(this.localStorageKey) || [];
};

pap.BookingsController.prototype.showBookings = function () {

    var bookings = this.getBookingsFromLocalStorage();

    // TODO: Build bookings DOM.
};

pap.BookingsController.prototype.getBookingsFromServer = function (successCallback, errorCallback) {
    var session = pap.Session.getInstance().get();

    if (!session) {
        return errorCallback({ err: pap.ApiMessages.SESSION_NOT_FOUND });
    }

    $.ajax({
        type: 'GET',
        url: pap.Settings.bookingsUrl + "/sessionId=" + session.sessionId,
        success: successCallback,
        error: errorCallback
    });
};

pap.BookingsController.prototype.onRefreshCommand = function () {
    
    this.getBookingsFromServer(
        function (resp) {
            // TODO
        },
        function (error) {
            // TODO
        }
    );
};