App.factory("RestService", ["$http", "$q", "$location", "RestConfigurationConstants", "$mdDialog", "$timeout", "$mdMedia", "MessagesService", "RestServiceValidator", "loginEndpoint", "SystemParamConstants", "SessionControlService", function ($http, $q, $location, RestConfigurationConstants, $mdDialog, $timeout, $mdMedia, MessagesService, RestServiceValidator, loginEndpoint, SystemParamConstants, SessionControlService) {
	var renewTokenExecuted = false;
	var showWait = function (noWait) {
		if (!noWait) {
			var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
			$mdDialog.show({
				templateUrl: 'app/commons/templates/wait.html',
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				fullscreen: useFullScreen
			});
		}
	};
	var hideWait = function () {
		$mdDialog.hide();
	}
	/**
	 * Ignora cierto tipo de codigo de respuesta del servicio rest, regresando una lista vacia, caso contrario manda el mensage de error
	 */
	var showFlashErrors = function (data, restCallerObject) {
		var reasonTemp = restCallerObject.scope.errorService;
		var message = "";
		if (data.serviceEngineResponse.headerResponse.reasons != undefined) {
			for (var i = 0; i < reasonTemp.length; i++) {
				//pendiente permitir una lista de errores a omitir y comparar con todos
				if (!(restCallerObject.errorCode != null && restCallerObject.scope.errorService[i].reasonId == restCallerObject.errorCode)) {
					message = message + "codigo:" + restCallerObject.scope.errorService[i].reasonId + " descripcion:" + restCallerObject.scope.errorService[i].description + "\n";
				}
			}
			if (message != "") {
				MessagesService.error(message);
			}

		} else {
			MessagesService.error("Servicio Invocado:" + restCallerObject.responseName + " Descripcion:" + data.serviceEngineResponse.headerResponse.responseDescription);
		}
	};
	/**
	 * convierte un objeto a un arreglo.
	 */
	var convertIfSimpleToArray = function (data, restCallerObject) {
		var objectListCandidate = data.serviceEngineResponse.businessResponse[restCallerObject.responseName].businessResponse;
		var length = objectListCandidate.length;
		if (length == undefined) {
			var array = [];
			array.push(objectListCandidate[restCallerObject.singleObjectName]);
			return array;
		} else {
			return objectListCandidate;
		}
	};
	/**
	 * Obtiene el result name por default si es null singleObjectName+"Result"
	 */
	var setResultName = function (restCallerObject) {
		if (restCallerObject.resultName == null) {
			restCallerObject.resultName = restCallerObject.singleObjectName + "Result";
		}
	}
	/**
	 * llama un servicio de forma generica
	 * 			scope:El scope que se pasa,
				endpoint:url completa del endpoint,
				params:parametros de la peticion get en un objeto json,
				singleObjetName:Nombre del Objeto resultante en la peticion rest,
				responseName:Nombre del objeto response en la peticion rest",
				resultName:nombre del campo que se inyectara en el scope conn los datos resultantes del objeto en singleObjectName,ejemplo: $scope.[resultName]", por default resultName = singleObjectName+"Result"
				postExecuteFunction:funcion que se ejecuta tras obtener los datos exitosamente",
				postErrorFunction: funcion adicional que se ejecuta en caso de error.
				noWait:si es true no se bloquea y muestra la barra de espera al llamar al servicio rest, por default false
				errorCodeOmited:Si se especifica algun codigo de error este no sera mostrado en el flash al ocurrir
				isArray: si es true , el resultado se entrega en un arreglo aunque solo sea un solo resultado por default false;
				pagination:Obtiene los valores de total de la paginacion y los inyecta en el $scope en el campo paginationResponse.[resultName]
				method: especifica el metodo de request get,del,put,post si no se especifica por default post
	 */

	var enchancedRest = function (restCallerObject) {
		//muestra la barra de tiempo
		showWait(restCallerObject.noWait);
		//agrega la hora de solicitud
		restCallerObject.params.requestDate = new Date();
		//si no se especifica por default es post
		if (!restCallerObject.method) {
			restCallerObject.method = "post";
		}
		restServicesFunctions[restCallerObject.method](restCallerObject.endpoint, restCallerObject.params)
			.then(function (data) {
				//oculta la barra de espera al recivir la respuesta
				hideWait();
				//valida si la respuesta es correcta caso contrario muestra el error
				if (RestServiceValidator.validateResponse(data.serviceEngineResponse.headerResponse, restCallerObject.scope)) {
					setResultName(restCallerObject);
					//observa si el resultado esperado es una rreglo 
					if (restCallerObject.isArray) {
						restCallerObject.scope[restCallerObject.resultName] = convertIfSimpleToArray(data, restCallerObject);
					} else {
						restCallerObject.scope[restCallerObject.resultName] = data.serviceEngineResponse.businessResponse[restCallerObject.responseName].businessResponse[restCallerObject.singleObjectName];
					}
					//recupera el total de la paginacion
					if (restCallerObject.pagination) {
						restCallerObject.scope.paginationResponse = {};
						restCallerObject.scope.paginationResponse[restCallerObject.resultName] = {};
						restCallerObject.scope.paginationResponse[restCallerObject.resultName].totalItems = data.serviceEngineResponse.businessResponse[restCallerObject.responseName].paginationResponse.totalItems;
					}
				} else {
					//si no existe un codigo que omitir muestra el error caso contrario observa si el error resivido es el omitido para continuar
					showFlashErrors(data, restCallerObject);
				}
				if (restCallerObject.postExecuteFunction != null) {
					restCallerObject.postExecuteFunction(restCallerObject.scope);
				}
			}, function (error) {
				//si existe error al invocar la respuesta oculta la barra
				hideWait()
				MessagesService.error("{{'msg.common.ws.error' | translate}}");
				if (restCallerObject.postErrorFunction != null) {
					restCallerObject.postErrorFunction(restCallerObject.scope);
				}
			});
	};
	var validateToken = function () {
		if (sessionStorage.getItem("expDate") < new Date().getTime() && $location.path() != SystemParamConstants.LOGIN_FILE && sessionStorage.getItem("freeAccess") ==! 'true') {
			MessagesService.error("{{'msg.common.ws.token.expiration' | translate}}");
			$location.path(SystemParamConstants.LOGIN_FILE);
		}
	};
	
    var restServicesFunctions = {
		get: function (endpoint, requestParams) {
			restServicesFunctions.preProcessing(endpoint);
			return $http.get(endpoint, { params: requestParams })
				.then(function (response) {
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}

				}, function (response) {
					return $q.reject(response.data);
				});
		},
		post: function (endpoint, requestParams) {
			restServicesFunctions.preProcessing(endpoint);
			return $http.post(endpoint, requestParams)
				.then(function (response) {
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}
				}, function (response) {
					return $q.reject(response.data);
				});
		},
		put: function (endpoint, requestParams) {
			restServicesFunctions.preProcessing(endpoint);
			return $http.put(endpoint, requestParams)
				.then(function (response) {
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}

				}, function (response) {
					return $q.reject(response.data);
				});
		},
		del: function (endpoint, requestParams) {
			restServicesFunctions.preProcessing(endpoint);
			return $http.delete(endpoint, { data: requestParams })
				.then(function (response) {
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}

				}, function (response) {
					return $q.reject(response.data);
				});
		},
		preProcessing: function (endpoint) {
			restServicesFunctions.validateToken();
			restServicesFunctions.renewToken(endpoint, false);
			if($location.path() != SystemParamConstants.LOGIN_FILE) {
				SessionControlService.renewCounter();
			}
		},
		renewToken: function (endpoint, force, $scope) {
			if(sessionStorage.getItem("freeAccess") ==! 'true') {
				var actualDateAnticipation = addMinutes(new Date().getTime(), SystemParamConstants.MINUTES_TO_EVALUATE_TOKEN_EXPIRATION);
				
				// For Debug purposes:
				/*console.log("Time to renew token: ");
				console.log(new Date(actualDateAnticipation).toString());
				
				console.log("Time to expire token: ");
				console.log(new Date(parseInt(sessionStorage.getItem("expDate"))).toString());
				
				console.log(parseInt(sessionStorage.getItem("expDate")));
				console.log(actualDateAnticipation);*/
				
				// Verify if token is just to get expired
				if ((force === true || parseInt(sessionStorage.getItem("expDate")) < actualDateAnticipation) && sessionStorage.getItem("token") != 'undefined' && endpoint.indexOf('authenticationService') == -1 && endpoint.indexOf('authorizationService') == -1) {
					renewTokenExecuted = true;

					var endpoint = RestConfigurationConstants.engineApiLoginUrl + loginEndpoint.RenewTokenService;
					var params = {
						"tokenString": sessionStorage.getItem("token")
					};

					restServicesFunctions.post(endpoint, params)
						.then(function (data) {
							if (data.RenewTokenResponse.headerResponse != undefined) {
								sessionStorage.setItem("token", data.RenewTokenResponse.businessResponse.DomaintItemsResult.TokenString);
								$http.defaults.headers.common.Authorization = sessionStorage.getItem("token");

								if (sessionStorage.getItem("token") != 'undefined') {
									var decoded = jwt_decode(sessionStorage.getItem("token"));
									sessionStorage.setItem("expDate", decoded.exp * 1000);
								}
							} else {
								MessagesService.error("{{'msg.common.ws.error' | translate}}");
							}
						}, function (error) {
							MessagesService.error("{{'msg.common.ws.error' | translate}}");
						});
				}
			}
		},
		validateToken: validateToken,
		enchancedRest: enchancedRest,
		showWait: showWait,
		hideWait: hideWait

	};
    
	/**
	 * Funciones Expuestas
	 */
    return restServicesFunctions;
}]);