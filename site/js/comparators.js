function _binaryComparator(func) {
	if(arguments.length == 0)
		return false;
	var val1, val2, op1, op2, op3;

	if (arguments.length == 1) {	//Passed only the function

		if(_genStack.length<2){
			_logErr('Not enough elements in stack');
			return false;
		}

		symbols['cflag'] = func(_genStack[_genStack.length-2], _genStack[_genStack.length-1]);
		return symbols['cflag'];
	}

	if(arguments.length == 2) {		//Passed function and one argument
		op1 = arguments[1];

		if(!checkArgsT_A(op1)){
			_logErr('Comparison function takes either a variable or number');
			return false;
		}

		acc = func(acc, fetchData(op1));
		return acc;

	}

	if(arguments.length == 3) {		//Passed function and two args
		op1 = arguments[1];
		op2 = arguments[2];

		operand1 = fetchData(op1);
		operand2 = fetchData(op2);

		symbols['cflag'] = func(operand1, operand2);
		return symbols['cflag'];
	}

	if(arguments.length == 4) {		//Passed function and three args
		op1 = arguments[1];
		op2 = arguments[2];
		op3 = arguments[3];

		if(!checkArgsT_VAA(op1, op2, op3)){
			_logErr('Three address instructions must have first operand as variable and others as variable or number.');
			return false;
		}

		symbols[op1.value] = func(fetchData(op2), fetchData(op3));
		return symbols[op1.value];
	}
}

function _gt () {
	var fun = function(x,y) {
		return x > y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}

function _gt () {
	var fun = function(x,y) {
		return x > y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}

function _lt () {
	var fun = function(x,y) {
		return x < y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}

function _gte () {
	var fun = function(x,y) {
		return x >= y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}

function _lte () {
	var fun = function(x,y) {
		return x <= y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}

function _eq () {
	var fun = function(x,y) {
		return x == y;
	};

	switch(arguments.length) {
		case 0: return _binaryComparator(fun);                                           break;
		case 1: return _binaryComparator(fun, arguments[0]);                             break;
		case 2: return _binaryComparator(fun, arguments[0], arguments[1]);               break;
		case 3: return _binaryComparator(fun, arguments[0], arguments[1], arguments[2]); break;
	}

	return false;
}