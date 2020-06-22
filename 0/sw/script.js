let sec = 0;
let min = 0;
let ms = 0;

let running = false;
let timer;
console.log('connected');

window.onload = function(){
	if(localStorage.blackmode == "true"){
		document.body.classList.add("inverted");
	}
}

function update() {
	ms++;

	if (ms == 100) {
		sec++;
		ms = 0;
	}
	if (sec == 60) {
		min++;
		sec = 0;
	}
	if (min == 60) {
		min == 0;
	}
    //00 : 00 . 00
    
	document.getElementById('swmin').innerHTML = addZero(min);
	document.getElementById('swsec').innerHTML = addZero(sec);
	document.getElementById('swms').innerHTML = addZero(ms);
}
document.addEventListener('keyup',event => {
    if(event.code == "Space"){
        toggle();
    }
    /*if(event.code == "Escape"){
        cleared();
    }
    if(event.code == "Backspace"){
        cleared();
    }*/
});
function addZero(number) {
	if (number < 10) {
		return '0' + number;
	} else {
		return number;
	}
}
function toggle() {
	if (!running) {
		running = true;
		timer = setInterval(update, 10);
		document.getElementById('tg').innerHTML = "Stop ";
	} else {
		running = false;
		document.getElementById('tg').innerHTML = "Start";
		clearInterval(timer);
	}
}
//document.getElementById("clear").addEventListener("click", cleared)
function cleared() {
	sec = min = ms = 0;
	document.getElementById('swmin').innerHTML = addZero(min);
	document.getElementById('swsec').innerHTML = addZero(sec);
	document.getElementById('swms').innerHTML = addZero(ms);
}
