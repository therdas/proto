//
//	Arithmetic Functions
//

function _add () {
	if(arguments.length == 0) {
		_genStack.push(_genStack.pop()+_genStack.pop())
		return _genStack[_genStack.length-1];
	}

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VN (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric')
			acc += op1.value;
		else
			acc += symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] + op2.value;
		else
			symbols[op1.value] = symbols[op1.value] + symbols[op2.value];
		return symbols[op1.value];
	}
}

function _sub () {
	if(arguments.length == 0) {
		var v1 = _genStack.pop(), v2 = _genStack.pop();
		_genStack.push(v2-v1);
		return _genStack[_genStack.length-1];
	}

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VN (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric')
			acc -= op1.value;
		else
			acc -= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] - op2.value;
		else
			symbols[op1.value] = symbols[op1.value] - symbols[op2.value];
		return symbols[op1.value];
	}
}

function _mul () {
	if(arguments.length == 0) {
		var v1 = _genStack.pop(), v2 = _genStack.pop();
		_genStack.push(v2*v1);
		return _genStack[_genStack.length-1];
	}

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VN (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric')
			acc *= op1.value;
		else
			acc *= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] * op2.value;
		else
			symbols[op1.value] = symbols[op1.value] * symbols[op2.value];
		return symbols[op1.value];
	}
}

function _div () {
	if(arguments.length == 0) {
		var v1 = _genStack.pop(), v2 = _genStack.pop();
		if(v1 == 0){
			_genStack.push(v2); _genStack.push(v1);
			return false;
		}
		_genStack.push(v2/v1);
		return _genStack[_genStack.length-1];
	}

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VN (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric'){
			if(op1.value == 0){
				acc = NaN;
				return false;
			}
			acc /= op1.value;
		}
		else
			acc /= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		
	if(op2.type == 'numeric'){
		if(op2.value == 0){
			 	symbols[op1.value] = 'NaN';
				return false;
			}
			symbols[op1.value] = symbols[op1.value] / op2.value;
		} else {
			if(symbols[op2.value] == 0){ 
				symbols[op2.value] = 'NaN';
				return false;
			}
			symbols[op1.value] = symbols[op1.value] / symbols[op2.value];
		}

		return symbols[op1.value];
	}
}

function _mod () {
	if(arguments.length == 0) {
		var v1 = _genStack.pop(), v2 = _genStack.pop();
		if(v1 == 0){
			_genStack.push(v2); _genStack.push(v1);
			return false;
		}
		_genStack.push(v2%v1);
		return _genStack[_genStack.length-1];
	}

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VN (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric'){
			if(op1.value == 0){
				acc = NaN;
				return false;
			}
			acc %= op1.value;
		}
		else
			acc %= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		
	if(op2.type == 'numeric'){
		if(op2.value == 0){
			 	symbols[op1.value] = 'NaN';
				return false;
			}
			symbols[op1.value] = symbols[op1.value] % op2.value;
		} else {
			if(symbols[op2.value] == 0){ 
				symbols[op2.value] = 'NaN';
				return false;
			}
			symbols[op1.value] = symbols[op1.value] % symbols[op2.value];
		}

		return symbols[op1.value];
	}
}

function _rni () {
	obj = {};
	obj['value'] = Math.floor(Math.random() * Math.floor(11));
	obj['type'] = 'numeric';
	return obj;
}

function _rnp () {
	obj = {};
	obj['value'] = Math.floor(Math.random() * Math.floor(101));
	obj['type'] = 'numeric';
	return obj;
}

function _rnr () {
	obj = {};
	obj['value'] = Math.random();
	obj['type'] = 'numeric';
	return obj;
}