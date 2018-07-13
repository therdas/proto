window.onload = function(e) {
	if(checkURI()) {
		var code = decodeURI(retreiveCodeFromURI());
		document.getElementById('editor').value = code;
	}
}

function copycode(e){
	var copyTextarea = document.getElementById('shareboxer');
	copyTextarea.value = buildURI();
  	copyTextarea.focus();
  	copyTextarea.select();

  	try {
  		var successful = document.execCommand('copy');
    	var msg = successful ? 'successful' : 'unsuccessful';
    	console.log('Copying text command was ' + msg);
  	} catch (err) {
    	console.log('Oops, unable to copy');
  	}

	notifyToast();
	setTimeout(notifyToast, 2000);
}

document.getElementById('sharebtn').addEventListener('click', copycode);
document.getElementById('sharetext').addEventListener('click', copycode);

function buildURI () {
	var mainPath = 'http://therdas.github.io/proto/';
	var key = '?code=';
	var code = document.getElementById('editor').value;
	return mainPath + key + encodeURI(code);
}

function checkURI () {
	var path = window.location.href, key = '?code=';
	var codestart = path.indexOf('?code=');
	if(codestart>0 && path.length>(codestart+key.length)) return true;
	else return false;
}

function retreiveCodeFromURI() {
	var key = '?code=';
	return window.location.href.slice(window.location.href.indexOf('?code=')+key.length);
}

function notifyToast(){
	document.getElementById('toast').classList.toggle('hiddenToast');
}