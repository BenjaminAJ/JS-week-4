const operator = document.getElementById('networkoperators');
const amount = document.getElementById('amount');
const tbody = document.getElementById('tbody');

let recordarray = [];
let code = {
    mtn : '*555*',
    airtel : '*126*',
    nineMobile : '*126*',
    glo : '*126*',
};
function generatePin(params) {
    
};

function generate(params) {
    const d = new Date();

    let recordobject = {
        networkoperator : 'mtn',
        amount : '200',
        datecreated : '',
        dateused : '',
        status : 'unused',
    };

    recordobject.networkoperator = operator.value;
    recordobject.amount = amount.value;
    recordobject.datecreated = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    recordobject.status = 'unused';

    console.log(recordobject);
    recordarray.push(recordobject);
    console.log(recordarray);
    loop();
    
};

function recharge() {
    
}

function loop() {
    tbody.innerHTML = ''
    for (let index = 0; index < recordarray.length; index++) {
        tbody.innerHTML += `
        <tr>
            <td>${index +1}</td>
            <td>${recordarray[index].networkoperator}</td>
            <td>${recordarray[index].code}</td>
            <td>${recordarray[index].code}</td>
            <td>${recordarray[index].status}</td>
            <td>${recordarray[index].datecreated}</td>
            <td>${recordarray[index].dateused}</td>
        </tr>
        `
        
    }
};