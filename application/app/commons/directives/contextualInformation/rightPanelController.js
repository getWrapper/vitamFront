var contextualInformationLayout;
var contextualInformationOpened = false;
(function() {
    App.controller('rightPanelController', ['$scope', '$rootScope', '$sessionStorage', '$sce', '$mdDialog', '$mdMedia', 'contextualInformationService', function($scope, $rootScope, $sessionStorage, $sce, $mdDialog, $mdMedia, contextualInformationService) {
    	
    	$scope.contextualInformationPage = '';
    	$scope.faq = {};
        initSplitPanel($sessionStorage, $scope);
        
        $scope.closeRightPanel = function() {
        	contextualInformationLayout.close('east');
        }
        
        $scope.addUpdateFaq = false;
        
        $scope.showAddFaq = function() {
        	$scope.addUpdateFaq = true;
        	$scope.isAddFaq = true;
        }
        
        $scope.showUpdateFaq = function(faq) {
        	$scope.addUpdateFaq = true;
        	$scope.isAddFaq = false;
        	$scope.faq.question = faq.Question;
        	$scope.faq.answer = faq.Answer;
        	$scope.faq.order = faq.OrderNumber;
        	$scope.faq.id = faq.QuestionId;
        }
         
        $rootScope.$watch('faqs', function(newValue, oldValue) {
        	$scope.faqs = $rootScope.faqs;
        });
        
        $scope.save = function(valid) {
        	$scope.addUpdateFaq = false;
        	if($scope.isAddFaq) {
        		contextualInformationService.saveFaq($scope.faq, $rootScope);
        	} else {
        		contextualInformationService.saveUpdateFaq($scope.faq, $rootScope);
        	}
        	$scope.faq = {};
        }
        
        $scope.cancel = function() {
        	$scope.faq = {};
        	$scope.addUpdateFaq = false;
        }
        
        $scope.showDeleteFaq = function(faq) {
        	$rootScope.questionToDelete = faq.Question;
        	$rootScope.idQuestionToDelete = faq.QuestionId;
        	$mdDialog.show({
                templateUrl: 'app/commons/directives/contextualInformation/template/deleteQuestionConfirmation.html',
                controller: DeleteQuestionController,
                parent: angular.element(document.body),
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
        }
        
        $scope.showInformation = function(ev) {
        	$scope.pageName = jQuery("#pageContextualInformationContainer #fieldName").html();
        	$scope.pageDesc = jQuery("#pageContextualInformationContainer #help").html();
        	jQuery("#contextualInformationContainer #fieldName").html($scope.pageName);
            jQuery("#contextualInformationContainer #help").html($scope.pageDesc);
            
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
        }
        
        $scope.showPageInformationFromButton = function() {
        	contextualInformationLayout.open("east");
        }
        
        $scope.editorConfigPanel = {
			toolbar: [
			    { name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-'] },
			    { name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-'] },
			    { name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-'] },
			    { name: 'colors', items: ['fontColor', 'backgroundColor', '-'] },
			    { name: 'links', items: ['hr', 'symbols', 'link', 'unlink', '-'] },
			    { name: 'tools', items: ['print', '-'] }
			]
		};
    }]);
    
    function DeleteQuestionController($rootScope, $scope, $mdDialog, contextualInformationService) {
    	$scope.questionToDelete = $rootScope.questionToDelete;
    	
    	$scope.deleteContextualInformation = function() {
    		contextualInformationService.deleteFaq($rootScope.idQuestionToDelete, $rootScope);
    		$mdDialog.hide();
    	}
    	
    	$scope.cancel = function() {
        	$mdDialog.hide();
    	}
    }
    
    function initSplitPanel(session, $scope) {
        jQuery(document).ready(function() {
            contextualInformationLayout = jQuery('body').layout({
                defaults: {
                    fxName: "none",
                    fxSpeed: "fast",
                    initClosed: true
                },
                east: {
                    spacing_closed: 8,
                    togglerLength_closed: "100%",
                    resizable: false,
                    minSize: 300
                },
                onopen_end: function () {
                	contextualInformationLayout.resizeAll();
                	jQuery(".container").addClass("resized");
                	jQuery("md-tabs-wrapper").find("md-tab-item:first").each(function(){
                		jQuery(this).click();
                	});
                	var uiLayoutCenterWidth = jQuery("body").width() - 306;
                	
                	jQuery(".ui-layout-center").css("width", uiLayoutCenterWidth + 1);
                	jQuery(".ui-layout-center").css("width", uiLayoutCenterWidth - 1);
                	
                	contextualInformationOpened = true;
                    return false;
                },
                onclose_end: function () {
                	jQuery(".container").removeClass("resized");
                	contextualInformationOpened = false;
                    return false;
                }
            });
        });
    };
    
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
            contextualInformationService.savePage($scope.pageName, $scope.contextualInformation, $rootScope);
        }
        
        $scope.closeDialog = function() {
        	$mdDialog.hide();
        }
	};
})();