//
//	Arithmetic Functions
//

function _and () {
	if(arguments.length == 0) {
		_genStack.push(_genStack.pop()&_genStack.pop())
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
			acc &= op1.value;
		else
			acc &= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] & op2.value;
		else
			symbols[op1.value] = symbols[op1.value] & symbols[op2.value];
		return symbols[op1.value];
	}
}

function _or () {
	if(arguments.length == 0) {
		_genStack.push(_genStack.pop()|_genStack.pop())
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
			acc |= op1.value;
		else
			acc |= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] | op2.value;
		else
			symbols[op1.value] = symbols[op1.value] | symbols[op2.value];
		return symbols[op1.value];
	}
}

function _not () {						//due to a limit in implementation, both complements acc and stack top if args.len == 0
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

	op1 = arguments[0];

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !checkArgsT_V(op1) )
		return false;

	if(arguments.length >= 1) {
		 var b = symbols[op1.value];
		 if(b == 0) b = 1;
		 else if (b == 1) b = 0;
		 else b = ~b;

		symbols[op1.value] = b;
		return b;
	}

	return false;
}

function _xor () {
	if(arguments.length == 0) {
		_genStack.push(_genStack.pop()^_genStack.pop())
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
			acc ^= op1.value;
		else
			acc ^= symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = symbols[op1.value] ^ op2.value;
		else
			symbols[op1.value] = symbols[op1.value] ^ symbols[op2.value];
		return symbols[op1.value];
	}
}