(function() {
    App.controller('contextualInformationHelpIconController', ['$scope', '$rootScope', '$timeout', '$sessionStorage', function($scope, $rootScope, $timeout, $sessionStorage) {
    	
    	$scope.session = $sessionStorage;
    	
    	jQuery("#openContextualInformation").click(function(){
    		jQuery(".ui-layout-toggler").click();
    	});
    }]);
})();
    