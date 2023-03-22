const operator = document.getElementById('networkoperators');
const amount = document.getElementById('amount');
const tbody = document.getElementById('tbody');
const rechargeCode = document.getElementById('code');
const codeoutput = document.getElementById('codeoutput');
const blankAmount = document.getElementById('blankAmount');
const errorpin = document.getElementById('errorpin');

let recordarray = [];
let rechargeCodes = {
    mtn : '*555*',
    airtel : '*126*',
    nineMobile : '*222*',
    glo : '*123*',
}; 

function generatePin() {
    let pin = [];
    for (let index = 0; index < 12; index++) {
       pin.push(Math.floor(Math.random() * 10));
    }
    pin = pin.join('');
    // console.log(pin);
    return pin;
};


let rechargeCodeOP;
function generate() {
    const d = new Date();

    let recordobject = {
        networkoperator : 'mtn',
        amount : '200',
        datecreated : '',
        dateused : 'Not yet used',
        pin : '',
        code : '',
        status : 'unused',
    };

    rechargeCodeOP = recordobject.networkoperator = operator.value;
    if (amount.value == '') {
        blankAmount.innerText = '* Enter amount';
        // alert('Enter amount');
        console.log('enter amount');
        return
    }
    blankAmount.innerText = '';
    recordobject.amount = amount.value;
    recordobject.datecreated = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    recordobject.status = 'unused';

    // Check if generated code exist
    

    codeoutput.value = recordobject.code = generatePin();
    if (rechargeCodeOP == 'MTN') {
        recordobject.pin = `${rechargeCodes.mtn}${recordobject.code}#`;
    }
    else if (rechargeCodeOP == 'Airtel') {
        recordobject.pin = `${rechargeCodes.airtel}${recordobject.code}#`;
    }
    else if (rechargeCodeOP == 'Glo') {
        recordobject.pin = `${rechargeCodes.glo}${recordobject.code}#`;
    }
    else if (rechargeCodeOP == '9mobile') {
        recordobject.pin = `${rechargeCodes.nineMobile}${recordobject.code}#`;
    }

    // console.log(recordobject);
    if (recordarray == null) {
        recordarray = [];
        recordarray.push(recordobject);

    }
    else{
        recordarray.push(recordobject);
    }

    localStorage.setItem('recordarray',JSON.stringify(recordarray));

    // console.log(recordarray);

    loop();
    
};

let exist;
function doesExist() {
    let code = rechargeCode.value;
    code = code.trim();

    for (let index = 0; index < recordarray.length; index++) {
        if (code == recordarray[index].pin) {
            exist = true;
            return exist;
        }
        else{
            exist = false;
        }  
    }
    return exist
}
let indexExist;
function getExistIndex() {
    let code = rechargeCode.value;
    code = code.trim();

    for (let index = 0; index < recordarray.length; index++) {
        if (code == recordarray[index].pin) {
            indexExist = index
        }
    }
    return indexExist
}

function recharge() {
    const d = new Date();

    // console.log(exist);
    exist = doesExist();
    // console.log(exist);
    

    if (exist == true) {
        indexExist = getExistIndex();
        
        console.log(recordarray);
        if (recordarray[+indexExist].dateused == 'Not yet used') {
            recordarray[+indexExist].status = 'used';
            recordarray[+indexExist].dateused = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
            errorpin.innerText = '';
            localStorage.setItem('recordarray',JSON.stringify(recordarray));
            loop();        
        }
        else{
            // alert('Pin has been used');
            errorpin.innerText = '*Pin has been used';
            console.log('Pin has been used');
        }
    }
    else{
        if (rechargeCode.value == '' ) {
            // alert('Enter pin');

            console.log('Input is blank');
        }
        else{
            // alert('Code/Pin does not exist');
            errorpin.innerText = '*Code does not exist'
            console.log('Code does not exist');    
        }
    }
}

function loop() {
    tbody.innerHTML = ''
    let array=localStorage.getItem('recordarray');
    recordarray = JSON.parse(array);
    // console.log(recordarray);
    if ( recordarray == null ) {
    
        tbody.innerHTML = `
        <tr>
           <td colspan="9">
               No record here.
           </td>
        </tr>
    
       `;

    }    
    else{
        for (let index = 0; index < recordarray.length; index++) {
            tbody.innerHTML += `
            <tr>
                <td>${index +1}</td>
                <td>${recordarray[index].networkoperator}</td>
                <td>${recordarray[index].amount}</td>
                <td>${recordarray[index].pin}</td>
                <td>${recordarray[index].code}</td>
                <td>${recordarray[index].status}</td>
                <td>${recordarray[index].datecreated}</td>
                <td>${recordarray[index].dateused}</td>
                <td><button class='btn btn-secondary' onclick='deleteItem(${index})'>Del</button></td>
            </tr>
            `
            
        }

    }

};
function deleteItem(index) {
    if (recordarray.length == 1) {
        recordarray.shift();
        tbody.innerHTML = `
         <tr>
            <td colspan="9">
                No record here.
            </td>
         </tr>

        `;
    }
    else{
        recordarray.splice((+index), 1);
        loop();
    }
};
loop();