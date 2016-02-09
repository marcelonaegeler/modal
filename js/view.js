var view = ( function () {
	"use strict";

	var base_url = document.body.dataset.url;

	var tpls = {};

	var getTemplate = function ( t, cb ) {
		if ( tpls[ t ] ) {
			return cb( tpls[ t ] );
		}

		ajax.request({
			url: [ base_url, 'templates', t +'.html' ].join( '/' )
			, success: function ( h ) {
				tpls[ t ] = h;
				cb( tpls[ t ] );
			}
		});

	};

	return {
		getTemplate: getTemplate
	};

})();