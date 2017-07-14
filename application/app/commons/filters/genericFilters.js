//Date filter

App.filter('customDate', function($filter) {
	return function(input) {
		if (input == null) {
			return "";
		}
		var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
		return _date.toUpperCase();
	};
});

// Custom filter
App.filter('offset', function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});