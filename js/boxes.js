/*
* Requires templateEngine: https://github.com/marcelonaegeler/template-engine
**/
var boxes = ( function () {
	"use strict";

	var base_template = [
		'<div class="alert" id="boxes-custom"><div class="alert-bg"></div><div class="alert-content">'
		, '<div class="alert-icon"><% icon %></div><div class="alert-content-text"><% text %></div>'
		, '<div class="alert-buttons"><% btns %></div>'
		,	'</div></div>'
	].join( '' );


	var setBoxesTriggers = function () {
		var a = document.getElementById( 'boxes-custom' );
		a = a.getElementsByClassName( 'boxes-action' );
		
		for ( var i = 0, l = a.length; i < l; i++ ) {
			var t = a[ i ].dataset.action;
			if ( actions[ t ] ) {
				a[ i ].onclick = actions[ t ];
			} else {
				a[ i ].onclick = window[ t ];
			}
		}
	};

	var close = function () {
		animate();
	};

	var animate = function () {
		var a = document.getElementById( 'boxes-custom' );
		if ( a.classList.contains( 'alert--in' ) ) {
			a.classList.add( 'alert--animating' );
			a.classList.remove( 'alert--in' );
			setTimeout( function () {
				a.remove();
			}, 200 );
		} else {
			setTimeout( function () {
				a.classList.add( 'alert--in' );
			}, 10 );
		}
	};

	var alert = function ( s ) {
		var data = {
			icon: ''
			, text: s
			, btns: '<button type="button" class="btn btn-primary boxes-action" data-action="close">Okay</button>'
		};
		var t = templateEngine( base_template, data );
		document.body.appendChild( t );

		animate();
		setBoxesTriggers();
	};

	var confirm = function ( s ) {
		var data = {
			icon: ''
			, text: s
			, btns: '<button type="button" class="btn btn-primary boxes-action" data-action="actionYes">Yes</button><button type="button" class="btn btn-primary boxes-action" data-action="actionNo">No</button>'
		};
		var t = templateEngine( base_template, data );
		document.body.appendChild( t );

		animate();

		setBoxesTriggers();
	};

	var actions = {
		close: close
	};

	return {
		alert: alert
		, confirm: confirm
	};
})();