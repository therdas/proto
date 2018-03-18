//
//  Symbol Manipulation
//

function _def (op1) {
	if( op1.type!='variable' )
		return false;

	if(arguments.length>1 && arguments[1].type != 'numeric')
		return false;

	symbols[op1.value];
	if(arguments.length>1)
		symbols[op1.value] = arguments[1].value;
	else
		symbols[op1.value] = 'NaN'

	return symbols[op1.value];
}

function _stz (op1) {
	if(!checkArgsT_V(op1))
		return false;

	symbols[op1.value] = 0;
	return symbols[op1.value];
}

function _set (op1) {

	if(arguments.length==1)
		var op2 = false;
	else
		var op2 = arguments[1];

	if ( !(checkArgsT_VA (op1, op2)||checkArgsT_A(op1)) )
		return false;

	if(arguments.length == 1) {
		if(op1.type == 'numeric')
			acc = op1.value;
		else
			acc = symbols[op1.value];
		return acc;
	} else if (arguments.length > 1){
		if(op2.type == 'numeric')
			symbols[op1.value] = op2.value;

		if(op2.type == 'variable')
			symbols[op1.value] = symbols[op2.value];

		return symbols[op1.value];
	}
}

function _del (op1) {
	if(!checkArgsT_V(op1))
		return false;

	delete symbols[op1.value];
	return true;
}

function _ist (op1){
	if(!checkArgsT_V(op1))
		return false;
	if(symbols.hasOwnProperty(op1.value))
		return true;
	else return false;
}