/**
 * Configure the Routes
 */
App.config([ '$stateProvider','$urlRouterProvider', 'SystemParamConstants', function($stateProvider, $urlRouterProvider, SystemParamConstants) {
	//rutas
	// * : todos los roles
	$stateProvider
		.state('login',{
			url: SystemParamConstants.LOGIN_FILE,
			templateUrl: 'app/components/login/loginView.html',
			controller: 'loginController',
			authenticate: false
		})
		.state('helloWorld',{
			url: '/helloWorld',
			templateUrl: 'app/components/helloworld/helloWorldView.html',
			controller: 'helloWorldController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('inicioConsulta',{
			url: '/inicioConsulta',
			templateUrl: 'app/components/inicioConsulta/inicioConsultaView.html',
			controller: 'inicioConsultaController',
			authenticate: false,
			rol : ['Arquitecto', 'BA']
		})
		.state('detalleConsulta',{
			url: '/detalleConsulta',
			templateUrl: 'app/components/detalleConsulta/detalleConsultaView.html',
			controller: 'detalleConsultaController',
			authenticate: false,
			rol : ['Arquitecto', 'BA']
		})
		.state('helloWorld/mexico',{
			url: '/helloWorld/mexico',
			templateUrl: 'app/components/helloworld/mexico/mexicoView.html',
			controller: 'mexicoController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('helloWorld/mexico/associate',{
			url: '/helloWorld/mexico/associate',
			templateUrl: 'app/components/helloworld/mexico/associate/associateView.html',
			controller: 'associateController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('helloWorld/mexico/vendor',{
			url: '/helloWorld/mexico/vendor',
			templateUrl: 'app/components/helloworld/mexico/vendor/vendorView.html',
			controller: 'vendorController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('helloWorld/guatemala',{
			url: '/helloWorld/guatemala',
			templateUrl: 'app/components/helloworld/guatemala/guatemalaView.html',
			controller: 'guatemalaController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('helloWorld/costaRica',{
			url: '/helloWorld/costaRica',
			templateUrl: 'app/components/helloworld/costaRica/costaRicaView.html',
			controller: 'costaRicaController',
			authenticate: true,
			rol : ['Arquitecto', 'BA']
		})
		.state('goodByeWorld',{
			url: '/goodByeWorld',
			templateUrl: 'app/components/goodByeWorld/goodByeWorldView.html',
			controller: 'goodByeWorldController',
			authenticate: true,
			rol : ['Arquitecto']
		})
		.state('formExample',{
			url: '/formExample',
			templateUrl: 'app/components/formExample/formExampleView.html',
			controller: 'formExampleController',
			authenticate: false,
			rol : ['*']
		})
		.state('unauthorized',{
			url: '/unauthorized',
			templateUrl: 'app/components/unauthorized/unauthorizedView.html',
			rol : ['*']
		})
		.state('notFound',{
			url: '/404',
			templateUrl: 'app/components/notFound/404.html',
			authenticate: false,
			rol : ['*']
		})
		//default route
		$urlRouterProvider.otherwise('/404');
	}
]);