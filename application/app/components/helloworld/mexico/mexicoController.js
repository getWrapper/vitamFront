function getExampleData() {
	return [
		{
			id: "1",
			code: "TEST 1",
			description: "Descripción del Test 1",
			active: true
		},
		{
			id: "2",
			code: "TEST 2",
			description: "Descripción del Test 2",
			active: true
		},
		{
			id: "3",
			code: "TEST 3",
			description: "Descripción del Test 3",
			active: false
		},
		{
			id: "4",
			code: "TEST 4",
			description: "Descripción del Test 4",
			active: true
		},
		{
			id: "5",
			code: "TEST 5",
			description: "Descripción del Test 5",
			active: false
		},
		{
			id: "6",
			code: "TEST 6",
			description: "Descripción del Test 6",
			active: true
		}
	];
}
(function() {
	App.controller('mexicoController', ['$scope', '$http', 'Flash', 'MessagesService', 'FormUtilService', 'PaginatorConfigService', 'MexicoService', function ($scope, $http, Flash, MessagesService, FormUtilService, PaginatorConfigService, MexicoService) {
		$scope.mexico = getExampleData();
		$scope.search;
		$scope.form = {};
		$scope.form.code;
	    $scope.form.description;
	    $scope.addUpdate = false;
	    $scope.updateObj = null;
	    $scope.showAdd = function () {
	    	// Se activa bandera para cambiar el título del panel de modificar por agregar
			$scope.addUpdate = true;
			$scope.form = {};
			$scope.form.isAdd = true;
			FormUtilService.resetFormValidations($scope.mexicoForm);
	    };
	    $scope.showUpdate = function (world) {
	    	// Se activa bandera para cambiar el título del panel de agregar por modificar
			$scope.addUpdate = true;
			$scope.form = jQuery.extend(true, {}, world);
			$scope.form.isAdd = false;
			// Se asigna el objeto a modificar del table 
			$scope.updateObj = world;
			FormUtilService.resetFormValidations($scope.mexicoForm);
	    };
	    $scope.cancel = function () {
			$scope.addUpdate = false;
			FormUtilService.resetFormValidations($scope.mexicoForm);
	    };
	    $scope.save = function (valid) {
			if (valid) {
				$scope.addUpdate = false;
				if ($scope.form.isAdd) {
					MexicoService.create($scope);
				} else {
					MexicoService.update($scope);
				}
			}
	    };
		$scope.findByFilter = function () {
	    	MexicoService.findByFilter($scope);
	    }
	    $scope.remove = function (world) {
			MexicoService.remove(world, $scope);
	    };
	    $scope.activate = function (world) {
			MexicoService.activate(world, $scope);
	    };
	    $scope.paginator = PaginatorConfigService.init();
	}]);
})();