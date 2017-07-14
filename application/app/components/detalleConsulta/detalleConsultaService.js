App.factory("detalleConsultaService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "detalleConsultaEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, detalleConsultaEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var detalleConsultaServices =  {
		getDatosPaciente: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.GetPatientData;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		},
		getDatosEntrega: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.GetDeliveryData;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		},
		setDatosEntrega: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.SetDeliveryData;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		},
		setEntregado: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.SetDelivered;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		},
		setDevuelto: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.SetReturned;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		},
		setCancelado: function ($scope) {
			var endpoint = engineUrl + detalleConsultaEndpoint.SetCancelled;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.helloWorld = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.inicioConsulta;
			/************************************************************************/
		}
	}
	return detalleConsultaServices;
}]);
