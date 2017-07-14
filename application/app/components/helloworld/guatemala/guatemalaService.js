App.factory("GuatemalaService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "guatemalaEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, guatemalaEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var guatemalaServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + guatemalaEndpoint.defaultOperation;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.guatemala = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.guatemala;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + guatemalaEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.guatemala = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.guatemala.success.addRow' | translate}}");
						guatemalaServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.guatemala.length + 1;
			$scope.form.active = true;
			$scope.guatemala.push($scope.form);
			guatemalaServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.guatemala.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + guatemalaEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.guatemala = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.guatemala.success.updateRow' | translate}}");
						guatemalaService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.guatemala[$scope.form.id - 1] = $scope.form;
			guatemalaServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.guatemala.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (guatemala, $scope) {
			var endpoint = engineUrl + guatemalaEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, guatemala)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.guatemala = data.removeResponse.businessResponse;
						guatemalaServices.findByFilter($scope);
						MessagesService.success("{{'msg.guatemala.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			guatemalaServices.findByFilter($scope);
			MessagesService.success("{{'msg.guatemala.success.removeRow' | translate}}");
			guatemala.active = false;
			
			/************************************************************************/
		},
		activate: function (guatemala, $scope) {
			var endpoint = engineUrl + guatemalaEndpoint.defaultOperation;
			guatemala.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, guatemala)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.guatemala = data.updateResponse.businessResponse;
						GuatemalaService.findByFilter($scope);
						MessagesService.success("{{'msg.guatemala.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						guatemala.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			guatemalaServices.findByFilter($scope);
			MessagesService.success("{{'msg.guatemala.success.activateRow' | translate}}");
			guatemala.active = true;
			
			/************************************************************************/
		}
	}
	return guatemalaServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.guatemalaForm.code.$modelValue,
		description: $scope.guatemalaForm.description.$modelValue,
		active: true
	};
}