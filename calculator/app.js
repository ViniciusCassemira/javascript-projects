const input = document.getElementById('visor');
const operates = ['+', '-', '.', '*', '/', '(', ')'];


function addValue(_value){
    if(operates.includes(input.value.slice(-1)) && operates.includes(_value)){
        return;
    }

    input.value += _value;
}

function reset(){
    input.value = "";
}

function deleteInput(){
    input.value = input.value.slice(0, -1);
    
}

function result(){
    if(input.value == ""){
        input.value = ""
        return;
    }
    
    try{
        input.value = eval(input.value);
    } catch (error){
        input.value = "";
    }
}