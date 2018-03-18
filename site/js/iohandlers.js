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