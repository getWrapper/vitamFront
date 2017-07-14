(function(){
	App.controller("MenuController", ['$scope', '$location', '$sessionStorage', function($scope, $location, $sessionStorage) {
	    $scope.session = $sessionStorage;		
	 	$scope.getClass = function(path, title) {
			var cssClass = '';
			if ($location.path().substr(1, path.legth) === path.substr(1, path.legth)) {
				cssClass = 'active';
			}
			return cssClass;
		};
	}]);
})();

$(document).ready(function() {});