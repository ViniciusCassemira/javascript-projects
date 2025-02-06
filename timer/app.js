let timer;

startButton = document.getElementById('startButton');
stopButton = document.getElementById('stopButton');
saveButton = document.getElementById('saveButton');
resetButton = document.getElementById('resetButton');
clearButton = document.getElementById('clearButton');

const time = {
    'second': 0,
    'minute': 0,
    'hour': 0
}

const totalTime = JSON.parse(localStorage.getItem('totalTime')) || {
    'second': 0,
    'minute': 0,
    'hour': 0
};

let content = document.getElementById('content');
let history = document.getElementById('history');

window.onload = function() {
    load();
};

function verifyButton(){
    
    if(timer == null){
        startButton.style.display = "inline";
        stopButton.style.display = "none";
    }else{
        startButton.innerHTML = "resume";
        startButton.style.display = "none";

        stopButton.style.display = "inline";
        resetButton.style.display = "inline";
        saveButton.style.display = "inline";
    }
    
    if(totalTime.second > 0 || totalTime.minute > 0 || totalTime.hour > 0){
        clearButton.style.display = "inline";
    }else{
        clearButton.style.display = "none";
    }

}

function load() {

    verifyButton();
    totalTimeSaved = JSON.parse(localStorage.getItem('totalTime'));

    let second = String(totalTimeSaved.second).padStart(2, '0');
    let minute = String(totalTimeSaved.minute).padStart(2, '0');
    let hour = String(totalTimeSaved.hour).padStart(2, '0');

    history.innerHTML = `${hour}:${minute}:${second}`;
}


function start(){
    if(timer != null){
        return;
    }
    timer = setInterval(() => {
        time.second ++;
        if (time.second === 60){
            time.second = 0;
            time.minute ++;
        }
        if (time.minute === 60){
            time.minute = 0;
            time.hour ++;
        }
        
        let second = String(time.second).padStart(2,'0');
        let minute = String(time.minute).padStart(2,'0');
        let hour = String(time.hour).padStart(2,'0');

        content.innerHTML = `${hour}:${minute}:${second}`;
    }, 1000);
    verifyButton()
}

function stop(){
    clearInterval(timer);
    timer = null;
    verifyButton()
}

function reset(){
    document.getElementById('content').textContent = '00:00:00';
    time.second = 0;
    time.minute = 0;
    time.hour = 0;
    
    resetButton.style.display = "none";
    saveButton.style.display = "none";
    startButton.innerHTML = "start";

    stop()
}

function save(){
    totalTime.second += time.second;
    
    if(totalTime.second >= 60){
        totalTime.minute += totalTime.second / 60;
        totalTime.second %= 60;
    }

    totalTime.minute += time.minute;

    if(totalTime.minute >= 60){
        totalTime.hour += totalTime.minute / 60;
        totalTime.minute %= 60;
    }

    totalTime.hour += time.hour;

    let second = String(totalTime.second).padStart(2,'0');
    let minute = String(totalTime.minute).padStart(2,'0');
    let hour = String(totalTime.hour).padStart(2,'0');

    localStorage.setItem('totalTime',JSON.stringify(totalTime));

    history.innerHTML = `${hour}:${minute}:${second}`;

    reset()
}

function clearTime(){
    totalTime.second = 0;
    totalTime.minute = 0;
    totalTime.hour = 0;

    let second = String(totalTime.second).padStart(2,'0');
    let minute = String(totalTime.minute).padStart(2,'0');
    let hour = String(totalTime.hour).padStart(2,'0');

    localStorage.setItem('totalTime',JSON.stringify(totalTime));

    history.innerHTML = `${hour}:${minute}:${second}`;

    verifyButton();
}