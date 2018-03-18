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

function _inp () {
	var temp = window.prompt('Enter Value');
	return processToken(temp);
}
