function getDetalleConsulta() {
	return [
		{
			prescription_id: "F001",
			ean_code: "F10001",
			description: "Descripción medicamento",
			qty_prod_deliver: "2",
			quantity_dose: "1",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		},
		{
			prescription_id: "F002",
			ean_code: "F10002",
			description: "Descripción medicamento",
			qty_prod_deliver: "2",
			quantity_dose: "1",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		},
		{
			prescription_id: "F003",
			ean_code: "F10003",
			description: "Descripción medicamento",
			qty_prod_deliver: "2",
			quantity_dose: "1",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		},
		{
			prescription_id: "F004",
			ean_code: "F10004",
			description: "Descripción medicamento",
			qty_prod_deliver: "2",
			quantity_dose: "1",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		},
		{
			prescription_id: "F005",
			ean_code: "F10005",
			description: "Descripción medicamento",
			qty_prod_deliver: "4",
			quantity_dose: "2",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		},
		{
			prescription_id: "F006",
			ean_code: "F10006",
			description: "Descripción medicamento",
			qty_prod_deliver: "2",
			quantity_dose: "1",
			periodicity: "60",
			treatment_duration: "8",
			hora: "------",
			cat_trx: "En proceso"
		}
	];
}
(function() {
	App.controller('detalleConsultaController', ['$scope', '$http', 'Flash', 'MessagesService', 'FormUtilService', 'PaginatorConfigService', 'HelloWorldService', '$rootScope', function ($scope, $http, Flash, MessagesService, FormUtilService, PaginatorConfigService, HelloWorldService, $rootScope) {
		$scope.receta=$rootScope.recetaSeleccionada;
		$scope.detalleConsulta = getDetalleConsulta();
		$scope.search;
		$scope.form = {};
		$scope.form.code;
	    $scope.form.description;

		$scope.selected = [];
		 $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };
	   $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.detalleConsulta.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.detalleConsulta.slice(0);
    }
  };
   $scope.isChecked = function() {
    return $scope.selected.length === $scope.detalleConsulta.length;

  };
   $scope.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.items.length);
  };
  $scope.domicilio={};
  $scope.actualizarDomicilio=function(domicilio){
	detalleConsultaService.setDatosEntrega($scope);
  }
  $scope.entregado=function(){
	detalleConsultaService.setEntregado($scope);
  }
  $scope.devuelto=function(){
	detalleConsultaService.setDevuelto($scope);
  }
  $scope.cancelado=function(){
	detalleConsultaService.setCancelado($scope);
  }
  $scope.salir=function(){
	  location.href="#/inicioConsulta";
  }
	    $scope.paginator = PaginatorConfigService.init();
	}]);
})();