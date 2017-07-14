App.factory("PaginatorConfigService", function() {
	return {
		init : function() {
			paginator = {};
			paginator.itemsPerPage = {
				name : '5',
				value : 5
			};
			paginator.pageQuantity = [ {
				name : '5',
				value : 5
			}, {
				name : '10',
				value : 10
			}, {
				name : '50',
				value : 50
			} ];
			return paginator;
		}
	};
});