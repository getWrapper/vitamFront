App.factory("CostaRicaService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "costaRicaEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, costaRicaEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var costaRicaServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + costaRicaEndpoint.defaultOperation;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.costaRica = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.costaRica;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + costaRicaEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.costaRica = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.costaRica.success.addRow' | translate}}");
						costaRicaServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.costaRica.length + 1;
			$scope.form.active = true;
			$scope.costaRica.push($scope.form);
			costaRicaServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.costaRica.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + costaRicaEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.costaRica = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.costaRica.success.updateRow' | translate}}");
						costaRicaService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.costaRica[$scope.form.id - 1] = $scope.form;
			costaRicaServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.costaRica.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (costaRica, $scope) {
			var endpoint = engineUrl + costaRicaEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, costaRica)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.costaRica = data.removeResponse.businessResponse;
						costaRicaServices.findByFilter($scope);
						MessagesService.success("{{'msg.costaRica.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			costaRicaServices.findByFilter($scope);
			MessagesService.success("{{'msg.costaRica.success.removeRow' | translate}}");
			costaRica.active = false;
			
			/************************************************************************/
		},
		activate: function (costaRica, $scope) {
			var endpoint = engineUrl + costaRicaEndpoint.defaultOperation;
			costaRica.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, costaRica)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.costaRica = data.updateResponse.businessResponse;
						CostaRicaService.findByFilter($scope);
						MessagesService.success("{{'msg.costaRica.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						costaRica.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			costaRicaServices.findByFilter($scope);
			MessagesService.success("{{'msg.costaRica.success.activateRow' | translate}}");
			costaRica.active = true;
			
			/************************************************************************/
		}
	}
	return costaRicaServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.costaRicaForm.code.$modelValue,
		description: $scope.costaRicaForm.description.$modelValue,
		active: true
	};
}