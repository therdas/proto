function _prn (op1) {
	if(op1 == undefined) {
		_printHandler(acc);
		return true;
	}

	if(op1.type == 'numeric')
		_printHandler(op1.value);
	else if(_ist(op1))
		_printHandler(symbols[op1.value]);
	else if(op1.value == 'acc')
		_printHandler(acc);
	else 
		_printHandler(op1.value);

	return true;
}

function _inp (op1) {
	if(op1 == undefined){

		var temp = _input;
		return processToken(temp);
		
	} else if(arguments.length == 1) {

		if( !checkArgsT_V(arguments[0]) ){
			_logErr('The argument must be a variable');
		}
		console.log(processToken(_input));
		_set(op1, processToken(_input));
		return _input;

	}
}

function _inpa (){
	var temp = _input;
	acc = temp;
	return(processToken(temp));
}