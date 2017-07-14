App.factory("AssociateService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "associateEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, associateEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var associateServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + associateEndpoint.defaultOperation;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.associate = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.associate;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + associateEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.associate = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.associate.success.addRow' | translate}}");
						associateServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.associate.length + 1;
			$scope.form.active = true;
			$scope.associate.push($scope.form);
			associateServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.associate.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + associateEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.associate = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.associate.success.updateRow' | translate}}");
						associateService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.associate[$scope.form.id - 1] = $scope.form;
			associateServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.associate.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (associate, $scope) {
			var endpoint = engineUrl + associateEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, associate)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.associate = data.removeResponse.businessResponse;
						associateServices.findByFilter($scope);
						MessagesService.success("{{'msg.associate.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			associateServices.findByFilter($scope);
			MessagesService.success("{{'msg.associate.success.removeRow' | translate}}");
			associate.active = false;
			
			/************************************************************************/
		},
		activate: function (associate, $scope) {
			var endpoint = engineUrl + associateEndpoint.defaultOperation;
			associate.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, associate)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.associate = data.updateResponse.businessResponse;
						AssociateService.findByFilter($scope);
						MessagesService.success("{{'msg.associate.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						associate.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			associateServices.findByFilter($scope);
			MessagesService.success("{{'msg.associate.success.activateRow' | translate}}");
			associate.active = true;
			
			/************************************************************************/
		}
	}
	return associateServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.associateForm.code.$modelValue,
		description: $scope.associateForm.description.$modelValue,
		active: true
	};
}