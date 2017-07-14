(function () {
    App.controller('SessionController', ['$scope', 'RestService', '$mdDialog', function ($scope, RestService, $mdDialog) {
        $scope.renewToken = function () {
            RestService.renewToken('', true);
        }
    }]);
})();