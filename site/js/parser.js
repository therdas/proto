var symbols = {};
symbols['temp'] = 'NaN';
var keywords = 'add sub mul div mod setz set rani ranp ranr lt gt lte gte eq def del ist prn inp';
var _bin = 'add sub mul div mod set lt gt lte gte eq def';
var _un = 'setz def del ist prn';
var _anon = 'rani ranp ranr inp';

function tokenise (string) {
	var tokens = string.split(' ');
	var tokenObject = {};
	if(!isFunctor(tokens[0]))
		return false;
	tokenObject['functor'] = tokens[0];
	switch (tokens.length) {
		case 0: return false;
		case 1: break;
		case 2: tokenObject['op1'] = processToken(tokens[1]);
				break;
		case 3: tokenObject['op1'] = processToken(tokens[1]);
				tokenObject['op2'] = processToken(tokens[2]);
				break;
	}
	return tokenObject;
}

//courtesy of https://stackoverflow.com/a/1830844
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFunctor(str) {
	if(functionMap.hasOwnProperty(str))
		return true;
	return false;
}

function funcArgs (str) {
	if(_bin.indexOf(str)!=-1)
		return 2;
	if(_un.indexOf(str)!=-1)
		return 1;
	if(_anon.indexOf(str)!=-1)
		return 0;
	return false;
}

function processToken(string) {
	var obj = {};

	if(isNumeric(string)) {
		obj['value'] = parseFloat(string);
		obj['type'] = 'numeric';
		return obj;
	}

	if(isFunctor(string)) {
		obj['value'] = string;
		obj['type'] = 'functor';
		obj['args'] = funcArgs(string);
		return obj;
	}

	obj['value'] = string;
	obj['type'] = 'variable';
	return obj;
}



//
//  Checking Arguements
//
function checkArgsT_V (op1) {
	if(op1.type != 'variable')
		return false;

 	return true;
}

function checkArgsT_AA (op1, op2) {
	if(op1.type != 'numeric' && op1.type != 'variable')
		return false;

	if(op2.type != 'numeric' && op2.type != 'variable')
		return false;

	return true;
}

function checkArgsT_VA (op1, op2) {
	if(op1.type != 'variable')
		return false;

	if(op2.type != 'numeric' && op2.type != 'variable')
		return false;

	return true;
}

function checkArgsT_VN (op1, op2) {
	if(op1.type != 'variable')
		return false;

	if(op2.type != 'numeric' && op2.type != 'variable')
		return false;

	return true;
}

//
//	Arithmetic Functions
//

function _add (op1, op2) {
	if (!checkArgsT_VN (op1, op2))
		return false;

	if(op2.type == 'numeric')
		symbols[op1.value] = symbols[op1.value] + op2.value;
	else
		symbols[op1.value] = symbols[op1.value] + symbols[op2.value];

	return symbols[op1.value];
}

function _sub (op1, op2) {
	if (!checkArgsT_VN (op1, op2))
		return false;

	if(op2.type == 'numeric')
		symbols[op1.value] = symbols[op1.value] - op2.value;
	else
		symbols[op1.value] = symbols[op1.value] - symbols[op2.value];

	return symbols[op1.value];
}

function _mul (op1, op2) {
	if (!checkArgsT_VN (op1, op2))
		return false;

	if(op2.type == 'numeric')
		symbols[op1.value] = symbols[op1.value] * op2.value;
	else
		symbols[op1.value] = symbols[op1.value] * symbols[op2.value];

	return symbols[op1.value];
}

function _div (op1, op2) {
	if (!checkArgsT_VN (op1, op2))
		return false;

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

function _mod (op1, op2) {
	if (!checkArgsT_VN (op1, op2))
		return false;

	if(op2.type == 'numeric')
		symbols[op1.value] = symbols[op1.value] % op2.value;
	else
		symbols[op1.value] = symbols[op1.value] % symbols[op2.value];

	return symbols[op1.value];
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

function _set (op1, op2) {
	if(!checkArgsT_VA(op1, op2))
		return false;

	if(op2.type == 'numeric')
		symbols[op1.value] = op2.value;

	if(op2.type == 'variable')
		symbols[op1.value] = symbols[op2.value];

	return symbols[op1.value];
}

//
//  Equality Functions
//

function fetchData (opr){
	if(opr.type == 'numeric')
		return opr.value;
	else
		return symbols[opr.value];
}

function _gt (op1, op2) {
	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);
	symbols['temp'] = operand1 > operand2;
	return operand1 > operand2;
}

function _lt (op1, op2) {
	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['temp'] = operand1 < operand2;
	return operand1 < operand2;
}

function _gte (op1, op2) {
	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['temp'] = operand1 >= operand2;
	return operand1 >= operand2;
}

function _lte (op1, op2) {
	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['temp'] = operand1 <= operand2;
	return operand1 <= operand2;
}

function _eq (op1, op2) {
	if(!checkArgsT_AA(op1, op2))
		return false;

	var operand1 = fetchData(op1),
		operand2 = fetchData(op2);

	symbols['temp'] = (operand1 == operand2);
	return operand1 == operand2;
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

function _prn (op1) {
	if(op1.type == 'numeric')
		_printHandler(op1.value);
	else if(_ist(op1))
		_printHandler(symbols[op1.value]);
	else 
		_printHandler(op1.value);

	return true;
}

function _inp () {
	var temp = window.prompt('Enter Value', 'Value...');
	return processToken(temp);
}

//
//  IO Handlers
//

function _printHandler (str) {
	document.getElementById('here').innerHTML += str + '<br/>';
}

function _resHandler (str) {
	if(str.hasOwnProperty('value')){
		document.getElementById('eachLineRes').innerHTML += str.value + '<br/>';
	} else{
		document.getElementById('eachLineRes').innerHTML += str + '<br/>';
	}
}

function _clearResHandler() {
	document.getElementById('eachLineRes').innerHTML = '';
}

function _printClearHandler() {
	document.getElementById('here').innerHTML = '';
}

document.getElementById('submit').addEventListener('click', function(e) {
	getFromEnv();
});
//
//  And now the actual parser and executer
//

var functionMap = {
	add: _add,
	sub: _sub,
	mul: _mul,
	div: _div,
	mod: _mod,
	setz: _stz,
	set: _set,
	rani: _rni,
	ranp: _rnp,
	ranr: _rnr,
	lt: _lt,
	lte: _lte,
	gt: _gt,
	gte: _gte,
	eq: _eq,
	def: _def,
	del: _del,
	ist: _ist,
	prn: _prn,
	inp: _inp
};

function checkOp (str) {
	if(str.length<2||str.length>4)
		return false;
	if(keywords.indexOf(str)==-1)
		return false;
	return true;
}

function executer (tokenObject) {
	if(tokenObject == false)
		return false;

	var f1 = false, f2 = false, temp1, temp2, res;
	if(tokenObject.hasOwnProperty('op1'))
		f1 = true;
	if(tokenObject.hasOwnProperty('op2'))
		f2 = true;

	if(f1 && tokenObject['op1'].type == 'functor') {
		temp1 = functionMap[tokenObject['op1'].value]();
		tokenObject['op1'].value = temp1.value;
		tokenObject['op1'].type = temp1.type;
	}

	if(f2 && tokenObject['op2'].type == 'functor') {
		temp2 = functionMap[tokenObject['op2'].value]();
		tokenObject['op2'].value = temp2.value;
		tokenObject['op2'].type = temp2.type;
	}

	if(f1 == false && f2 == false){
		res = functionMap[tokenObject['functor']]();
	} else if (f1 == true && f2 == false) {
		res = functionMap[tokenObject['functor']](tokenObject['op1']);
	} else if (f1 == true && f2 == true) {
		res = functionMap[tokenObject['functor']](tokenObject['op1'], tokenObject['op2']);
	}

	_resHandler(res);
	return true;
}

function parse(str) {
	return executer(tokenise(str));
}

function getFromEnv() {
	var flag;
	_printClearHandler();
	_clearResHandler();
	var text = document.getElementById('editor').value.split(/\r|\n/);
	for(var i = 0; i<text.length; ++i) {
		flag = parse(text[i]);
		if(flag == false) {
			_printHandler('Encountered fatal error at line '+ (i+1) + '.');
			break;
		}
	};
}