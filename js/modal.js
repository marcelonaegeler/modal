var modal = ( function () {
	'use strict';

	/*
	* Get the scroll bar width
	**/
	( function () {
		var scrollDiv = document.createElement( 'div' );
		scrollDiv.className = 'scrollbar-measure';
		document.body.appendChild( scrollDiv );

		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.body.removeChild( scrollDiv );

		if ( scrollbarWidth > 0 ) {
			var s = document.createElement( 'style' );
			s.innerText = '.modal-bg{right:'+ scrollbarWidth +'px;}';
			document.head.appendChild( s );
		}
	})();


	// Get and set triggers
	var setTriggers = function () {

		var triggers = document.getElementsByClassName( 'modal-trigger' );
		for ( var i = 0, l = triggers.length; i < l; i++ ) {
			triggers[ i ].onclick = function () { trigger.apply( this ); };
		}

	};

	// Verify if determined modal is open
	var isOpen = function ( modalId ) {
		return document.getElementById( modalId ).classList.contains( 'modal--in' );
	};

	var trigger = function ( modalId ) {
		/*
		* this -> refers to the caller
		* modalId -> is the modal to open OPTIONAL
		**/
		if ( !modalId ) {
			modalId = this.dataset.modal;
		}

		var styleId = 'stylesheet-'+ modalId;
		var m = document.getElementById( modalId );

		if ( !m ) {
			throw new Error( 'Modal #'+ modalId +' doesn\'t appear to exist.' );
		}

		var modalClassList = m.classList;

		if ( modalClassList.contains( 'modal--in' ) ) {

			modalClassList.add( 'modal--animating' );
			modalClassList.remove( 'modal--in' );

			var hasFocus = document.getElementsByClassName( 'modal--focus' );
			if ( hasFocus.length ) {
				hasFocus[ 0 ].classList.remove( 'modal--focus' );
			}


			setTimeout( function () {
			
				document.body.classList.remove( 'mode--overflow' );	
				modalClassList.remove( 'modal--animating' );

				var tmpStyle = document.getElementById( styleId );
				if ( tmpStyle ) {
					tmpStyle.remove(); // remove the style from positioning
				}
			}, 100 );

		} else {

			document.body.classList.add( 'mode--overflow' );

			modalClassList.add( 'modal--in' );
			
			var bg = m.getElementsByClassName( 'modal-bg' )[ 0 ]; // Will only have one ;)
			bg.onclick = function () { trigger.call( null, this.parentNode.id ); }; // Call this=null just to pass the modal id to close

			if ( modalClassList.contains( 'modal--position' ) ) {
				var position = {
					top: this.offsetParent.offsetTop + this.offsetTop - document.body.scrollTop - 10
					, left: this.offsetParent.offsetLeft + this.offsetLeft + this.offsetWidth + 15
				};

				this.parentNode.parentNode.classList.add( 'modal--focus' );

				var s = document.createElement( 'style' );
				s.id = 'stylesheet-'+ modalId;
				s.innerText = [ '#', modalId, ' .modal-dialog {top:', position.top, 'px;left:', position.left, 'px;}' ].join( '' );
				document.head.appendChild( s );
			}

		}
	};

	setTriggers();

	return {
		trigger: trigger
		, isOpen: isOpen
		, setTriggers: setTriggers
	};

})();