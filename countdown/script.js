const sec = document.getElementById('sec');
const mins = document.getElementById('mins');
const seccount = document.getElementById('seccount');
const minscount = document.getElementById('minscount');

let intervaltimer;
function startCountdown() {
    // let countsecvalue = sec.value;
    // let countminvalue = mins.value;

    minscount.value = mins.value;
    seccount.value = sec.value;

    if (mins.value == 0 && sec.value == 0) {
        document.getElementById('blankFields').innerText = '*Input Time';
        return
    }

    document.getElementById('blankFields').innerText = '';

    intervaltimer = setInterval(function () {
        

        if (+seccount.value == 0 && +minscount.value == 0) {
            clearInterval(intervaltimer);
            alert("Countdown Done!!!!!😜😜");
        }
        else if (+minscount.value != 0 && (+seccount.value == 0 || +seccount.value == 1)) {
            +minscount.value--;
            seccount.value = 60;
        }
        else if (+minscount.value != 0 || +seccount.value == 60 || +seccount.value != 0){
            seccount.value--;
        }
    }, 1000);


}

function stopCountdown() {
    clearInterval(intervaltimer);
}
