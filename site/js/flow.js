//
//  Flow Operators
//

function _bun(op) {
	if(!checkArgsT_A(op)){
		_logErr('BUN requires a variable or a number');
		return false;
	}

	if(op.type == 'numeric')
		_line = op.value - 1;
	else
		_line = symbols[op.value] - 1;

	return '-> '+_line;
}

function _bsa(op) {
	if(!checkArgsT_A(op)){
		_logErr('BSA requires a variable or a number');
		return false;
	}

	_addrStack.push(_line);

	if(op.type == 'numeric')
		_line = op.value - 1;
	else
		_line = symbols[op.value] - 1;

	return '-> '+_line;
}

function _return() {
	if(_addrStack.length==0){
		_logErr('No address to return to. Using return requires a previous BSA instruction');
		return false;
	}
	else
		_line = _addrStack.pop();

	return true;
}