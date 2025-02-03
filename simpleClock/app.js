const input = document.getElementById('input');

const timeZones = [
    {name: "UTC+0", offset: 0}
];

const app = document.getElementById('clock');

function cleanInput(){
    input.value = '';
}

function createClockElement(timezone){
    const clockContainer = document.createElement('div');
    clockContainer.classList.add("clock");

    const TimeContainer = document.createElement('div');
    TimeContainer.classList.add("time");
    
    
    const clockTitle = document.createElement('h2');
    clockTitle.id = `title-${timezone.name}`;
    clockTitle.classList.add('clock-title');
    clockContainer.appendChild(clockTitle);
    
    const clockHour = document.createElement('div');
    clockHour.classList.add('clock-hour');
    clockHour.id = `hour-${timezone.name}`;
    TimeContainer.appendChild(clockHour);
    
    let point = document.createElement('p');
    point.classList.add('points');
    point.innerText = ':';
    TimeContainer.appendChild(point);
    
    const clockMinute = document.createElement('div');
    clockMinute.id = `minute-${timezone.name}`;
    clockMinute.classList.add('clock-minute');
    TimeContainer.appendChild(clockMinute);
    
    let point2 = document.createElement('p');
    point2.classList.add('points');
    point2.innerText = ':';
    TimeContainer.appendChild(point2);

    const clockSecond = document.createElement('div');
    clockSecond.id = `second-${timezone.name}`;
    clockSecond.classList.add('clock-second');
    TimeContainer.appendChild(clockSecond);
    
    clockContainer.appendChild(TimeContainer);

    
    
    return clockContainer;
}

function startClock(){

    app.innerHTML = '';

    timeZones.forEach(timeZone => {
        const clockContainer = createClockElement(timeZone);
        app.appendChild(clockContainer);
    });
}

function updateClock(){
    
    const temp = new Date();

    timeZones.forEach((timeZone) => {

        const time = new Date(temp.getTime() + timeZone.offset * 3600 * 1000);

        const hour = String(time.getUTCHours()).padStart(2, '0');
        const minute = String(time.getUTCMinutes()).padStart(2, '0');
        const second = String(time.getUTCSeconds()).padStart(2, '0');

        document.getElementById(`title-${timeZone.name}`).innerHTML = timeZone.name;
        document.getElementById(`hour-${timeZone.name}`).innerText = hour;
        document.getElementById(`minute-${timeZone.name}`).innerText = minute;
        document.getElementById(`second-${timeZone.name}`).innerText = second;
    })
}

function testUTC(x){
    
    let result = false;

    timeZones.forEach(time => {
        if(x == time.offset){
            result = true;
        }
    });
    
    return result;
}

function addUTF(){
    
    if(input.value == "" || testUTC(input.value) || input.value < -12 || input.value > 14){
        document.getElementById('alert').style.visibility='visible';
        
        setTimeout(function() {
            document.getElementById('alert').style.visibility='hidden';
        }, 2000);
        
        cleanInput();

        return;
    }

    let obj;
    if(input.value < 0){
        obj = {name: `UTC${input.value}`, offset: input.value};
    }else{
        obj = {name: `UTC+${input.value}`, offset: input.value};
    }
    timeZones.push(obj);
    startClock();
    console.log(timeZones);

    cleanInput();
}


startClock();
setInterval(updateClock, 1000);
updateClock();