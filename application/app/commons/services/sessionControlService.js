var sessionExpiredTimeout;
var renewToken;
/* 
 * ATENTION: Do not touch this file, unless you really know what are you doing.
 * 
 * If you want to restart the contdown from an event different from a rest call,
 * use the method: renewCounter, from your Controller.
 * 
 * Example: SessionControlService.renewCounter();
 */
App.factory("SessionControlService", ["$http", "$timeout", "$location", "$mdDialog", "$sessionStorage", "SystemParamConstants", "MessagesService", function ($http, $timeout, $location, $mdDialog, $sessionStorage, SystemParamConstants, MessagesService) {
    var showingModal = false;
    var sessionControlServices = {
        addCounter: function ($scope) {
            if (!showingModal && sessionStorage.getItem("freeAccess") ==! 'true') {
                var timeout = SystemParamConstants.MILLISECONDS_TO_SHOW_COUNTDOWN;
                // If near of token expired
                if(parseInt(sessionStorage.getItem("expDate")) < (new Date().getTime() + SystemParamConstants.MILLISECONDS_TO_SHOW_COUNTDOWN)) {
                    timeout = parseInt(sessionStorage.getItem("expDate")) - new Date().getTime() - 60000;
                }
                // For debug purposes:
                /*console.log("Time to show modal: ");
                console.log(new Date(new Date().getTime() + timeout).toString());
                console.log(timeout);
                var minutes = Math.floor(timeout / 60000);
                var seconds = ((timeout & 60000) / 1000).toFixed(0);
                console.log("Minutes to call modal: " + minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
                */
                sessionExpiredTimeout = $timeout(sessionControlServices.showModalCountdown, timeout);
            }
        },
        removeCounter: function ($scope) {
            $timeout.cancel(sessionExpiredTimeout);
        },
        renewCounter: function ($scope) {
            /* 
             * If you want to restart the countdown to diplay the session validation modal use this method
             */
            sessionControlServices.removeCounter();
            sessionControlServices.addCounter();
        },
        showModalCountdown: function ($scope) {
            sessionControlServices.removeCounter();
            if ($location.path() != SystemParamConstants.LOGIN_FILE && !showingModal) {
                showingModal = true;
                $mdDialog.show({
                    controller: SessionControlDialogController,
                    templateUrl: 'app/commons/templates/sessionTimeout.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            }
        },
        logoutBySessionExpired: function ($scope) {
            $sessionStorage.showMenu = false;
            $sessionStorage.getInfoUser = false;
            delete $sessionStorage.menus;
            delete $sessionStorage.user;
            delete $sessionStorage.expDate;
            delete $sessionStorage.token;
            sessionStorage.setItem("userGroups", undefined);
            sessionStorage.setItem("isLogged", false);
            sessionStorage.setItem("token", undefined);
            $location.path(SystemParamConstants.LOGIN_FILE);
        }
    };

    function SessionControlDialogController($scope, $mdDialog) {
        $scope.continue = function () {
            showingModal = false;
            sessionControlServices.renewCounter();
            renewToken = true;
            $mdDialog.hide();
        }

        $scope.closeSession = function () {
            $mdDialog.hide();
            MessagesService.error("{{'msg.common.ws.token.expiration' | translate}}");
            sessionControlServices.logoutBySessionExpired();
            showingModal = false;
        }
    }

    return sessionControlServices;
}]);