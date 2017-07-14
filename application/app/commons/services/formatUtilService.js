App.factory("FormatUtilService", function() {
	
	return {
		formatString : function (str){
			var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
		    to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
		    mapping = {};
			 
			for(var i = 0, j = from.length; i < j; i++ )
				mapping[ from.charAt( i ) ] = to.charAt( i );
			 
			
			var ret = [];
			for( var i = 0, j = str.length; i < j; i++ ) {
				var c = str.charAt( i );
				if( mapping.hasOwnProperty( str.charAt( i ) ) )
					ret.push( mapping[ c ] );
				else
					ret.push( c );
			}      
			return ret.join( '' ).replace( /[^-A-Za-z0-9.]+/g, '_' );
		}
	}
});