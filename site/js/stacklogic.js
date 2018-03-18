//
//	Stack functions
//

function _push (op1) {
	if(!checkArgsT_A(op1))
		return false;

	if(op1.type=='numeric')
		_genStack.push(op1.value);
	else
		_genStack.push(symbols[op1.value]);
	return _genStack[_genStack.length - 1];
}

function _pop() {
	if(arguments.length == 0)
		return _genStack.pop();

	var op1 = arguments[0];

	if(!checkArgsT_V(op1))
		return false;

	symbols[op1.value] = _genStack.pop();
	return symbols[op1.value];
}

function _prntop() {
	_printHandler(_genStack[_genStack.length-1]);
	return true;
}