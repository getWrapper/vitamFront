function getInicioConsulta() {
	return [
		{
			mmck_code: "0001",
			eligibility_number: "10001",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		},
			{
			mmck_code: "0002",
			eligibility_number: "10002",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		},
			{
			mmck_code: "0003",
			eligibility_number: "10003",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		},
			{
			mmck_code: "0004",
			eligibility_number: "10004",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		},
			{
			mmck_code: "0005",
			eligibility_number: "10005",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		},
			{
			mmck_code: "0006",
			eligibility_number: "10006",
			patient_name: "Juan",
			patient_surname: "Pérez",
			patient_lastname: "Gomez",
			phone_number: "01800123456",
			register_date: "11/07/2017",
			trx_name: "Activo",
			user_attend: "jccalderon"
		}
	];
}
(function() {
	App.controller('inicioConsultaController', ['$scope', '$http', 'Flash', 'MessagesService', 'FormUtilService', 'PaginatorConfigService', 'inicioConsultaService', '$rootScope', function ($scope, $http, Flash, MessagesService, FormUtilService, PaginatorConfigService, inicioConsultaService, $rootScope) {
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
			FormUtilService.resetFormValidations($scope.helloWorldForm);
	    };
	    
		$scope.atenderConsulta=function(){

		}
		$scope.paciente={};
	    $scope.buscarRecetas = function (paciente) {
			$scope.encabezados=true;
			var codigo=paciente.mmck;
			$scope.inicioConsulta = getInicioConsulta();
	    };
		$scope.irDetalleConsulta=function(registro){
			$rootScope.recetaSeleccionada=registro;
			location.href="#/detalleConsulta";
		};
		 
	    $scope.paginator = PaginatorConfigService.init();
	}]);
})();