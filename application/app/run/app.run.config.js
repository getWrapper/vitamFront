/**
 * Configure the Routes
 */
App.run([ '$rootScope','$location','$state','$http','LoginService', 'MessagesService', 'SystemParamConstants', function($rootScope, $location, $state, $http, LoginService, MessagesService, SystemParamConstants) {
	
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
		
		updateMenuDisplay($rootScope, toState);
		
		if(fromState.name != undefined && fromState.name != '') {
			sessionStorage.setItem("fromState", JSON.stringify(fromState));
		} else {
			fromState = JSON.parse(sessionStorage.getItem("fromState"));
		}
		
		if(toState.name != undefined && toState.name != '') {
			sessionStorage.setItem("toState", JSON.stringify(toState));
			$http.defaults.headers.common.Authorization = sessionStorage.getItem("token");
		} else {
			toState = JSON.parse(sessionStorage.getItem("toState"));
		}
		
		if(fromState != null && fromState.name == '' && toState.name != 'login') {
			event.preventDefault();
			$state.go("login");
		}
		
		if((sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == "undefined") && $location.path() != SystemParamConstants.LOGIN_FILE && toState.name != "login") {
			event.preventDefault();
			$state.go("login");
		}

	    // Validate if already have token
	    if(sessionStorage.getItem("token") == undefined && toState.name != 'login') {
	    	// Path to login becuase haven't token yet...
	    	event.preventDefault();
			$state.go("login");
	    } else if(!validateFreeAccess(toState)) {
	    	// Validate the expiration date of the token
	    	validateToken(toState, event);
	    	validateUserGroups(toState, LoginService, event);
	    }
	});
	
	function updateMenuDisplay($rootScope, toState) {
		if(toState.name == 'login') {
			$rootScope.showMenu = false;
		} else {
			$rootScope.showMenu = true;
		}
	}
	
	function validateFreeAccess(toState) {
		var freeAccess = false;
		if(toState != null && toState.rol != undefined) {
			freeAccess = toState.rol.indexOf('*') !== -1;
		}
		return freeAccess;
	}
	
	function validateUserGroups(toState, LoginService, event) {
		var userGroup = LoginService.getUserGroup();
		var validUser = isValidUser(toState, userGroup);
		
		if(toState.authenticate && !LoginService.isLoggedIn()) {
			event.preventDefault();
			sessionStorage.setItem("showMenu", false);
			$state.go("login");
		} else if(!validUser && toState.name !== 'login') {
			if(sessionStorage.getItem("userGroups") == "null") {
				$location.path(SystemParamConstants.LOGIN_FILE);
			} else {
				$location.path("/unauthorized");
			}
		}
	}
	
	function isValidUser(toState, userGroup) {
		var validUser = false;
		if(userGroup !== undefined && userGroup instanceof Array) {
			for(var i=0; i<userGroup.length ; i++){
				validUser = ( toState.rol.indexOf(userGroup[i].Name) !== -1 || userGroup[i].Name == '*' );
				if(validUser) {
					break;
				}
			}
		} else if(userGroup != null && userGroup !== undefined && toState.rol != undefined) {
			validUser = toState.rol.indexOf(userGroup.Name) !== -1;
		}
		return validUser;
	}
	
	function validateToken(toState, event) {
		if(sessionStorage.getItem("expDate") < new Date().getTime() && $location.path() != SystemParamConstants.LOGIN_FILE && toState.name !== 'login') {
			MessagesService.error("{{'msg.common.ws.token.expiration' | translate}}");
			event.preventDefault();
			$state.go("login");
			$location.path(SystemParamConstants.LOGIN_FILE);
		} else if(sessionStorage.getItem("token") == "undefined" && $location.path() != SystemParamConstants.LOGIN_FILE && toState.name !== 'login') {
			event.preventDefault();
			$state.go("login");
		}
	}
}]);