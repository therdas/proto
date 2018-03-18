//
// Accumulator Logic
//

function _cla() {
	acc = 0;
	return 0;
}

function _inca() {
	++acc;
	return acc;
}

function _spa() {
	if(acc>0)
		++_line;
	return '-> '+_line;
}

function _sna () {
	if(acc<0)
		++_line;
	return '-> '+_line;
}

function _sza () {
	if(acc==0)
		++_line;
	return '-> '+_line;
}