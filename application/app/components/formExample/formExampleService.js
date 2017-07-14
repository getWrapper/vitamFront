App.factory("formExampleService", ["$http", "$q", "RestService", "MessagesService", "RestServiceValidator", "RestConfigurationConstants", "ContextualInformationEndpoint", function($http, $q, RestService, MessagesService, RestServiceValidator, RestConfigurationConstants, ContextualInformationEndpoint) {
    var contextualInformationServices = {
        getCatalogByName: function($scope, catalogName) {
            var endpoint = genericCatalogUrl + BandejaEndpoint.getCatalog;
            var params = CatalogUtilService.createCatalogObj(catalogName);
            params.pageNumber = 1;
            params.pageSize = 100;
            RestService.post(endpoint, params)
                .then(function(data) {
                    if (RestServiceValidator.validateResponse(data.getCatalogByNameResponse.headerResponse, $scope)) {
                        bandejaServices.loadCatalog(CatalogUtilService.transformResponseToCatalog(data.getCatalogByNameResponse.businessResponse, ServiceConstants.descriptionField, ServiceConstants.statusCodeField, ServiceConstants.nameField), catalogName, $scope);
                    } else {
                        MessagesService.error(RestServiceValidator.getMessage($scope));
                    }
                }, function(error) {
                    MessagesService.error("{{'msg.common.ws.error' | translate }}");
                });
        }
    };
    
    return contextualInformationServices;
}]);