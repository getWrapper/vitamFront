/**
 * Configure the Routes
 */
App.config(['$translateProvider', function($translateProvider) {
	$translateProvider
		  .preferredLanguage('es_MX')
		  .useSanitizeValueStrategy('escape')
		  .useStaticFilesLoader({
			    files: [{
			        prefix: 'i18n/',
			        suffix: '.json'
			    },
				{
			        prefix: 'i18n/wa_',
			        suffix: '.json'
			    },
				{
			        prefix: 'i18n/vitamedica/consulta/consulta_',
			        suffix: '.json'
			    },
				{
			        prefix: 'i18n/vitamedica/detalle/detalle_',
			        suffix: '.json'
			    },
				{
			        prefix: 'app/commons/directives/contextualInformation/i18n/ci_',
			        suffix: '.json'
			    }]
			})
		  ;
	}

]);