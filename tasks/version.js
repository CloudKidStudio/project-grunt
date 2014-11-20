module.exports = {
	options : {
		'build.json' : 'version',
		'bower.json' : 'version',
		'deploy/index.html' : function(contents, version){
			return contents.replace(
					/src\=(\"|\')([^\?\n\r\"\']+)(\?v\=[a-z0-9\.]*)?(\"|\')/ig, 
					'src="$2?v='+version+'"'
				)
				.replace(
					/href\=(\"|\')([^\?\n\r\"\']+\.css)(\?v\=[a-z0-9\.]*)?(\"|\')/ig, 
					'href="$2?v='+version+'"'
				);
		}
	}
};