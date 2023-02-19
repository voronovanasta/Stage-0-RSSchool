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

let randomNum;
let isPlay = false;
let playNum = 0;

import playList from './playList.js';


function showTime() {
  const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    
  }
  
  function showDate (){
    const date = new Date();
    const options = {month: 'long', weekday: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-eN', options);
    
    day.textContent = currentDate;
  }
  
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

  }
  }

  showTime(showDate(), getTimeOfDay(), showGreeting())
  
  function showGreeting(){
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greeting.textContent = greetingText;
  }

  function setLocalStorage() {
    
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload',()=>{
    setLocalStorage()

  } )

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

 function getRandomNum(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum =  Math.floor(Math.random() * (max - min + 1)) + min; 
 }
 const img = new Image();
 function  setBg(){
  let timeOfDay=getTimeOfDay().toLowerCase();
  
  let bgNum = randomNum.toString().padStart(2, '0')

  
  img.src = `https://raw.githubusercontent.com/voronovanasta/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
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
  }

 }

 slideNext.addEventListener('click', getSlideNext)
    
 function getSlidePrev(){
  
  
  if(randomNum>1){
    randomNum--;
    setBg();
  }
  else{
    randomNum = 20;
    setBg();
  }

 }

 slidePrev.addEventListener('click', getSlidePrev)


 async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=29f235d059f1d8edd581b7f8c9e090b5&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
 
  weatherIcon.className = 'weather-icon owf';

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent=`${Math.floor(data.wind.speed)}m/s`;
  humidity.textContent=`${data.main.humidity}%`;
}
getWeather()



city.addEventListener('change', getWeather)
    
async function getQuotes() {  
  const quotes= "./js/data.json"
  const res = await fetch(quotes);
  const data = await res.json(); 
  
  getRandomNum(0,8)
  let number = randomNum

  quote.textContent=data[number].text
  author.textContent=data[number].author


}
getQuotes();

changeQuoteBtn.addEventListener('click',getQuotes)

//audioplayer
for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item', `${i}`)
  li.textContent = playList[i].title;
  playListContainer.append(li)
}

let songs = Array.from(document.querySelectorAll('.play-item'));
console.log(songs)

const audio= new Audio;
function playAudio(){
  
  audio.currentTime = 0;
  audio.src = playList[playNum].src;
  if(!isPlay){
    console.log(playNum)
    console.log('if start'+ isPlay)

    for(let i=0; i<songs.length; i++){
      console.log('for for songs')
      if(songs[i].classList.contains(playNum)){
        songs[i].classList.add('selectedAudio')

      }

    }
    
    audio.play()
    console.log(audio.play())
    playBtn.classList.add('pause')
    isPlay=true
    console.log('if end'+ isPlay)

  }
  else{
    console.log('else start' + isPlay)
    for(let i=0; i<songs.length; i++){
      console.log('for for songs')
      if(songs[i].classList.contains(playNum)){
        songs[i].classList.remove('selectedAudio')
      }

    }
    audio.pause();
    console.log(audio.pause())
    playBtn.classList.remove('pause')
    isPlay=false;
    console.log('else end' + isPlay)
  }

  }

  playBtn.addEventListener('click',playAudio)
  audio.addEventListener('ended', playNext)

function playPrev (){
  console.log('prev start' + playNum)
  isPlay=false;
  for(let i=0; i<songs.length; i++){
    if(songs[i].classList.contains(playNum)){
      songs[i].classList.remove('selectedAudio')
    }
  }

  if(playNum===0){
    playNum = playList.length - 1;
    playAudio()
  }
  else{
    playNum--;
    playAudio()

  }
  
console.log('prev end' + playNum)
 

}

playPrevBtn.addEventListener('click',playPrev )

function playNext (){
  console.log('next start' + playNum)
  isPlay=false;
  for(let i=0; i<songs.length; i++){
    if(songs[i].classList.contains(playNum)){
      songs[i].classList.remove('selectedAudio')
    }
  }

  playNum++;
  if(playNum >=playList.length){
    playNum = 0;
    playAudio()

  }
  else{
    
    playAudio()

  }
  console.log('next end' + playNum)
  
  
  }

  playNextBtn.addEventListener('click',playNext )


  
  