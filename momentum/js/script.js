const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingBlock = document.querySelector('.greeting-container');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weather = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const quoteBlock = document.querySelector('.quoteBlock');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const player = document.querySelector('.player')
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

const track = document.getElementById('track')
let randomNum;
let isPlay = false;
let playNum = 0;
let number;
let urlWeather
import playList from './playList.js';

const state ={
  'language':'en',
  'photoSource': 'github',
  'blocks': ['weather', 'time', 'date', 'quote', 'player',  'greeting']
}

//translate application

const weatherInput={
  'en': "Minsk",
  'ru': "Минск",
  'be': "Мінск",
}

const windSpeed={
  'en': "m/s",
  'ru': "м/с",
  'be': "м/с",
}

const greetingTranslation={
  'en': 
  {
    "Morning": 'Good Morning',
    "Afternoon": 'Good Afternoon',
    "Evening": 'Good Evening',
    "Night": 'Good Night',
    "placeholder": "[Enter name]",
  },
  'ru': 
  {
    "Morning": 'Доброе утро',
    "Afternoon": 'Добрый день',
    "Evening": 'Добрый вечер',
    "Night": 'Доброй ночи',
    "placeholder": "[Введите свое имя]"
  },
  'be': 
  {
    "Morning": 'Добрай раніцы',
    "Afternoon": 'Добры дзень',
    "Evening": 'Добры вечар',
    "Night": 'Добрай ночы',
    "placeholder": "[Увядзіце сваё імя]"
  },
}

const settingsTranslation ={
  'en': {
    "language": "Language:",
    "photoSource": "Photo-source:",
    "weather": "Weather:",
    "time": "Time:",
    "date": "Date:",
    "quote": "Quote:",
    "player": "Player:",
    "greeting": "Greeting:"
  },
  'ru': {
    "language": "Язык:",
    "photoSource": "Загрузка фона:",
    "weather": "Погода:",
    "time": "Время:",
    "date": "Дата:",
    "quote": "Цитата:",
    "player": "Плеер:",
    "greeting": "Приветствие:"
  },
  'be': {
    "language": "Мова:",
    "photoSource": "Загрузка фона:",
    "weather": "Надвор'е:",
    "time": "Час:",
    "date": "Дата:",
    "quote": "Цытата:",
    "player": "Плэер:",
    "greeting": "Прывітанне:"
  }
}

const dateTranslation ={
  'en': {
    "locales": "en-EN"
  },
  'ru': {
    "locales": "ru-RU"
  },
  'be': {
    "locales": "be-BY"
  }
}


const select = document.getElementById('language');
console.log('first enter')

select.addEventListener('change', function(){  
  console.log(city.value)
  state.language = this.value;
  getWeather()

  if(city.value=='Minsk'||city.value=='Минск'||city.value=='Мінск'){
    console.log('Вошел в иф если город минск')
    city.value=weatherInput[ state.language]
    getWeather()
}


  showGreeting()
  getPrevQuotes()
  showDate()

  name.placeholder=greetingTranslation[state.language].placeholder
  console.log(name)
 
  document.querySelector('.language').textContent=settingsTranslation[state.language].language
  document.querySelector('.photoSource').textContent=settingsTranslation[state.language].photoSource
  document.querySelector('.weather-text').textContent=settingsTranslation[state.language].weather
  document.querySelector('.time-text').textContent=settingsTranslation[state.language].time
  document.querySelector('.date-text').textContent=settingsTranslation[state.language].date
  document.querySelector('.player-text').textContent=settingsTranslation[state.language].player
  document.querySelector('.greeting-text').textContent=settingsTranslation[state.language].greeting
  document.querySelector('.quote-text').textContent=settingsTranslation[state.language].quote
});

//time and date
function showTime() {
  const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
  }
  
  function showDate (){
    let currentDate;
    const date = new Date();
    const options = {month: 'long', weekday: 'long', day: 'numeric'};
    if(state.language=='be'){
      let formatter = new Intl.DateTimeFormat('be-BY', options).format(date)
      currentDate = formatter
      console.log(formatter)
    }
    else{
      currentDate = date.toLocaleDateString(dateTranslation[state.language].locales, options);

    }
    day.textContent = currentDate;
  }

  //time of day
  function getTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();
    const dayTimeArr=["Morning", "Afternoon", "Evening", "Night"]
    let dayTimeVar = hours/6;

    if(dayTimeVar<1){
        return dayTimeArr[3]
    }
    else if (dayTimeVar<2){
        return dayTimeArr[0]
    }
    else if (dayTimeVar<3){
        return dayTimeArr[1]
    }
    else {
      return dayTimeArr[2]
  }}

  showTime(showDate(), getTimeOfDay(), showGreeting())

  //greeting
  function showGreeting(){
    const timeOfDay =greetingTranslation[state.language][getTimeOfDay()];
    const greetingText = `${timeOfDay},`;
    greeting.textContent = greetingText;
  }
//local storage

  function setLocalStorage() {
    weatherCheckbox
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('language', select.value);
    localStorage.setItem('urlWeather', urlWeather);
    localStorage.setItem('selectSource', selectSource.value);
    localStorage.setItem('tagValue', tagValue.value);

  }
  window.addEventListener('beforeunload',()=>{
    setLocalStorage()

  })

  function getLocalStorage() {
    console.log('second enter')
    
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
      
    }
    if(localStorage.getItem('selectSource')) {
      selectSource.value = localStorage.getItem('selectSource');
      
    }
   
   

    if(localStorage.getItem('tagValue')) {
      tagValue.value = localStorage.getItem('tagValue');
      
    }
    
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      console.log(city.value)
      
    }

  if(localStorage.getItem('urlWeather')) {
    
    urlWeather = localStorage.getItem('urlWeather');
    
     
    }
    if(localStorage.getItem('language')) {
      select.value = localStorage.getItem('language');
      state.language = select.value;
        getWeather()
        if(city.value==''){
          document.querySelector('.weather-error').textContent = `Error! city not found for '${city.value}'!`
          temperature.textContent = ''
          weatherDescription.textContent = ''
          wind.textContent=''
          humidity.textContent=''

        }
        if( state.language=='be'&&(city.value=='Minsk'||city.value=='Минск'||city.value=='Мінск')){
          city.value=weatherInput.ru
          getWeather()
          city.value=weatherInput.be
        }
      }  
   
    showGreeting()
    getPrevQuotes()
    showDate()
    name.placeholder=greetingTranslation[state.language].placeholder
    document.querySelector('.language').textContent=settingsTranslation[ state.language].language
    document.querySelector('.photoSource').textContent=settingsTranslation[state.language].photoSource
   document.querySelector('.weather-text').textContent=settingsTranslation[state.language].weather
   document.querySelector('.time-text').textContent=settingsTranslation[state.language].time
   document.querySelector('.date-text').textContent=settingsTranslation[state.language].date
   document.querySelector('.player-text').textContent=settingsTranslation[state.language].player
   document.querySelector('.greeting-text').textContent=settingsTranslation[state.language].greeting
   document.querySelector('.quote-text').textContent=settingsTranslation[state.language].quote
    }

    
  
  window.addEventListener('load', ()=>{
    getLocalStorage()
  })


// set background images
 function getRandomNum(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum =  Math.floor(Math.random() * (max - min + 1)) + min; 
 }

 const img = new Image();
 let timeOfDayImage=getTimeOfDay().toLowerCase();
 let url;

 function  setBg(){
  let bgNum = randomNum.toString().padStart(2, '0')
  img.src = `https://raw.githubusercontent.com/voronovanasta/stage1-tasks/assets/images/${timeOfDayImage}/${bgNum}.jpg`
  img.onload = () => {      
    body.style.backgroundImage = `url('${img.src}')`
  }; 
 }
 getRandomNum(1, 20);
 setBg()

 function getSlideNext(){
  if(state.photoSource=='github'){
    console.log(randomNum)
    if(randomNum<20 ){
      randomNum++;
      setBg();
    }
    else{
      randomNum = 1;
      setBg();
    }}
    else{
      if(state.photoSource=='unsplash'){
        getLinkToImageUnsplash()
      }
      if(state.photoSource=='flickr'){
        getLinkToImageFlickr()
      }
    }

  }
  

 slideNext.addEventListener('click', getSlideNext)
    
 function getSlidePrev(){
  console.log(randomNum)
  if(state.photoSource=='github'){
    if(randomNum>1){
      randomNum--;
      setBg();
    }
    else{
      randomNum = 20;
      setBg();
    }

  }
  else{
    if(state.photoSource=='unsplash'){
      getLinkToImageUnsplash()
    }
    if(state.photoSource=='flickr'){
      getLinkToImageFlickr()
    }
  }
 }

 slidePrev.addEventListener('click', getSlidePrev)

// weather
 async function getWeather() { 
  console.log('third enter')
  console.log( state.language)

  urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=29f235d059f1d8edd581b7f8c9e090b5&units=metric`;
  
  const res = await fetch(urlWeather);
  const data = await res.json(); 
 
  if(data.cod === '404'&& (city.value!='Мінск'&& city.value!='Минск'&&city.value!='Minsk') || city.value==''){

   document.querySelector('.weather-error').textContent = `Error! city not found for '${city.value}'!`
   temperature.textContent = ''
   weatherDescription.textContent = ''
   wind.textContent=''
   humidity.textContent=''
 
  }
  

  weatherIcon.className = 'weather-icon owf';

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent=`${Math.floor(data.wind.speed)}${windSpeed[state.language]}`;
  humidity.textContent=`${data.main.humidity}%`;
}


city.addEventListener('change', getWeather)

//quotes
async function getQuotes() {  
  const quotes= "./js/data.json"
  const res = await fetch(quotes);
  const data = await res.json(); 
  
  getRandomNum(0,4)
  number = randomNum
  if( state.language=='en'){
    quote.textContent=data[number].text
    author.textContent=data[number].author
  }

  if( state.language=='ru'){
    quote.textContent=data[number].текст
    author.textContent=data[number].автор
  }

  if( state.language=='be'){
    quote.textContent=data[number].тэкст
    author.textContent=data[number].аўтар
  }

  
}
getQuotes();
changeQuoteBtn.addEventListener('click',getQuotes)

async function getPrevQuotes() {  
  const quotes= "./js/data.json"
  const res = await fetch(quotes);
  const data = await res.json(); 
  number = randomNum
  if( state.language=='en'){
    quote.textContent=data[number].text
    author.textContent=data[number].author
  }
  if( state.language=='ru'){
    quote.textContent=data[number].текст
    author.textContent=data[number].автор
  }
  if( state.language=='be'){
    quote.textContent=data[number].тэкст
    author.textContent=data[number].аўтар
  }
}

//audioplayer
for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  li.classList.add('play-item', `${i}`)
  li.textContent = playList[i].title;
  playListContainer.append(li)
  div.classList.add('miniaudio-button')
  li.append(div)
}


  //click on timeline to skip around
  const timeline = document.querySelector(".timeline");
  timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
     const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
    
  });
  const progressBar = document.querySelector(".progress");
  setInterval(() => {
    
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    
    
    document.querySelector(".player-time .current").textContent = formatTime(
      audio.currentTime
    );
  }, 500);
  
  //click volume slider to change volume
  
  const volumeSlider = document.querySelector(".volume-slider");
  volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
  }, false)
  
  
  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
  };
  
let songs = Array.from(document.querySelectorAll('.play-item'));
const audio= new Audio;

function playAudio(){

  audio.currentime = Math.ceil(progressBar.style.width.slice(0,-1)/100*audio.duration)
  
  audio.src = playList[playNum].src;
  track.textContent = `${playNum+1}`+'.   ' +  playList[playNum].title
  document.querySelector(".player-time .length").textContent =
  playList[playNum].duration;
  audio.volume = .75;

  document.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = document.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove("volume-ico");
      volumeEl.classList.add("mute-ico");
    } else {
      volumeEl.classList.add("volume-ico");
      volumeEl.classList.remove("mute-ico");
    }
  });

  if(!isPlay){
    for(let i=0; i<songs.length; i++){
      if(songs[i].classList.contains(playNum)){
        songs[i].classList.add('selectedAudio')
      }
    }
    audio.play()
    playBtn.classList.add('pause')
    miniaudioBtns[playNum].classList.add('miniaudio-pause')
    isPlay=true
  }
  else{
    for(let i=0; i<songs.length; i++){
      if(songs[i].classList.contains(playNum)){
        songs[i].classList.remove('selectedAudio')
      }
    }

    audio.pause();
    audio.currentime = Math.ceil(progressBar.style.width.slice(0,-1)/100*audio.duration)
    console.log(audio.currentime)
    miniaudioBtns[playNum].classList.remove('miniaudio-pause')
    playBtn.classList.remove('pause')
    isPlay=false;
  }}

  playBtn.addEventListener('click',playAudio)
  
  audio.addEventListener('ended', playNext)

function playPrev (){
  
  isPlay=false;
  for(let i=0; i<songs.length; i++){
    if(songs[i].classList.contains(playNum)){
      songs[i].classList.remove('selectedAudio')
    }
  }
  miniaudioBtns[playNum].classList.remove('miniaudio-pause')

  if(playNum===0){
    playNum = playList.length - 1;
    playAudio()
  }
  else{
    playNum--;
    playAudio()

  }
}

playPrevBtn.addEventListener('click',playPrev )

function playNext (){
  
  isPlay=false;
  for(let i=0; i<songs.length; i++){
    if(songs[i].classList.contains(playNum)){
      songs[i].classList.remove('selectedAudio')
    }
  }
  miniaudioBtns[playNum].classList.remove('miniaudio-pause')

  playNum++;
  if(playNum >=playList.length){
    playNum = 0;
    playAudio()
  }
  else{
    
    playAudio()
  }
  }

playNextBtn.addEventListener('click',playNext )


//miniplay buttons
const miniaudioBtns = Array.from(document.querySelectorAll('.miniaudio-button'));

miniaudioBtns.forEach(el => {
  el.addEventListener('click',()=>{
    if(!isPlay){
      playNum = miniaudioBtns.indexOf(el);
      playAudio();
      el.classList.add('miniaudio-pause')
      isPlay=true;
    }
    else{
      playAudio()
      el.classList.remove('miniaudio-pause')
    }
  })
});
//burger settings

(function() {
  const burgerItem = document.querySelector('.burger');  
  const settings =document.querySelector('.settings'); 
  console.log(settings)
  const menuCloseItem = document.querySelector('.nav_close');
  
  const popup = document.querySelector('.popup');
  console.log(popup)
  

  burgerItem.addEventListener('click', ()=>{
    burgerItem.classList.add('burger_active');
    settings.classList.add('settings-active');
    popup.classList.add('popup-transparent');
    
      
  })

  menuCloseItem.addEventListener("click", () => {
    settings.classList.remove('settings-active');
    burgerItem.classList.remove('burger_active');
    popup.classList.remove('popup-transparent');
    

  })
  

  popup.addEventListener('click', ()=>{
    settings.classList.remove('settings-active');
    popup.classList.remove('popup-transparent');
    burgerItem.classList.remove('burger_active');
    
  })
 }
)();

//API for BgImages
let tag=timeOfDayImage;

//API Unsplash

async function getLinkToImageUnsplash() {
  
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=ghqNoHfwrOf_Qr4C-2cs6O5PQ8IRmCgyDlWV3m9ml8Y`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  img.src = data.urls.regular;
    body.style.backgroundImage = `url('${img.src}')`
  
  }

  

  //Flickr API

  async function getLinkToImageFlickr() {
    
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1fd5e197e1115c5a2b1eee30612433c&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    
    const res = await fetch(url);
    const data = await res.json();
   
    img.src = data.photos.photo[0].url_l;
      body.style.backgroundImage = `url('${img.src}')`
    }
   
    
    const selectSource = document.getElementById('source');
    const tagValue = document.querySelector('.tag')
    
    
    tagValue.addEventListener('click', function(){
      if(tagValue.value!=""){
        tag=tagValue.value
      }
    })

    selectSource.addEventListener('change', function(){  
      state.photoSource = this.value;
      if(tagValue.value!=""){
        tag=tagValue.value
      }
    
      if(state.photoSource=='github'){
        setBg()
      }
      if(state.photoSource=='unsplash'){
        getLinkToImageUnsplash()
      }
      if(state.photoSource=='flickr'){
        getLinkToImageFlickr()
      }
      console.log(state.photoSource)
  
    });
    

    const weatherCheckbox = document.querySelector('.weatherCheckbox')
    const timeCheckbox = document.querySelector('.timeCheckbox')
    const dateCheckbox = document.querySelector('.dateCheckbox')
    const quoteCheckbox = document.querySelector('.quoteCheckbox')
    const playerCheckbox = document.querySelector('.playerCheckbox')
    const greetingCheckbox = document.querySelector('.greetingCheckbox')
    
   let blocksArr=[weather, time, day, quoteBlock, player, greetingBlock]
   let checkboxArr = [weatherCheckbox, timeCheckbox, dateCheckbox, quoteCheckbox, playerCheckbox, greetingCheckbox]
   console.log(checkboxArr)

   function checkStateCheckboxBtns(checkboxBtn){
    

    if(!checkboxBtn.checked){
      blocksArr[checkboxArr.indexOf(checkboxBtn)].classList.add('disabled')
      
    }
    else{
      blocksArr[checkboxArr.indexOf(checkboxBtn)].classList.remove('disabled')
     
    }
  }

  checkboxArr.forEach(el=>{
    el.addEventListener('change',function(){
      checkStateCheckboxBtns(el)

    } )
  })

  
  
   window.addEventListener('beforeunload',()=>{
    for(var i = 0; i < checkboxArr.length; i++){
      localStorage[checkboxArr[i].id] = document.getElementById(checkboxArr[i].id).checked ? 1 : 0}

    }
    )

    function load_checkbox()
    {
          for(var i = 0; i < checkboxArr.length; i++)
        {
            var checkbox = checkboxArr[i]
            checkbox.checked = parseInt(localStorage[checkbox.id], 10)
            checkStateCheckboxBtns(checkbox)
        }
    }
    window.addEventListener('load', ()=>{
      load_checkbox()
    })
 
 
