App.factory("VendorService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "vendorEndpoint", function ($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, vendorEndpoint) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiUrl;
	var vendorServices =  {
		findByFilter: function ($scope) {
			var endpoint = engineUrl + vendorEndpoint.defaultOperation;
			var params = $scope.search;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.findByFilterResponse.headerResponse)) {
						$scope.vendor = data.findByFilterResponse.businessResponse;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.vendor;
			/************************************************************************/
		},
		create: function ($scope) {
			var endpoint = engineUrl + vendorEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			params.id = 0;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.createResponse.headerResponse)) {
						$scope.vendor = data.createResponse.businessResponse;
						MessagesService.success("{{'msg.vendor.success.addRow' | translate}}");
						vendorServices.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			$scope.form.id =$scope.vendor.length + 1;
			$scope.form.active = true;
			$scope.vendor.push($scope.form);
			vendorServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.vendor.success.addRow' | translate}}");
			
			/************************************************************************/
		},
		update: function ($scope) {
			var endpoint = engineUrl + vendorEndpoint.defaultOperation;
			var params = createHelloObj($scope);
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.vendor = data.updateResponse.businessResponse;
						MessagesService.success("{{'msg.vendor.success.updateRow' | translate}}");
						vendorService.findByFilter($scope);
						$scope.addUpdate = false;
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			$scope.vendor[$scope.form.id - 1] = $scope.form;
			vendorServices.findByFilter($scope);
			$scope.addUpdate = false;
			MessagesService.success("{{'msg.vendor.success.updateRow' | translate}}");
			
			/************************************************************************/
		},
		remove: function (vendor, $scope) {
			var endpoint = engineUrl + vendorEndpoint.defaultOperation;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, vendor)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.removeResponse.headerResponse)) {
					{
						$scope.vendor = data.removeResponse.businessResponse;
						vendorServices.findByFilter($scope);
						MessagesService.success("{{'msg.vendor.success.removeRow' | translate}}");
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			*/
			/**** Remove the next block when your REST Service will be available ****/
			
			vendorServices.findByFilter($scope);
			MessagesService.success("{{'msg.vendor.success.removeRow' | translate}}");
			vendor.active = false;
			
			/************************************************************************/
		},
		activate: function (vendor, $scope) {
			var endpoint = engineUrl + vendorEndpoint.defaultOperation;
			vendor.active = true;
			/**** Remove comments of the next block when your REST Service will be available ****/
			/*
			RestService.post(endpoint, vendor)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.updateResponse.headerResponse)) {
						$scope.vendor = data.updateResponse.businessResponse;
						VendorService.findByFilter($scope);
						MessagesService.success("{{'msg.vendor.success.activateRow' | translate}}");
						// Next line is to simulate activate a row
						vendor.active = true; // <-- Remove
					} else {
						MessagesService.error("{{'msg.common.ws.error' | translate}}");
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
			 */
			/**** Remove the next block when your REST Service will be available ****/
			
			vendorServices.findByFilter($scope);
			MessagesService.success("{{'msg.vendor.success.activateRow' | translate}}");
			vendor.active = true;
			
			/************************************************************************/
		}
	}
	return vendorServices;
}]);

function createHelloObj($scope) {
	return {
		id: 0,
		code: $scope.vendorForm.code.$modelValue,
		description: $scope.vendorForm.description.$modelValue,
		active: true
	};
}