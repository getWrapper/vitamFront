App.config(['FlashProvider', 'SystemParamConstants', function(FlashProvider, SystemParamConstants){
	FlashProvider.setTimeout(SystemParamConstants.MESSAGES_TIMEOUT);
    FlashProvider.setShowClose(SystemParamConstants.SHOW_CLOSE_BUTTON);
}]);

App.factory("MessagesService", function(Flash) {
	var messageServices = {
		success: function(message) {
			messageServices.clear();
			return Flash.create('success', message);
	    },
	    error: function(message) {
	    	messageServices.clear();
	    	return Flash.create('danger', message);
	    },
	    info: function(message) {
	    	messageServices.clear();
	    	return Flash.create('info', message);
	    },
	    warning: function(message) {
	    	messageServices.clear();
	    	return Flash.create('warning', message);
	    },
	    init: function() {
	    	messageServices.clear();
	    },
	    clear: function() {
	    	Flash.clear();
	    }
	};
	return messageServices;
});