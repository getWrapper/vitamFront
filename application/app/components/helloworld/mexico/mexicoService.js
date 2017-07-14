App.factory("MexicoService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "mexicoEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, mexicoEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var mexicoServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + mexicoEndpoint.defaultOperation;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.mexico = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.mexico;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + mexicoEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.mexico = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.mexico.success.addRow' | translate}}");
						mexicoServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.mexico.length + 1;
			$scope.form.active = true;
			$scope.mexico.push($scope.form);
			mexicoServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.mexico.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + mexicoEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.mexico = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.mexico.success.updateRow' | translate}}");
						mexicoService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.mexico[$scope.form.id - 1] = $scope.form;
			mexicoServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.mexico.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (mexico, $scope) {
			var endpoint = engineUrl + mexicoEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, mexico)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.mexico = data.removeResponse.businessResponse;
						mexicoServices.findByFilter($scope);
						MessagesService.success("{{'msg.mexico.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			mexicoServices.findByFilter($scope);
			MessagesService.success("{{'msg.mexico.success.removeRow' | translate}}");
			mexico.active = false;
			
			/************************************************************************/
		},
		activate: function (mexico, $scope) {
			var endpoint = engineUrl + mexicoEndpoint.defaultOperation;
			mexico.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, mexico)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.mexico = data.updateResponse.businessResponse;
						MexicoService.findByFilter($scope);
						MessagesService.success("{{'msg.mexico.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						mexico.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			mexicoServices.findByFilter($scope);
			MessagesService.success("{{'msg.mexico.success.activateRow' | translate}}");
			mexico.active = true;
			
			/************************************************************************/
		}
	}
	return mexicoServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.mexicoForm.code.$modelValue,
		description: $scope.mexicoForm.description.$modelValue,
		active: true
	};
}