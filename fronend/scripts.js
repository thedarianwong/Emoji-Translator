document
	.getElementById('exampleButton')
	.addEventListener('click', exampleFunction);

function exampleFunction() {
	if (document.getElementById('exampleText').innerHTML === 'YOU CLICKED ME!') {
		document.getElementById('exampleText').innerHTML = 'LOLOLOL';
	} else {
		document.getElementById('exampleText').innerHTML = 'YOU CLICKED ME!';
	}
}
