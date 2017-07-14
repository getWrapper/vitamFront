App.constant("SystemParamConstants", {
	
	// Login file
	LOGIN_FILE: "/",
	
	// File to redirect after login
	WELCOME_FILE: "/inicioConsulta",
//	WELCOME_FILE: "/helloWorld",
	// Application name required by the menu service
	APPLICATION_NAME: "Arquetipo Web Dev",
	OPERATIONS_REQUIRED: "false",
	PERMISSIONS_REQUIRED: "false",
	
	// Application Language (i18n format) 
	CULTURE_NAME: "es-MX",
	
	// Messages configuration
	MESSAGES_TIMEOUT: 0, // 0 = never disappear (time in miliseconds)
	SHOW_CLOSE_BUTTON: true,
	
	// Token renew configuration
	MINUTES_TO_EVALUATE_TOKEN_EXPIRATION: 10, // Minutes before expiration to renew token
	MILLISECONDS_TO_SHOW_COUNTDOWN: 600000,
	
	// Archetype version
	ARCHETYPE_VERSION: "2.0.0"
});