var symbols = {};
var acc = 0;
symbols['cflag'] = 'NaN';
symbols['R1'] = 'NaN'; symbols['R2'] = 'NaN'; symbols['R3'] = 'NaN'; symbols['R4'] = 'NaN'; symbols['R5'] = 'NaN'; symbols['R6'] = 'NaN'; symbols['R7'] = 'NaN';
var _addrStack = [];
var _genStack = [];
var keywords = 'add sub mul div mod setz set rani ranp ranr lt gt lte gte eq def del ist prn inp return and or not xor';
var _bin = 'add sub mul div mod set lt gt lte gte eq def and or xor';
var _un = 'setz def del ist prn bun bsa add sub mul div mod push pop prntop and or xor';
var _anon = 'rani ranp ranr inp return add sub mul div mod cla inca spa sna sza pop not';
var _line = 0;

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

function checkArgsT_A (op1) {
	if(op1.type != 'numeric' && op1.type != 'variable')
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
// Memory functions
//

function fetchData (opr){
	if(opr.type == 'numeric')
		return opr.value;
	else
		return symbols[opr.value];
}
//
// Handles
//
document.getElementById('submit').addEventListener('click', function(e) {
	getFromEnv();
});
document.getElementById('elrbtn').addEventListener('click', function(e) {
	document.getElementById('eachLineRes').classList.toggle('hidden');
});

//
//  And now the actual parser and executer
//

var functionMap = {
	lda: _set,
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
	inp: _inp,
	bun: _bun,
	bsa: _bsa,
	return: _return,
	cla: _cla,
	inca: _inca,
	spa: _spa,
	sna: _sna,
	sza: _sza,
	push: _push,
	pop: _pop,
	prntop: _prntop,
	and: _and,
	or: _or,
	not: _not,
	xor: _xor,
	mov: _set
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
	_line = 0;
	while(_line<text.length) {
		flag = parse(text[_line]);
		if(flag == false) {
			_printHandler('Encountered fatal error at line '+ (_line+1) + '.');
			break;
		}
		++_line;
	};
}