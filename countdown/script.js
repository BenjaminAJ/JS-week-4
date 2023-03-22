const sec = document.getElementById('sec');
const mins = document.getElementById('mins');
const seccount = document.getElementById('seccount');
const minscount = document.getElementById('minscount');

const timers = document.getElementById('timers');

let timearray = [];

let intervaltimer;
let minscountvalue; 
let seccountvalue;


function startCount() {
    let timeobject = {
        mins: '12',
        sec: '12',
        interval : '',
    };
    
    // console.clear();


    if (+mins.value == 0 && +sec.value == 0) {
        document.getElementById('blankFields').innerText = '*Input Time';
        return
    }
    document.getElementById('blankFields').innerText = '';

    timeobject.mins = mins.value;
    timeobject.sec = sec.value;

    timearray.push(timeobject);

    // console.log(timeobject);
    // console.log(timearray);

    // startCountDown(index);
    index = timearray.length -1;

    setTimeout(startCountDown(index), 3500 * index / 2);


    loop();

}

let countsecvalue;
let countminvalue;

function startCountDown(index) {
    // countsecvalue = timearray[index].sec;
    // countminvalue = timearray[index].mins;

    // minscount.value = countminvalue;
    // seccount.value = countsecvalue;

    // document.getElementById('blankFields').innerText = '';

    

    console.log(timearray);
    timearray[index].interval = setInterval(function () {
            
            // console.log(timearray[index].sec);  
            // console.log(timearray[index].mins);
    
            document.getElementById(`minscount${index}`).value= timearray[index].mins ;
            document.getElementById(`seccount${index}`).value= timearray[index].sec;
            if (+timearray[index].sec == 0 && +timearray[index].mins == 0) {
                // console.log(timearray);
                // console.log(index);
                // console.log(timearray[index].interval);
                clearInterval(timearray[index].interval);
                // stopCountdown(index);
                // console.log('hey');
                alert("Countdown Done!!!!!😜😜");
            }
            else if (+timearray[index].mins != 0 && (+timearray[index].sec == 0 || +timearray[index].sec == 1)) {
                +timearray[index].mins--;
                timearray[index].sec = 59;
            }
            else if (+timearray[index].mins != 0 || +timearray[index].sec == 60 || +timearray[index].sec != 0) {
                timearray[index].sec--;
            }
    
        }, 1000);
        

    console.log(timearray);
}

function stopCountdown(index) {
    // console.log(timearray);
    // console.log(index);
    // console.log(timearray[index].interval);
    clearInterval(timearray[index].interval);
}

function deleteItem(index) {
    if (timearray.length == 1) {
        timearray.shift();
    }
    else{
        timearray.splice(+index, 1);
    }
    loop();

}

function loop() {
    timers.innerHTML = '';

    for (let index = 0; index < timearray.length; index++) {
        timers.innerHTML += `
        <div class="row align-items-center justify-content-center mb-3">
        <div class="col-auto">${index +1}.</div>
        <div class="col-auto">
            <input type="datetime" disabled name="" id="minscount${index}" value="${timearray[index].mins}" style="width: 70px;" class="form-control">
        </div>
        <div class="col-auto">
            <input type="datetime" disabled name="" id="seccount${index}" value="${timearray[index].sec}" style="width: 70px;" class="form-control">
        </div>
        <div class="col-auto">
            <button class="btn btn-primary" onclick="startCountDown(${index})">Start</button>
        </div>
        <div class="col-auto">
            <button class="btn btn-primary" onclick="stopCountdown(${index})">Stop</button>
        </div>
        <div class="col-auto">
            <button class="btn btn-secondary" onclick="deleteItem(${index})">Del</button>
        </div>
        </div>
        `;
        // startCountDown(index);
        // setTimeout(startCountDown(index), 3500);


    }
}

