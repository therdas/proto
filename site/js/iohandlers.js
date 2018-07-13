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

function _logErr(err){
	if(_errFlag == false){
		_errc = (_line+1) + ': '+err;
		_prevErr = _line;
	} else {
		if(_prevErr != _line)
			_errc += '<br/>' + (_line+1) + ': '+err;
		else
			_errc += '<br/>&nbsp;&nbsp;&nbsp;&#x21b3; ' + err;
		_prevErr = _line;
	}
	_errFlag = true;
	return true;
}