(function(){
	App.controller('loginController', ['$scope', '$rootScope', '$sessionStorage', 'LoginService', 'MessagesService', 'SessionControlService', function ($scope, $rootScope, $sessionStorage, LoginService, MessagesService, SessionControlService ) {
		
		// Get list of domains
		
		
		if(localStorage.getItem("domain") != undefined) {
			$scope.domain = localStorage.getItem("domain");
		}
		
		$scope.init=function(){
			LoginService.getDomains($scope);
			$sessionStorage.showMenu = false;
			$sessionStorage.getInfoUser = false;
			delete $sessionStorage.menus;
			delete $sessionStorage.user;
			delete $sessionStorage.expDate;
			delete $sessionStorage.token;
			sessionStorage.setItem("userGroups", {});
			sessionStorage.setItem("isLogged", false);
			sessionStorage.setItem("userGroups", null);
			$rootScope.showContextualInformation = false;
			SessionControlService.removeCounter();
		}
		
		$scope.updateDomain = function() {
			localStorage.setItem("domain", $scope.domain);
		}
		
		// Login action
		$scope.login = function (valid) {
	    	if (valid) {
	    		MessagesService.init();
	    		LoginService.login($scope);
	    	}
	    };
		
	}]);
})();