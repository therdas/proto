//
//	Arithmetic Functions
//

/* Applies a function to two operands*/
function _binaryApplier (func) {
	if(arguments.length == 0)
		return false;

	var val1, val2, op, op1, op2, op3;

	if(arguments.length == 1) {					//Passed one func, no operands

		if(_genStack.length < 2){
			_logErr('Not enough elements in stack');
			return false;
		}

		val2=_genStack.pop()
		val1=_genStack.pop();
		_genStack.push(func(val1, val2));
		return _genStack[_genStack.length - 1];
	}

	if(arguments.length == 2) {					//Passed one func, one operand
		op = arguments[1];

		if(!checkArgsT_A(op)){
			_logErr('One address instructions must be a variable or an number.');
			return false;
		}

		acc = func(acc, fetchData(op));
		return acc;
	}

	if(arguments.length == 3) {					//Passed one func, two operands
		op1 = arguments[1];
		op2 = arguments[2];

		if(!checkArgsT_VA(op1, op2)){
			_logErr('Two address instructions must have first operand as variable and other as variable or number.');
			return false;
		}

		symbols[op1.value] = func(symbols[op1.value], fetchData(op2));
		return symbols[op1.value];
	}

	if(arguments.length == 4) {					//Passed one func, three operands
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

	return false;
}

/* Applies a function to a unary operand */

function _add(){

	var fun = function(x, y) {
		return x + y;
	};

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _sub(){

	var fun = function(x, y) {
		return x - y;
	};

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _mul(){

	var fun = function(x, y) {
		return x * y;
	};

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _div(){

	var fun = function(x, y) {
		console.log(x, y);
		if(y == 0)
			return 'NaN';
		return (x / y);
	};

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
}

function _mod(){

	var fun = function(x, y) {
		console.log(x, y);
		if(y == 0)
			return 'NaN';
		return (x % y);
	};

	switch(arguments.length) {
		case 0: return _binaryApplier(fun);                                            break;
		case 1: return _binaryApplier(fun, arguments[0]);                              break;
		case 2: return _binaryApplier(fun, arguments[0], arguments[1]);                break;
		case 3: return _binaryApplier(fun, arguments[0], arguments[1], arguments[2]);  break;
	}
	return false;
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