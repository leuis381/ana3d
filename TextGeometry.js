THREE.TextGeometry = function ( text, parameters ) {
	parameters = parameters || {};
	const font = parameters.font;

	if ( font === undefined ) {
		console.error( 'THREE.TextGeometry: font parameter is not passed.' );
		return new THREE.Geometry();
	}

	const shapes = font.generateShapes( text, parameters.size || 100 );

	parameters.depth = parameters.height !== undefined ? parameters.height : 50;
	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	return new THREE.ExtrudeGeometry( shapes, parameters );
};

THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
