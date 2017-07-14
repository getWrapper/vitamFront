App.factory("LoginService", ["$http", "$sessionStorage", "$location", "RestService", "MessagesService", "RestServiceValidator", "SessionControlService", "RestConfigurationConstants",  "loginEndpoint", "LoginServiceConstants", "SystemParamConstants", function ($http, $sessionStorage, $location, RestService, MessagesService, RestServiceValidator, SessionControlService, RestConfigurationConstants, loginEndpoint, LoginServiceConstants, SystemParamConstants) {
	// URL of the web services host
	var engineUrl = RestConfigurationConstants.engineApiLoginUrl;
	if(sessionStorage.getItem("userGroups") == "null") {
		sessionStorage.setItem("userGroups", false);
		sessionStorage.setItem("isLogged", false);
	}
	
	var getNavigationItems= function() {
			var endpoint = RestConfigurationConstants.engineApiUserDetailUrl + loginEndpoint.NavigationItemsService;
			var params = {
					"tokenString": sessionStorage.getItem("token"),
					"applicationName": SystemParamConstants.APPLICATION_NAME,
					"areOperationsRequired": SystemParamConstants.OPERATIONS_REQUIRED,
					"arePermissionsRequired": SystemParamConstants.PERMISSIONS_REQUIRED
			};
			RestService.showWait();
			RestService.post(endpoint, params)
				.then(function (data) {
					RestService.hideWait();
					var errorResult={};
					if (RestServiceValidator.validateResponse(data.GetNavigationItemsResponse.headerResponse,errorResult)) {
						$sessionStorage.navigationItemResult = data.GetNavigationItemsResponse.businessResponse;
						$sessionStorage.menus = data.GetNavigationItemsResponse.businessResponse;
						$sessionStorage.showMenu= true;
						$location.path(SystemParamConstants.WELCOME_FILE);
					} else {
						MessagesService.error(errorResult.errorService[0].description);
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
					RestService.hideWait();
				});
		}
	
	
	var loginServices = {
		login: function ($scope) {
			var endpoint = engineUrl + loginEndpoint.AuthenticateService;
			var params = {
					"service": LoginServiceConstants.LOGIN_SERVICE_ID,
					"domain": LoginServiceConstants.LOGIN_DOMAIN_ID,
					"business": LoginServiceConstants.LOGIN_BUSINESS_ID,
					"channel": LoginServiceConstants.LOGIN_CHANNEL_ID,
					"client": LoginServiceConstants.LOGIN_CLIENT_ID,
					"requestClient": LoginServiceConstants.LOGIN_REQUEST_CLIENT_ID,
					"requestDate": new Date(),
					"userDomain": $scope.domain,
					"userAccount": $scope.username,
					"userPassword": $scope.password
			};
			RestService.showWait();
			RestService.post(endpoint, params)
				.then(function (data) {
					RestService.hideWait();
					if (data.serviceEngineResponse != undefined && RestServiceValidator.validateResponse(data.serviceEngineResponse.headerResponse, $scope)) {
						var domainItemResult = data.serviceEngineResponse.businessResponse.ValidateUserResponse.businessResponse.DomaintItemsResult;
						
						var decoded = jwt_decode(domainItemResult.TokenString);
						sessionStorage.setItem("token", domainItemResult.TokenString);
						sessionStorage.setItem("expDate", decoded.exp * 1000);
						
						// Ponemos contador para el redirect automatico al login cuando expire el token
						SessionControlService.addCounter();
						
						if(sessionStorage.getItem("expDate") > new Date().getTime()) {
							// Almacenamos el Token
							$http.defaults.headers.common.Authorization = sessionStorage.getItem("token");
							
							// Obtenemos la información del usuario
							loginServices.getUserDetail($scope);
							sessionStorage.setItem("isLogged", true);
						}
					} else {
						MessagesService.error($scope.errorService[0].description);
					}
				}, function (error) {
					RestService.hideWait();
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
					
				});
		},
		getUserDetail: function($scope) {
			var endpoint = RestConfigurationConstants.engineApiUserDetailUrl + loginEndpoint.UserDetailService;
			var params = {
					"tokenString": sessionStorage.getItem("token")
			};
			RestService.showWait();
			RestService.post(endpoint, params)
				.then(function (data) {
					RestService.hideWait();
					var user = {};
					if (RestServiceValidator.validateResponse(data.GetUserDetailResponse.headerResponse, $scope)) {
						var domainItemResult = data.GetUserDetailResponse.businessResponse.DomaintItemsResult;
						user.firstName = domainItemResult.UserDetail.FirstName;
						user.lastName = domainItemResult.UserDetail.LastName;
						user.email = domainItemResult.UserDetail.EmailAddress;
						user.language = domainItemResult.UserDetail.PreferredLanguage;
						user.displayName = domainItemResult.UserDetail.DisplayName;
						user.domain = domainItemResult.UserDetail.LoginNameWithDomain.split('\\')[0].toUpperCase();
				        $sessionStorage.getInfoUser = true;

						loginServices.getUserRoles($scope);
					} else {
						MessagesService.error($scope.errorService[0].description);
					}
					$scope.user = user;
					$sessionStorage.user=user;
				}, function (error) {
					RestService.hideWait();
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
		},
		getDomains: function($scope) {
			var endpoint = RestConfigurationConstants.engineApiUserDetailUrl + loginEndpoint.DomainsService;
			var params = {
			};
			RestService.post(endpoint, params)
				.then(function (data) {
					if (RestServiceValidator.validateResponse(data.GetDomainsResponse.headerResponse, $scope)) {
						$scope.domainItemResult = data.GetDomainsResponse.businessResponse;
					} else {
						MessagesService.error($scope.errorService[0].description);
					}
				}, function (error) {
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
		},
		getUserRoles: function($scope) {
			var endpoint = RestConfigurationConstants.engineApiUserDetailUrl + loginEndpoint.GetUserRolesService;
			var params = {
				"tokenString": sessionStorage.getItem("token"),
				"applicationName": SystemParamConstants.APPLICATION_NAME
			};
			RestService.showWait();
			RestService.post(endpoint, params)
				.then(function (data) {
					RestService.hideWait();
					if (RestServiceValidator.validateResponse(data.GetUserRolesResponse.headerResponse, $scope)) {
						sessionStorage.setItem("userGroups", JSON.stringify(data.GetUserRolesResponse.businessResponse.DomaintItemsResult));
						SessionControlService
						loginServices.getNavigationItems($scope);
					} else {
						MessagesService.error($scope.errorService[0].description);
					}
				}, function (error) {
					RestService.hideWait();
					MessagesService.error("{{'msg.common.ws.error' | translate}}");
				});
		},
		getNavigationItems:getNavigationItems,
		getUserGroup: function($scope) {
			var userGroups = null;
			if(sessionStorage.getItem("userGroups") != undefined && sessionStorage.getItem("userGroups") != "undefined") {
				var userGroups = JSON.parse(sessionStorage.getItem("userGroups"));
			}
			return userGroups;
		},
		isLoggedIn: function($scope) {
			return sessionStorage.getItem("isLogged");
		}
	}
	return loginServices;
}]);