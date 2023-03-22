const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const sec = document.getElementById('sec');

const hourscount = document.getElementById('hourscount');
const minscount = document.getElementById('minscount');
const seccount = document.getElementById('seccount');

const blankFields = document.getElementById('blankFields');

let intervaltimer;

function startCountdown() {
    hourscount.value = hours.value;
    minscount.value = mins.value;
    seccount.value = sec.value;

    if (hourscount.value == 0 && minscount.value == 0 && seccount.value == 0) {
        blankFields.innerText = '*Input Time';
        return
    }

    intervaltimer = setInterval(function() {
    blankFields.innerText = '';
    if (+hourscount.value == 0 && +minscount.value == 0 || +minscount.value != 0 && +seccount.value == 0 || +seccount.value != 0 ) {
        if (+minscount.value == 0 && +seccount.value != 0) {
            seccount.value--;
            if (+seccount.value == 0) {
                alert('Countdown done!!😜')
                clearInterval(intervaltimer);        
            }
            
        }
        else if (+minscount.value != 0 && +seccount.value == 0) {
            minscount.value--;
            seccount.value = 60;
        }
        else if (+minscount.value != 0 && +seccount.value != 0) {
            seccount.value--;
        }
    }
    else if (+hourscount.value != 0) {
        if (+hourscount.value != 0 && +minscount.value == 0 && +seccount.value == 0) {
            hourscount.value--;
            minscount.value = 60;
        }
    }
    else if (+hourscount.value == 0 && +minscount.value == 0 && +seccount.value == 0 ) {
        alert('Countdown done!!😜')
        clearInterval(intervaltimer);
    }
    }, 1000);
}
function stopCountdown() {
    clearInterval(intervaltimer);
}