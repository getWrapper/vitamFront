App.factory("CatalogUtilService", function () {
	return {
		resetFormValidations: function (form) {
	    	form.$rollbackViewValue();
			form.$setPristine();
			form.$setUntouched();
		},
	
		createCatalogObj: function (catalogNameParam) {
			return {
				catalogName : catalogNameParam
			}
		},
		
		transformResponseToCatalog: function (response, description, status_code, name, isCatalog) {
			if(response){
				var responseArray = response.CatalogMapping.Rows;
				var catalogList = new Array();
				if(responseArray !== undefined && responseArray !== "") {
		            if(responseArray instanceof Array){
		                for(var i=0; i<responseArray.length; i++) {
		                	var catalog = catalogProperties(responseArray[i], description, status_code, name);
		                	if( JSON.parse(catalog.active) ) {
		                		catalogList.push(jQuery.extend(true, {}, catalog));
		                	}
		                }    
		            } else {
		            	var catalog = catalogProperties(responseArray.Row, description, status_code, name);
		                if( JSON.parse(catalog.active) ){
		                	catalogList.push(jQuery.extend(true, {}, catalog));
		                }
		            }
				}
				return catalogList;
			}else{
				return {};
			}
		},
		
		transformResponseToInbox: function (response, description, status_code, name) {
			if(response){
				var responseArray = response.CatalogMapping.Rows;
				var catalogList = new Array();
				if(responseArray !== undefined && responseArray !== "") {
		            if(responseArray instanceof Array){
		                for(var i=0; i<responseArray.length; i++) {
		                	catalogList.push(jQuery.extend(true, {}, catalogProperties(responseArray[i], description, status_code, name)));
		                }    
		            } else {
		            	catalogList.push(jQuery.extend(true, {}, catalogProperties(responseArray.Row, description, status_code, name)));
		            }
				}
				return catalogList;
			}else{
				return {};
			}
		},
		
		createFindQueryRequest: function ($scope) {
			return {
				catalogName : $scope.catalogName,
				'DX_DESCRIPTION' : $scope.search == undefined ? '' : $scope.search.description
			};
		},
		
		createInsertQueryRequest: function ($scope){
			return {
				catalogName : $scope.catalogName,
				'DX_DESCRIPTION' : $scope.form.description,
				'DN_STATUS_CODE' : true
			}
		},
		
		createUpdateQueryRequest: function ($scope){
			return {
				catalogName : $scope.catalogName,
				primaryKey : parseInt($scope.form.id),
				'DX_DESCRIPTION' : $scope.form.description,
				'DN_STATUS_CODE' : $scope.form.active === undefined ? true : $scope.form.active
			}
		},
		
		createUpdateFlagRequest: function ($scope, id){
			return {
				catalogName : $scope.catalogName,
				primaryKey : parseInt(id)
			};
		}
	};
});
function catalogProperties(responseArray, description, status_code, name){
	var catalog = {
			column : {},
			obj : {
				id : 0,
				description : '',
				name : '',
				active : 0
			}
	};
	catalog.column = responseArray;
	for(var j=0; j<catalog.column.Columns.length; j++){
		if( catalog.column.Columns[j].name === description ){
			catalog.obj.description = catalog.column.Columns[j].value.value; 
		} else if( catalog.column.Columns[j].name === status_code ) {
			catalog.obj.active = catalog.column.Columns[j].value.value;
		} else if( catalog.column.Columns[j].name === name ) {
			catalog.obj.name = catalog.column.Columns[j].value.value;
		} else if( /^(SK_)[a-z,A-Z,0-9](_ID)?/.test(catalog.column.Columns[j].name) ){
			catalog.obj.id = catalog.column.Columns[j].value.value;
		}
	}
	return catalog.obj;
};