(function(){
	App.controller("FooterController", ['$scope', 'SystemParamConstants', function($scope, SystemParamConstants) {
		$scope.version = SystemParamConstants.ARCHETYPE_VERSION;
	}]);
})();