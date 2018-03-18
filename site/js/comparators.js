function _gt (op1, op2) {
	if(arguments.length == 0){
		symbols['cflag'] = _genStack[_genStack.length-2]>_genStack[_genStack.length-1];
		return symbols['cflag'];
	}

	if(arguments.length == 1) {
		if(!checkArgsT_A(op1))
			return false;

		if(op1.type == 'variable') {
			acc = acc > symbols[op1.value];
			return acc;
		} else {
			acc = acc > op1.value;
			return acc;
		}
	}

	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);
	symbols['cflag'] = operand1 > operand2;
	return operand1 > operand2;
}

function _lt (op1, op2) {
	if(arguments.length == 0){
		symbols['cflag'] = _genStack[_genStack.length-2]<_genStack[_genStack.length-1];
		return symbols['cflag'];
	}

	if(arguments.length == 1) {
		if(!checkArgsT_A(op1))
			return false;

		if(op1.type == 'variable') {
			acc = acc < symbols[op1.value];
			return acc;
		} else {
			acc = acc < op1.value;
			return acc;
		}
	}

	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['cflag'] = operand1 < operand2;
	return operand1 < operand2;
}

function _gte (op1, op2) {
	if(arguments.length == 0){
		symbols['cflag'] = _genStack[_genStack.length-2]>=_genStack[_genStack.length-1];
		return symbols['cflag'];
	}

	if(arguments.length == 1) {
		if(!checkArgsT_A(op1))
			return false;

		if(op1.type == 'variable') {
			acc = acc >= symbols[op1.value];
			return acc;
		} else {
			acc = acc >= op1.value;
			return acc;
		}
	}

	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['cflag'] = operand1 >= operand2;
	return operand1 >= operand2;
}

function _lte (op1, op2) {
	if(arguments.length == 0){
		symbols['cflag'] = _genStack[_genStack.length-2]<=_genStack[_genStack.length-1];
		return symbols['cflag'];
	}

	if(arguments.length == 1) {
		if(!checkArgsT_A(op1))
			return false;

		if(op1.type == 'variable') {
			acc = acc <= symbols[op1.value];
			return acc;
		} else {
			acc = acc <= op1.value;
			return acc;
		}
	}

	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['cflag'] = operand1 <= operand2;
	return operand1 <= operand2;
}

function _eq (op1, op2) {
	if(arguments.length == 0){
		symbols['cflag'] = _genStack[_genStack.length-1]==_genStack[_genStack.length-2];
		return symbols['cflag'];
	}

	if(arguments.length == 1) {
		if(!checkArgsT_A(op1))
			return false;

		if(op1.type == 'variable') {
			acc = acc == symbols[op1.value];
			return acc;
		} else {
			acc = acc == op1.value;
			return acc;
		}
	}

	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['cflag'] = (operand1 == operand2);
	return operand1 == operand2;
}