const URL = 'https://rickandmortyapi.com/api/character?name=';
let character = document.getElementById('input'); 
const response = document.getElementById('response');
let button = document.getElementById('search-button');
let resultContent = document.getElementById('result-content');
const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');

let obj;

character.addEventListener('input', inputButton);

function inputButton(){
    if(character.value.length > 0){
        button.style.pointerEvents='auto';
        button.style.backgroundColor='green';
    }else{
        button.style.pointerEvents='none';
        button.style.backgroundColor='rgb(223, 223, 223)';
    }
}

function verify(){
    if (obj.info.prev !== null){
        buttonPrev.style.visibility='visible';
    }else{
        buttonPrev.style.visibility='hidden';
    };

    if (obj.info.next !== null){
        buttonNext.style.visibility='visible';
    }else{
        buttonNext.style.visibility='hidden';
    };
}

function reset(){
    character.value ='';
    response.style.visibility = 'hidden';
    buttonPrev.style.visibility = 'hidden';
    buttonNext.style.visibility = 'hidden';
    clean();
}

function clean(){
    resultContent.innerHTML = '';
    character.focus();
    inputButton();
}

async function first(){
    obj = await chamaJson(URL + character.value);
    if(obj !== null){
        response.innerHTML = obj.info.count+ ' results found';
        response.style.visibility = 'visible';
    }else{
        response.innerHTML = 'no results found';
        response.style.visibility = 'visible';
    }

    clean();

    verify();

    obj.results.forEach(item => {
        if(item){
            writeResults(item.id, item.name, item.status);
        }
    });

    console.log(obj);

    response.style.visibility='visible';
}

async function firstInt(link){

    clean();
    
    obj = await chamaJson(link);
    
    verify();
    
    obj.results.forEach(item => {
        if(item){
            writeResults(item.id, item.name, item.status);
        }
    });
}

async function chamaJson(_link){
    const _response = await fetch(_link);
    if(_response.status === 200){
        return await _response.json();
    }

    return null;
}

function writeResults(_id, _name, _status){

    let tableResult = document.querySelector("#resultTable");

    if(!tableResult){   
        tableResult = document.createElement("table");
        tableResult.id = "resultTable";

        const headerRow = document.createElement("tr");
        const tableHeader = ["Id", "Name", "Status"];
        tableHeader.forEach(item => {
            const th = document.createElement("th");
            th.innerText = item;
            headerRow.appendChild(th);
        });
        tableResult.appendChild(headerRow);

        resultContent.appendChild(tableResult);
    }

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.innerText = _id;
    tr.appendChild(idTd);

    const idName = document.createElement("td");
    idName.innerText = _name;
    tr.appendChild(idName);

    const idStatus = document.createElement("td");
    idStatus.innerText = _status;
    tr.appendChild(idStatus);

    tableResult.appendChild(tr);
}

async function next(){
    const link = obj.info.next;
    await firstInt(link);
}

async function prev(){
    const link = obj.info.prev;
    await firstInt(link);
}
