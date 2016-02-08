( function () {
 "use strict";

	var app = ( function () {

		var loadInfoBox = function () {
			var id = this.rel;
			var self = this;
			var modalId = this.dataset.modal;

			view.getTemplate( modalId, function ( t ) {
				var template = t;

				ajax.request({
					url: 'data-'+ id +'.json'
					, success: function ( d ) {
						d = JSON.parse( d );

						var existsModal = document.getElementById( modalId );
						if ( existsModal ) {
							existsModal.remove();
						}
						var t = templateEngine( template, d );
						document.body.appendChild( t );

						modal.setTriggers();

						setTimeout( function () {
							modal.trigger.apply( self );
						}, 20 );
						
					}
				});

			});
		};

		return {
			loadInfoBox: loadInfoBox
		};
	})();


	document.body.appendChild( 
		templateEngine( 
			document.getElementById( 'tpl-modal-content' ).innerHTML
			, { nome: 'Cleito' }
		) 
	);


	var triggers = document.getElementsByClassName( 'modal-trigger-ajax' );

	for ( var i = 0, l = triggers.length; i < l; i++ ) {
		triggers[ i ].onclick = function () { app.loadInfoBox.apply( this ); };
	}

	modal.setTriggers();


	var showAlert = document.getElementsByClassName( 'show-alert' )[0];
	showAlert.onclick = function () { 
		boxes.alert( 'That\'s cool!' );
	};

	var showConfirm = document.getElementsByClassName( 'show-confirm' )[0];

	window.actionYes = function () {
		console.log( 'o k' );
	};

	window.actionNo = function () {
		console.error( 'No' );
	};

	showConfirm.onclick = function () { 
		boxes.confirm( 'Are you sure of this?' );
	};

	

})();