//
//	Arithmetic Functions
//

function _and () {
	var fun = function(x, y) {
		return x&y;
	}

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _or () {
	var fun = function(x, y) {
		return x|y;
	}

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _xor () {
	var fun = function(x, y) {
		return x^y;
	}

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _not () {						//due to a limit in implementation, both complements acc and stack top if args.len == 0
	var op1, op2;

	if(arguments.length == 0) {
		var ret = '';
		if(_genStack.length>0){
			var a = _genStack.pop();
			if(a == 0) a = 1;
			else if(a == 1) a = 0;
			else a = ~a;
			_genStack.push(a);
			ret += 'Stack top = ' + _genStack[_genStack.length-1]
		}

		if(acc == 0) acc = 1;
		else if(acc == 1) acc = 0;
		else acc = ~acc;

		return ret + ' Accumulator = ' + acc;
	}

	if(arguments.length == 1) {
		op1 = arguments[0];

		if ( !checkArgsT_V(op1) ){
			_logErr('One address NOT requires a variable operand')
			return false;
		}

		var b = symbols[op1.value];
		if(b == 0) b = 1;
		else if (b == 1) b = 0;
		else b = ~b;

		symbols[op1.value] = b;
		return b;
	}

	if(arguments.length == 2) {
		op1 = arguments[0];
		op2 = arguments[1];

		if(!checkArgsT_VA(op1, op2)){
			_logErr('Two address NOT requires first operand to be a variable and second to be a number or a variable');
			return false;
		}

		var b = fetchData(op2);
		if(b == 0) b = 1;
		else if (b == 1) b = 0;
		else b = ~b;

		symbols[op1.value] = b;
		return b;
	}

	return false;
}