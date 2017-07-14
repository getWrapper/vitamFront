(function() {
    App.controller('contextualInformationController', ['$scope', '$rootScope', '$sce', '$location', '$http', '$compile', '$timeout', '$mdMedia', '$mdDialog', '$sessionStorage', 'contextualInformationService', function($scope, $rootScope, $sce, $location, $http, $compile, $timeout, $mdMedia, $mdDialog, $sessionStorage, contextualInformationService) {
        $scope.fields = new Array();
        $scope.pageName = "";
        
        $scope.config = {
        	isOpen: false,
        	count: 0,
        	direction: 'left'
        }

        var callCounter = 0;

        $scope.init = function() {
            contextualInformationService.getContextualInformation($scope, $rootScope);
            if(!$sessionStorage.showMenu || !$rootScope.showContextualInformation) {
        		jQuery(document).ready(function(){
        			contextualInformationLayout.hide("east");
                    jQuery("#openContextualInformation").hide();
        		});
        	} else {
        		contextualInformationLayout.show("east", false);
                jQuery("#openContextualInformation").show();
        	}
        }
        
        $scope.descriptions = new Array();

        $timeout($scope.init);

        // Call init of each page
        $rootScope.$watch(
            function() {
                return $location.path();
            },
            function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $timeout($scope.init);
                    callCounter = 0;
                }
            }
        );

        $scope.showInformation = function(ev, name, id) {
        	$rootScope.contextualInformationControlName = name;
        	$rootScope.contextualInformationControlForm = jQuery("#contextualInfoIconId-" + id).parents("form").attr("name");
        	$rootScope.contextualInformationFieldId = id;
        	$rootScope.editingPageContextualInformation = false;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            jQuery("#contextualInformationContainer #fieldName").html($rootScope.fields[name].label);
            jQuery("#contextualInformationContainer #help").html($rootScope.fields[name].description);
            $mdDialog.show({
                    templateUrl: 'app/commons/directives/contextualInformation/template/contextualInformationEdition.html',
                    controller: DialogController,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
        
        $scope.showPageInformation = function(ev, id) {
        	$rootScope.contextualInformationPageId = id;
        	$rootScope.editingPageContextualInformation = true;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            jQuery("#pageContextualInformationContainer #fieldName").html($rootScope.pageName);
            jQuery("#pageContextualInformationContainer #help").html($rootScope.pageContextualInfo);
        };
    }]);

    function DialogController($rootScope, $scope, $mdDialog, $sce, $q, $timeout, $sanitize, contextualInformationService) {
        $scope.fieldName = jQuery("#contextualInformationContainer #fieldName").html();
        $scope.contextualInformation = jQuery("#contextualInformationContainer #help").html();
        $scope.originalDesc = jQuery("#contextualInformationContainer #help").html();

        $scope.getContextualInformation = function() {
            return $sce.trustAsHtml($scope.contextualInformation);
        }
        $scope.api = {
            scope: $scope
        }

        // Config for WYSIWYG
		$scope.editorConfig = {
			sanitize: true,
			toolbar: [
			    { name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-'] },
			    { name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-'] },
			    { name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-'] },
			    { name: 'colors', items: ['fontColor', 'backgroundColor', '-'] },
			    { name: 'links', items: ['hr', 'symbols', 'link', 'unlink', '-'] },
			    { name: 'tools', items: ['print', '-'] }
			]
		};
        
        $scope.cancelContextualInformationEdition = function() {
        	$scope.contextualInformation = $scope.originalDesc;
        	$scope.showUpdate = false;
        }
        
        $scope.saveContextualInformation = function() {
            $scope.showUpdate = false;
            $scope.originalDesc = $scope.contextualInformation;
            if($rootScope.editingPageContextualInformation == true) {
            	contextualInformationService.savePage($scope.pageName, $scope.contextualInformation, $rootScope);
            } else {
            	contextualInformationService.save($scope.pageName, $rootScope.contextualInformationControlForm, $rootScope.contextualInformationControlName, $scope.contextualInformation, $rootScope, $scope);
            }
        }
        
        $scope.closeDialog = function() {
        	$mdDialog.hide();
        }
	};
})();