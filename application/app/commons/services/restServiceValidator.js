App.factory("RestServiceValidator", function ($http, $q) {
    return {
    	validateResponse: function (headerResponse, $scope) {
    		if (headerResponse != null) {
    			//get response code
    			var responseCode = headerResponse.responseCode;
    			if ('OK' == responseCode || '200' == responseCode) {
    				return true;
    			} else {
    				var reasons = headerResponse.reasons;
    				if(reasons){
    					$scope.errorService = reasons;
    				} else if(reasons == undefined && headerResponse.responseDescription != undefined) {
    					$scope.errorService = new Array();
    					$scope.errorService[0] = {};
    					$scope.errorService[0].description = headerResponse.responseDescription;
    				}
    				return false;
    			}
    		} else {
    			$scope.errorService = 'La respuesta viene vacía';
    			return false;
    		}
    	},
    	getMessage: function ($scope){
    		//show message
    		var msg = '';
    		for (var i in $scope.errorService) {
    			console.log('ID: ' + $scope.errorService[i].reasonId + ' Descripción: ' + $scope.errorService[i].description);
    			msg += '<b>(' + $scope.errorService[i].reasonId + ')</b> - ' + $scope.errorService[i].description + '<br/>';
    		}
    		return msg;
    	}
    };
});