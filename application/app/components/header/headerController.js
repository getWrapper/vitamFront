(function(){
	App.controller("HeaderController", ['$scope', '$http', '$location','$sessionStorage', '$translate', 'SystemParamConstants', function($scope, $http, $location, $sessionStorage, $translate, SystemParamConstants) {
		$scope.session=$sessionStorage;
		$scope.logout = function () {
			$sessionStorage.showMenu = false;
			$sessionStorage.getInfoUser = false;
			delete $sessionStorage.menus;
			delete $sessionStorage.user;
			delete $sessionStorage.expDate;
			delete $sessionStorage.token;
			sessionStorage.setItem("userGroups", undefined);
			sessionStorage.setItem("isLogged", false);
			sessionStorage.setItem("token", undefined);
			$location.path( SystemParamConstants.LOGIN_FILE );
		};
		$scope.getHomePage = function () {
			return SystemParamConstants.WELCOME_FILE;
		}

		$scope.country = {};
		var language = JSON.parse(localStorage.getItem("language"));
		if (language) {
			$scope.country.selected = language;
			$translate.use(language.code);
		} else {
			// Por defecto, si no se cambia el pais, se muestra Mexico
			$scope.country.selected = {name: 'Mexico', code: 'MX', image: '/resources/img/flags/Mexico-icon.png'};
		}

		$scope.changeLanguage = function (key) {
			$translate.use(key.code);
			localStorage.setItem("language", JSON.stringify(key));
		};

		$scope.disabled = undefined;

		$scope.enable = function() {
			$scope.disabled = false;
		};

		$scope.disable = function() {
			$scope.disabled = true;
		};
		
		$scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
		    {name: 'Costa Rica', code: 'es_CR', image: '/resources/img/flags/Costa-Rica-icon.png'},
			{name: 'El Salvador', code: 'es_SV', image: '/resources/img/flags/El-Salvador-icon.png'},
		    {name: 'Guatemala', code: 'es_GU', image: '/resources/img/flags/Guatemala-icon.png'},
			{name: 'Honduras', code: 'es_HO', image: '/resources/img/flags/Honduras-icon.png'},
			{name: 'Mexico', code: 'es_MX', image: '/resources/img/flags/Mexico-icon.png'},
			{name: 'Nicaragua', code: 'es_NI', image: '/resources/img/flags/Nicaragua-icon.png'},
			{name: 'United States', code: 'en_US', image: '/resources/img/flags/United-States-icon.png'}
		];

	}]);
})();

$(document).ready(function() {});