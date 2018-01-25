var ELC = {
		TRANSPORTER: null,
		getData: function(result){
			console.log(result);
			if(typeof(result) == "string"){
				ELC.TRANSPORTER = JSON.parse(result.replace(/'/g, '"'));
			} else {
				ELC.TRANSPORTER = result;
			}
			return ELC.TRANSPORTER;
		}
}
