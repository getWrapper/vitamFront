(function() {
    App.controller('configContextualInformationController', ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
        
        $scope.typeContextualInfo = {
        	isOpen: false,
        	count: 0,
        	direction: 'left'
        };
        
        $scope.config = localStorage.getItem("contextualInformationConfig") == undefined ? {} : JSON.parse(localStorage.getItem("contextualInformationConfig"));
        if($scope.config.type == undefined) {
        	$scope.config.type = 'right-panel';
        	localStorage.setItem("contextualInformationConfig", JSON.stringify($scope.config));
        }
        
        $scope.setType = function(type) {
        	$scope.config.type = type;
        	localStorage.setItem("contextualInformationConfig", JSON.stringify($scope.config));
        };
    }]);
})();