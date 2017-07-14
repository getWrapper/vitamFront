(function() {
	App.controller('formExampleController', ['$scope', '$http', 'Flash', 'MessagesService', 'FormUtilService', 'PaginatorConfigService', 'formExampleService', function ($scope, $http, Flash, MessagesService, FormUtilService, PaginatorConfigService, formExampleService) {
		$scope.form = {};
		$scope.save = function(valid){
			console.log("Guardando...");
		}
	}]);
})();