const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

const track = document.getElementById('track')
let randomNum;
let isPlay = false;
let playNum = 0;
let number;

import playList from './playList.js';

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
    "language": "Language:"
  },
  'ru': {
    "language": "Язык:"
  },
  'be': {
    "language": "Мова:"
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

let langValue = 'en';
const select = document.getElementById('language');

select.addEventListener('change', function(){  
  langValue = this.value;

  if(langValue!='be'){
    city.value=weatherInput[langValue]
    getWeather()
  }
  getWeather()
  if(langValue=='be'){
    city.value=weatherInput[langValue]
  }
  
  showGreeting()
  getPrevQuotes()
  showDate()

  name.placeholder=greetingTranslation[langValue].placeholder
  document.querySelector('.language').textContent=settingsTranslation[langValue].language
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
    if(langValue=='be'){
      let formatter = new Intl.DateTimeFormat('be-BY', options).format(date)
      currentDate = formatter
      console.log(formatter)
    }
    else{
      currentDate = date.toLocaleDateString(dateTranslation[langValue].locales, options);

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
    const timeOfDay =greetingTranslation[langValue][getTimeOfDay()];
    const greetingText = `${timeOfDay},`;
    greeting.textContent = greetingText;
  }
//local storage

  function setLocalStorage() {
    
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload',()=>{
    setLocalStorage()

  })

  function getLocalStorage() {
    
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
      
    }
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      
    }
  }
  window.addEventListener('load', ()=>{
    getLocalStorage()
  })
//window load
  window.addEventListener('load', ()=>{
    city.value='Minsk'
    console.log(city.value)
  })
// set background images
 function getRandomNum(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum =  Math.floor(Math.random() * (max - min + 1)) + min; 
 }

 const img = new Image();
 let timeOfDayImage=getTimeOfDay().toLowerCase();

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
  
  if(randomNum<20){
    randomNum++;
    setBg();
  }
  else{
    randomNum = 1;
    setBg();
  }}

 slideNext.addEventListener('click', getSlideNext)
    
 function getSlidePrev(){
  if(randomNum>1){
    randomNum--;
    setBg();
  }
  else{
    randomNum = 20;
    setBg();
  }}

 slidePrev.addEventListener('click', getSlidePrev)

// weather
 async function getWeather() { 
  console.log(langValue)

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langValue}&appid=29f235d059f1d8edd581b7f8c9e090b5&units=metric`;
  
  const res = await fetch(url);
  const data = await res.json(); 
 
  weatherIcon.className = 'weather-icon owf';

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent=`${Math.floor(data.wind.speed)}${windSpeed[langValue]}`;
  humidity.textContent=`${data.main.humidity}%`;
}
getWeather()
city.addEventListener('change', getWeather)

//quotes
async function getQuotes() {  
  const quotes= "./js/data.json"
  const res = await fetch(quotes);
  const data = await res.json(); 
  
  getRandomNum(0,4)
  number = randomNum
  if(langValue=='en'){
    quote.textContent=data[number].text
    author.textContent=data[number].author
  }

  if(langValue=='ru'){
    quote.textContent=data[number].текст
    author.textContent=data[number].автор
  }

  if(langValue=='be'){
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
  if(langValue=='en'){
    quote.textContent=data[number].text
    author.textContent=data[number].author
  }
  if(langValue=='ru'){
    quote.textContent=data[number].текст
    author.textContent=data[number].автор
  }
  if(langValue=='be'){
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

let songs = Array.from(document.querySelectorAll('.play-item'));
const audio= new Audio;

function playAudio(){
  audio.currentTime = 0;
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

  //click on timeline to skip around
const timeline = document.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
  const progressBar = document.querySelector(".progress");
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
    burgerItem.classList.remove('burger_active')
  })
 }
)();

//API for BgImages
let tag=timeOfDayImage;

//API Unsplash

async function getLinkToImageUnsplash() {
  console.log(tag)
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=ghqNoHfwrOf_Qr4C-2cs6O5PQ8IRmCgyDlWV3m9ml8Y`;
  
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  img.src = data.urls.regular;
    body.style.backgroundImage = `url('${img.src}')`
  
  }

  

  //Flickr API

  async function getLinkToImageFlickr() {
    console.log('flickr')
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1fd5e197e1115c5a2b1eee30612433c&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    img.src = data.photos.photo[0].url_l;
      body.style.backgroundImage = `url('${img.src}')`
    
    }
  
   
  

