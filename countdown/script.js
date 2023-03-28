const sec = document.getElementById('sec');
const mins = document.getElementById('mins');
const reminderNote = document.getElementById('reminderNote');
const reminder = document.getElementById('reminder');
const note = document.getElementById('note');
const seccount = document.getElementById('seccount');
const minscount = document.getElementById('minscount');

const timers = document.getElementById('timers');

let timearray = [];

let intervaltimer;
let minscountvalue; 
let seccountvalue;

let status;
let audio = new Audio('./audio/Aṣa-04-Bed-Of-Stone.mp3');


function startCount() {
    let timeobject = {
        mins: '12',
        sec: '12',
        interval : '',
        status : 'inactive',
        audio : audio,
    };
    
    // console.clear();

    if (reminderNote.value == '') {
        document.getElementById('blankFields').innerText = '*Type Something';
        return
  
    }
    if (+mins.value == 0 && +sec.value == 0) {
        document.getElementById('blankFields').innerText = '*Input Time';
        return
    }
    document.getElementById('blankFields').innerText = '';

    timeobject.mins = mins.value;
    timeobject.sec = sec.value;
    timeobject.reminderNote = reminderNote.value;
    timeobject.playAudio = function () {
        this.audio.play();
      };
    timeobject.pauseAudio = function () {
        this.audio.pause();
      };
      

    timearray.push(timeobject);

    // console.log(timeobject);
    console.log(timearray);

    // startCountDown(index);
    index = timearray.length -1;

    setTimeout(startCountDown(index), 3500 * index / 2);
    timearray[index].status = 'active';


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

    if ( timearray[index].status == 'active') {
        stopCountdown(index);   
        return
    }
    else if (timearray[index].status == 'inactive'){
        timearray[index].interval = setInterval(function () {
            
            // console.log(timearray[index].sec);  
            // console.log(timearray[index].mins);
    
            document.getElementById(`minscount${index}`).value= timearray[index].mins ;
            document.getElementById(`seccount${index}`).value= timearray[index].sec;
            if (+timearray[index].sec == 0 && +timearray[index].mins == 0) {
                // console.log(timearray);
                // console.log(index);
                // console.log(timearray[index].interval);

                reminder.style.visibility = "visible";
                reminder.innerHTML += 
                `
                <div class="card" id="card${index}" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Reminder</h5>
                        <p id="note${index}" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary" onclick="stopNote(${index})">Okay</a>
                    </div>
                </div>
                `;
                document.getElementById(`note${index}`).innerText = timearray[index].reminderNote; 


                timearray[index].playAudio();

                //Stop Timer
                clearInterval(timearray[index].interval);
                // stopCountdown(index);
                // console.log('hey');
                // alert("Countdown Done!!!!!😜😜");
            }
            else if (+timearray[index].mins != 0 && (+timearray[index].sec == 0 || +timearray[index].sec == 1)) {
                +timearray[index].mins--;
                timearray[index].sec = 59;
            }
            else if (+timearray[index].mins != 0 || +timearray[index].sec == 60 || +timearray[index].sec != 0) {
                timearray[index].sec--;
            }
    
        }, 1000);

        timearray[index].status = 'active';
        

    }
    loop();


    // console.log(timearray);
}
function stopNote(index) {
    // audio.pause();
    timearray[index].pauseAudio();
    document.getElementById(`card${index}`).style.visibility = 'hidden'; 
    // note.innerText = ''; 
    
}


function stopCountdown(index) {
    // console.log(timearray);
    // console.log(index);
    // console.log(timearray[index].interval);
    clearInterval(timearray[index].interval);
    timearray[index].status = 'inactive';

    //Stop ringtone
    audio.pause();
    loop()

}

function deleteItem(index) {
    // console.log(index);
    stopCountdown(index);
    if (timearray.length == 1) {
        timearray.shift();
    }
    else{
        if (+index == 0) {
            timearray.shift();
        }
        else{
            timearray.splice(+index, 1);
        }
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
            <button class="btn btn-primary"  id="play${index}" onclick="startCountDown(${index})"></button>
        </div>
        <div class="col-auto">
            <button class="btn btn-secondary" onclick="deleteItem(${index})">Cancel</button>
        </div>
        </div>
        `;

        if (timearray[index].status == 'active') {
            document.getElementById(`play${index}`).innerText = 'Stop'
        }
        else{
            document.getElementById(`play${index}`).innerText = 'Start'
        }
        // <div class="col-auto">
        //     <button class="btn btn-primary" onclick="stopCountdown(${index})">Stop</button>
        // </div>

        // startCountDown(index);
        // setTimeout(startCountDown(index), 3500);


    }
}

