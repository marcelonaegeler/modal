var view = ( function () {
	"use strict";

	var tpls = {};

	var getTemplate = function ( t, cb ) {
		if ( tpls[ t ] ) {
			return cb( tpls[ t ] );
		}

		ajax.request({
			url: 'templates/'+ t +'.html'
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