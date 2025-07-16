const clocksContainer = document.getElementById('clocksContainer');
const utcInput = document.getElementById('utcInput');
const warning = document.getElementById('warning');

const utcMap = {
  '-12':  { country: 'EUA (Baker Island)',            flag: '🇺🇸' },
  '-11':  { country: 'Niue',                          flag: '🇳🇺' },
  '-10':  { country: 'Polinésia Francesa (Taiti)',    flag: '🇵🇫' },
  '-9.5': { country: 'Polinésia Francesa (Marquesas)',flag: '🇵🇫' },
  '-9':   { country: 'EUA (Alasca)',                  flag: '🇺🇸' },
  '-8':   { country: 'EUA (Costa Oeste)',             flag: '🇺🇸' },
  '-7':   { country: 'Canadá (Alberta)',              flag: '🇨🇦' },
  '-6':   { country: 'México',                        flag: '🇲🇽' },
  '-5':   { country: 'Colômbia',                      flag: '🇨🇴' },
  '-4':   { country: 'Chile',                         flag: '🇨🇱' },
  '-3.5': { country: 'Canadá (Terranova)',            flag: '🇨🇦' },
  '-3':   { country: 'Brasil',                        flag: '🇧🇷' },
  '-2':   { country: 'Ilhas Geórgia do Sul',          flag: '🇬🇸' },
  '-1':   { country: 'Cabo Verde',                    flag: '🇨🇻' },
  '0':    { country: 'Reino Unido',                   flag: '🇬🇧' },
  '1':    { country: 'Espanha',                       flag: '🇪🇸' },
  '2':    { country: 'Egito',                         flag: '🇪🇬' },
  '3':    { country: 'Rússia (Moscou)',               flag: '🇷🇺' },
  '3.5':  { country: 'Irã',                           flag: '🇮🇷' },
  '4':    { country: 'Emirados Árabes Unidos',        flag: '🇦🇪' },
  '4.5':  { country: 'Afeganistão',                   flag: '🇦🇫' },
  '5':    { country: 'Paquistão',                     flag: '🇵🇰' },
  '5.5':  { country: 'Índia',                         flag: '🇮🇳' },
  '5.75': { country: 'Nepal',                         flag: '🇳🇵' },
  '6':    { country: 'Bangladesh',                    flag: '🇧🇩' },
  '6.5':  { country: 'Mianmar',                       flag: '🇲🇲' },
  '7':    { country: 'Tailândia',                     flag: '🇹🇭' },
  '8':    { country: 'China',                         flag: '🇨🇳' },
  '8.75': { country: 'Austrália (Eucla)',             flag: '🇦🇺' },
  '9':    { country: 'Japão',                         flag: '🇯🇵' },
  '9.5':  { country: 'Austrália (Darwin)',            flag: '🇦🇺' },
  '10':   { country: 'Papua Nova Guiné',              flag: '🇵🇬' },
  '10.5': { country: 'Austrália (Lord Howe)',         flag: '🇦🇺' },
  '11':   { country: 'Ilhas Salomão',                 flag: '🇸🇧' },
  '11.5': { country: 'Ilha Norfolk',                  flag: '🇳🇫' },
  '12':   { country: 'Nova Zelândia',                 flag: '🇳🇿' },
  '12.75':{ country: 'Ilhas Chatham',                 flag: '🇳🇿' },
  '13':   { country: 'Tonga',                         flag: '🇹🇴' },
  '14':   { country: 'Kiribati (Ilhas Line)',         flag: '🇰🇮' }
};

let timezones = JSON.parse(localStorage.getItem('timezones')) || [];

function addClock() {
  const offset = parseFloat(utcInput.value);

  if (isNaN(offset) || offset < -12 || offset > 14 || timezones.includes(offset)) {
    showWarning();
    return;
  }

  timezones.push(offset);
  localStorage.setItem('timezones', JSON.stringify(timezones));
  utcInput.value = '';
  renderClocks();
}

function removeClock(offset) {
  timezones = timezones.filter(tz => tz !== offset);
  localStorage.setItem('timezones', JSON.stringify(timezones));
  renderClocks();
}

function showWarning(){
  utcInput.value = "";
  warning.classList.remove('animated'); // reseta
  void warning.offsetWidth;             // força reflow
  warning.classList.add('animated');
}

function renderClocks() {
  clocksContainer.innerHTML = '';

  timezones.forEach(offset => {
    const now = new Date();
    const utcTime = new Date(now.getTime() + offset * 3600 * 1000);
    const timeStr = utcTime.toUTCString().slice(17, 25);

    const flag = utcMap[offset]?.flag || '🌐';
    const country = utcMap[offset]?.country || `UTC ${offset >= 0 ? '+' : ''}${offset}`;

    const clockEl = document.createElement('div');
    clockEl.className = 'clock';

    clockEl.innerHTML = `
      <div>
        <div class="flag">${flag}</div>
        <div><strong>${country}</strong></div>
      </div>
      <div><strong>${timeStr}</strong></div>
      <button class="remove-btn" onclick="removeClock(${offset})">✖️</button>
    `;
    clocksContainer.appendChild(clockEl);
  });
}

setInterval(renderClocks, 1000);

renderClocks();