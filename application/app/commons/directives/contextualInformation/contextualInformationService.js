App.factory("contextualInformationService", ["$http", "$q", "$sessionStorage", "$location", "$timeout", "$compile", "RestService", "MessagesService", "RestServiceValidator", "ContextualInformationEndpoint", "ContextualInformationConstants", "SystemParamConstants", function($http, $q, $sessionStorage, $location, $timeout, $compile, RestService, MessagesService, RestServiceValidator, ContextualInformationEndpoint, ContextualInformationConstants, SystemParamConstants) {
    var contextualInformationServices = {
    	getContextualInformation: function($scope, $rootScope) {
            contextualInformationLayout.hide("east");
            jQuery("#openContextualInformation").hide();
            $rootScope.showContextualInformation = false;
    		// Obtain the page name
            var pathArray = $location.path().split("/");
            $scope.pageName = pathArray[pathArray.length - 1];

            $timeout(function() {
                contextualInformationServices.getContextualInformationBySection($scope, $rootScope);
            }, 100);
            
            if(contextualInformationOpened) {
	            contextualInformationLayout.close('east');
            }
        },
        getContextualInformationBySection: function($scope, $rootScope) {
        	var contForms = 0;
            jQuery("form").each(function() {
            	contForms++;
                var formName = jQuery(this).attr("name");
                if (formName != undefined) {
                	contextualInformationServices.callContextualInformationService($scope.pageName, formName, $scope, $rootScope);
                }
            });
            if(contForms == 0) {
            	contextualInformationServices.callContextualInformationService($scope.pageName, "", $scope, $rootScope);
            }
        },
        callContextualInformationService: function(pageName, formName, $scope, $rootScope) {
            var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.getContextualInfoDetail;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                    "ApplicationName": SystemParamConstants.APPLICATION_NAME,
                    "PageName": pageName,
                    "SectionName": formName,
                    "CultureName": SystemParamConstants.CULTURE_NAME
                }
            };
            RestService.post(endpoint, params).then(function(data) {

                if (data.GetContextualInfoDetailResponse != undefined) {
                    if (data.GetContextualInfoDetailResponse.headerResponse.reasons == "") {
                        contextualInformationServices.printHelpIcon(data.GetContextualInfoDetailResponse.businessResponse.DomaintItemsResult.Page, $scope, $rootScope);
                        $scope.isAdministrator = data.GetContextualInfoDetailResponse.businessResponse.DomaintItemsResult.Page.isAdministrator == "true";
                        $rootScope.faqs = data.GetContextualInfoDetailResponse.businessResponse.DomaintItemsResult.Page.FaqList;
                        $rootScope.showContextualInformation = true;
                        
                        if($sessionStorage.showMenu) {
                            contextualInformationLayout.show("east", false);
                            jQuery("#openContextualInformation").show();
                        }
                    } else {
                        $rootScope.showContextualInformation = false;
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        },
        printHelpIcon: function(pageResults, $scope, $rootScope) {
        	var id = 1;
        	var idTitle = 1;
        	if($rootScope.fields == undefined) {
        		$rootScope.fields = new Array();
			}
        	if(jQuery("h1.include-ci, h2.include-ci, h3.include-ci, h4.include-ci, h5.include-ci, h6.include-ci").size() == 0) {
        		var count = 0;
	    		jQuery("h2").each(function(){
	    			if(count == 0) {
	    				jQuery(this).addClass("include-ci");
	    				count++;
	    			}
	    		});
        	}
        	jQuery("h1.include-ci, h2.include-ci, h3.include-ci, h4.include-ci, h5.include-ci, h6.include-ci").each(function(){
        		var title = jQuery(this).html();
        		var el = $compile("<a href='#' id='" + idTitle + "' class='titleContextualInformation' onclick='return false' ng-click='showPageInformation($event, \"" + idTitle + "\")'>" + title + "</a>")($scope);
        		jQuery(this).html(el);
        		$rootScope.pageName = pageResults.Name;
        		$rootScope.pageContextualInfo = pageResults.ContextualInfo;
        		jQuery("#pageContextualInformationContainer #fieldName").html(pageResults.Name);
                jQuery("#pageContextualInformationContainer #help").html(pageResults.ContextualInfo);
                
                jQuery(".include-ci .titleContextualInformation").click(function(e) {
                	e.preventDefault();
            		if(!jQuery('.ui-layout-toggler-east-open').hasClass('ui-layout-toggler-east-open')) {
            			jQuery(".ui-layout-toggler").click();
            		}
            	});
        	});
            jQuery.each(pageResults.SectionList, function(sectionKey, sectionData) {
            	jQuery.each(sectionData.ControlList, function(controlKey, controlData) {
            		var elementsLength = sectionData.ControlList.length == undefined ? 1 : sectionData.ControlList.length;
	                var name = controlData.Name;
	                var help = controlData.ContextualInfo;
	                
	                $rootScope.fields[name] = {};
	                $rootScope.fields[name].name = name;
	                $rootScope.fields[name].description = help;
	                
	                var el = "";
                	el = $compile("<span id='contextualInfoIconId-" + id + "' class='right contextualInformation ctxIcon' ng-click='showInformation($event, \"" + name + "\",  \"" + id + "\")'><span><span tooltips tooltip-template='" + help + "' tooltip-side='top' class='icon-question-sign size-small'></span></span></span>")($scope);
                	$rootScope.fields[name].label = jQuery("[name='" + name + "']").siblings('label');
	                $rootScope.fields[name].label = $rootScope.fields[name].label[0] != undefined ? $rootScope.fields[name].label[0].innerText.replace('*', '') : '';
                	jQuery("[name='" + name + "']").siblings('label').children('.contextualInformation').remove();
	                jQuery("[name='" + name + "']").siblings('label').append(el);
	                $scope.descriptions[id] = help;
	                
	                if (jQuery("[name='" + name + "']").length == 0 && elementsLength.length > 0 && $rootScope.fields[name].label[0] == undefined && callCounter < 2) {
	                    $timeout($scope.init);
	                    callCounter++;
	                }
	                
	                id++;
            	  });
            });
            contextualInformationServices.printNewHelpIcon($scope, $rootScope);
        },
        printNewHelpIcon: function($scope, $rootScope) {
        	var id = 1000;
        	jQuery(".include-ci input, .include-ci select, .include-ci textarea, .include-ci md-select, .include-ci md-datepicker").each(function() {
        		if(jQuery(this).siblings("label").find(".contextualInformation").length == 0) {
        			var name = jQuery(this).attr("name");
        			var el = $compile("<span id='contextualInfoIconId-" + id + "' class='right contextualInformation contextualInformation-new ctxIcon' contextual-information ng-click='showInformation($event, \"" + name + "\",  \"" + id + "\")'/>")($scope);
        			$rootScope.fields[name] = {};
        			$rootScope.fields[name].name = name;
        			$rootScope.fields[name].description = "";
        			$rootScope.fields[name].label = jQuery(this).siblings('label');
        			$rootScope.fields[name].label = $rootScope.fields[name].label[0] != undefined ? $rootScope.fields[name].label[0].innerText.replace('*', '') : '';
        			
        			jQuery(this).siblings("label").append(el);
        			id++;
        		}
        	});
        },
        save: function(pageName, formName, controlName, contextualInformation, $rootScope, $scope) {
        	// Obtain the page name
            var pathArray = $location.path().split("/");
            pageName = pathArray[pathArray.length - 1];
        	
        	var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.setContextualInformationInControl;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                	"ApplicationName": SystemParamConstants.APPLICATION_NAME,
                    "PageName": pageName,
                    "PageDescription": "",
                    "SectionName": formName,
                    "SectionDescription": "",
                    "ControlName": controlName,
                    "ControlDescription": contextualInformation,
                    "CultureName": SystemParamConstants.CULTURE_NAME
                }
            };
            RestService.post(endpoint, params).then(function(data) {
                if (data.SetContextualInformationInControlResponse != undefined) {
                    if (data.SetContextualInformationInControlResponse.headerResponse.reasons == "") {
                    	$rootScope.fields[controlName].description = contextualInformation;
                    	el = $compile("<span id='contextualInfoIconId-" + $rootScope.contextualInformationFieldId + "' class='right contextualInformation ctxIcon' ng-click='showInformation($event, \"" + controlName + "\",  \"" + $rootScope.contextualInformationFieldId + "\")'><span><span tooltips tooltip-template='" + contextualInformation + "' tooltip-side='top' class='icon-question-sign size-small'></span></span></span>")($scope);
                    	jQuery("#contextualInfoIconId-" + $rootScope.contextualInformationFieldId + ".contextualInformation-new").parent().append(el);
                    	jQuery("#contextualInfoIconId-" + $rootScope.contextualInformationFieldId + ".contextualInformation-new").remove();
                    	jQuery("#contextualInfoIconId-" + $rootScope.contextualInformationFieldId + " tooltip").attr("tooltip-template", contextualInformation);
                    	jQuery("#contextualInfoIconId-" + $rootScope.contextualInformationFieldId + " tip-tip").html("<span id='close-button' style='display: none;'>×</span>" + contextualInformation);
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        },
        savePage: function(pageName, contextualInformation, $rootScope) {
        	// Obtain the page name
            var pathArray = $location.path().split("/");
            pageName = pathArray[pathArray.length - 1];
        	
        	var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.setContextualInformationInPage;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                	"ApplicationName": SystemParamConstants.APPLICATION_NAME,
                    "PageName": pageName,
                    "PageDescription": contextualInformation,
                    "SectionName": "",
                    "SectionDescription": "",
                    "ControlName": "",
                    "ControlDescription": "",
                    "CultureName": SystemParamConstants.CULTURE_NAME
                }
            };
            RestService.post(endpoint, params).then(function(data) {
                if (data.SetContextualInformationInPageResponse != undefined) {
                    if (data.SetContextualInformationInPageResponse.headerResponse.reasons == "") {
                    	$rootScope.pageContextualInfo = contextualInformation;
                    	jQuery("#pageContextualInformationContainer .contextualInformationDescription").html(contextualInformation);
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        },
        saveFaq: function(faq, $rootScope) {
        	// Obtain the page name
            var pathArray = $location.path().split("/");
            pageName = pathArray[pathArray.length - 1];
            
            faq.order = parseInt(jQuery("v-accordion.faqs v-pane:last .orderNumber").html()) + 1;
            if(isNaN(faq.order)) {
            	faq.order = 1;
            }
        	
        	var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.setFAQInPage;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                	"FaqInfoRequest" : [{
                		"ApplicationName": SystemParamConstants.APPLICATION_NAME,
                        "PageName": pageName,
                        "Question": faq.question,
                        "Answer": faq.answer,
                        "Order": faq.order,
                        "CultureName": SystemParamConstants.CULTURE_NAME
                	}]
                }
            };
            RestService.post(endpoint, params).then(function(data) {
                if (data.SetFaqInPageResponse != undefined) {
                    if (data.SetFaqInPageResponse.headerResponse.reasons == "") {
                    	$rootScope.faqs = data.SetFaqInPageResponse.businessResponse.DomaintItemsResult.FaqList;
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        },
        saveUpdateFaq: function(faq, $rootScope) {
        	// Obtain the page name
            var pathArray = $location.path().split("/");
            pageName = pathArray[pathArray.length - 1];
        	
        	var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.updateFaqInPage;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                	"FaqInfoRequest" : [{
                		"ApplicationName": SystemParamConstants.APPLICATION_NAME,
                        "PageName": pageName,
                        "Question": faq.question,
                        "Answer": faq.answer,
                        "Order": parseInt(faq.order),
                        "QuestionId": parseInt(faq.id),
                        "CultureName": SystemParamConstants.CULTURE_NAME
                	}]
                }
            };
            RestService.post(endpoint, params).then(function(data) {
                if (data.UpdateFaqInPageResponse != undefined) {
                    if (data.UpdateFaqInPageResponse.headerResponse.reasons == "") {
                    	$rootScope.faqs = data.UpdateFaqInPageResponse.businessResponse.DomaintItemsResult.FaqList;
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        },
        deleteFaq: function(id, $rootScope) {
        	// Obtain the page name
            var pathArray = $location.path().split("/");
            pageName = pathArray[pathArray.length - 1];
        	
        	var contextualInformationApiUrl = ContextualInformationConstants.CONTEXTUAL_INFORMATION_API_URL;
            var endpoint = contextualInformationApiUrl + ContextualInformationEndpoint.deleteFaqInPage;
            var params = {
                "headerRequest": {
                    "service": ContextualInformationConstants.CONTEXTUAL_INFORMATION_SERVICE_ID,
                    "domain": ContextualInformationConstants.CONTEXTUAL_INFORMATION_DOMAIN_ID,
                    "business": ContextualInformationConstants.CONTEXTUAL_INFORMATION_BUSINESS_ID,
                    "channel": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CHANNEL_ID,
                    "client": ContextualInformationConstants.CONTEXTUAL_INFORMATION_CLIENT_ID,
                    "requestClient": ContextualInformationConstants.CONTEXTUAL_INFORMATION_REQUEST_CLIENT_ID,
                    "requestDate": new Date(),
                },
                "businessRequest": {
                	"FaqInfoRequest" : [{
                		"ApplicationName": SystemParamConstants.APPLICATION_NAME,
                        "PageName": pageName,
                        "QuestionId": parseInt(id),
                        "CultureName": SystemParamConstants.CULTURE_NAME
                	}]
                }
            };
            RestService.post(endpoint, params).then(function(data) {
                if (data.DeleteFaqInPageResponse != undefined) {
                    if (data.DeleteFaqInPageResponse.headerResponse.reasons == "") {
                    	jQuery("#faq-" + id).remove();
                    }
                }
            }, function(error) {
                MessagesService.error("{{'msg.common.ws.error' | translate }}");
            });
        }
    };

    return contextualInformationServices;
}]);