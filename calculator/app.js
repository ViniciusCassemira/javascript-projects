const input = document.getElementById('visor');

function addValue(x){
    input.value += x 
}

function reset(){
    input.value = "";
}

function deleteInput(){
    input.value = input.value.slice(0, -1);
    
}

function result(){
    input.value = eval(input.value);
}