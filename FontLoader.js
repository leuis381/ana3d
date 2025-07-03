THREE.FontLoader = function ( manager ) {
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
};

THREE.FontLoader.prototype = {
	constructor: THREE.FontLoader,

	load: function ( url, onLoad, onProgress, onError ) {
		const scope = this;
		const loader = new THREE.FileLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {
			let json;
			try {
				json = JSON.parse( text );
			} catch ( e ) {
				console.warn( 'THREE.FontLoader: typeface.json could not be parsed' );
				return;
			}
			const font = scope.parse( json );
			if ( onLoad ) onLoad( font );
		}, onProgress, onError );
	},

	parse: function ( json ) {
		return new THREE.Font( json );
	}
};
