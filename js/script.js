( function () {

	document.body.appendChild( 
		templateEngine( 
			document.getElementById( 'tpl-modal-content' ).innerHTML
			, { nome: 'Cleito' }
		) 
	);


	document.body.appendChild( 
		templateEngine( 
			document.getElementById( 'tpl-modal-infobox' ).innerHTML
			, { nome: 'Marcelo' }
		) 
	);

	var triggers = document.getElementsByClassName( 'modal-trigger' );

	for ( var i = 0, l = triggers.length; i < l; i++ ) {
		triggers[ i ].onclick = function () { modal.trigger.apply( this ); };
	}


})();