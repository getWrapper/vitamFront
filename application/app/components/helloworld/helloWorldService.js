App.factory("HelloWorldService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "HelloWorldEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, HelloWorldEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var helloWorldServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + HelloWorldEndpoint.defaultOperation;
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
			$scope.helloWorld;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + HelloWorldEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.helloWorld = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.helloWorld.success.addRow' | translate}}");
						helloWorldServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.helloWorld.length + 1;
			$scope.form.active = true;
			$scope.helloWorld.push($scope.form);
			helloWorldServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.helloWorld.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + HelloWorldEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.helloWorld = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.helloWorld.success.updateRow' | translate}}");
						helloWorldService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.helloWorld[$scope.form.id - 1] = $scope.form;
			helloWorldServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.helloWorld.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (hello, $scope) {
			var endpoint = engineUrl + HelloWorldEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, hello)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.helloWorld = data.removeResponse.businessResponse;
						helloWorldServices.findByFilter($scope);
						MessagesService.success("{{'msg.helloWorld.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			helloWorldServices.findByFilter($scope);
			MessagesService.success("{{'msg.helloWorld.success.removeRow' | translate}}");
			hello.active = false;
			
			/************************************************************************/
		},
		activate: function (hello, $scope) {
			var endpoint = engineUrl + HelloWorldEndpoint.defaultOperation;
			hello.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, hello)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.helloWorld = data.updateResponse.businessResponse;
						HelloWorldService.findByFilter($scope);
						MessagesService.success("{{'msg.helloWorld.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						hello.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			helloWorldServices.findByFilter($scope);
			MessagesService.success("{{'msg.helloWorld.success.activateRow' | translate}}");
			hello.active = true;
			
			/************************************************************************/
		}
	}
	return helloWorldServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.helloWorldForm.code.$modelValue,
		description: $scope.helloWorldForm.description.$modelValue,
		active: true
	};
}