console.log('Оценка:120\n1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service.\n2.Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах.\n3. В разделе contacts реализован select с выбором городов.');

(function() {
    const burgerItem = document.querySelector('.burger');  
    const menu = document.querySelector('.nav');
    const menuCloseItem = document.querySelector('.nav_close');
    const navItems = document.querySelectorAll('.nav_item a');
    const popup = document.querySelector('.popup');
    

    burgerItem.addEventListener('click', ()=>{
        menu.classList.add('nav_active');
        popup.classList.add('popup-transparent');
        
    })

    menuCloseItem.addEventListener("click", () => {
        menu.classList.remove('nav_active');

    })

    navItems.forEach(item => item.addEventListener('click', ()=>{
        menu.classList.remove('nav_active');
    }));

    popup.addEventListener('click', ()=>{
        menu.classList.remove('nav_active');
        popup.classList.remove('popup-transparent');
    })
   }
)();

(function (){
    //array of active buttons
    let selectedBtns = [];
    let selectedBtn;

    //support disabled
    let disabledBtns = [];
    
    //list of all buttons
    const servicesBtns = document.querySelectorAll('.button-service')
    let button = '';

    //array of all articles
    const articles = Array.from(document.querySelectorAll('.article'))
   
  
    
    servicesBtns.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            if(btn.classList.contains('garden-button')){               
                button = 'garden'
                GardenBtnHandler(e);
            }

            if(btn.classList.contains('lawn-button')){
                button = 'lawn'
                LawnBtnHandler(e);
            }

            if(btn.classList.contains('planting-button')){
                button = 'planting'
                PlantingBtnHandler(e);
            }
        })       
    })

    function GardenBtnHandler(event){
       
        selectedBtn = event.target;
        
        if (!selectedBtns.includes(button) && selectedBtns.length==2)
            {
                selectedBtn.disabled=true;
                disabledBtns.push(selectedBtn);
            }        

        
        else if(!selectedBtn.classList.contains('button-active')){
            selectedBtn.classList.add('button-active')
            
            articles.forEach(article => {
                if (!article.classList.contains('garden') && selectedBtns.length==0){
                    article.classList.add('blur')  
                }

                if(article.classList.contains('garden') && selectedBtns.length>0){
                    article.classList.remove('blur')  
                }
            })
            selectedBtns.push('garden')
        }
        else if(selectedBtns.includes('planting') || selectedBtns.includes('lawn') ){
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('garden'), 1);

            //disabled
            if (disabledBtns.length == 1){
                disabledBtns[0].disabled = false;
                disabledBtns.splice(0, 1)
            }
            articles.forEach(article => {
                if (article.classList.contains('garden')){
                    article.classList.add('blur')  
                }
            })
        }
        else {
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('garden'), 1);
            articles.forEach(article => {
                if (!article.classList.contains('garden')){
                    article.classList.remove('blur')  
                }
            })
        }
    }

    function LawnBtnHandler(event){
       
        selectedBtn = event.target;
        if (!selectedBtns.includes(button)&&selectedBtns.length==2){
            selectedBtn.disabled=true;
            disabledBtns.push(selectedBtn);
        }
        else if(!selectedBtn.classList.contains('button-active')){
            selectedBtn.classList.add('button-active')
            
            articles.forEach(article => {
                if (!article.classList.contains('lawn') && selectedBtns.length==0){
                    article.classList.add('blur')  
                }

                if(article.classList.contains('lawn') && selectedBtns.length>0){
                    article.classList.remove('blur')  
                }
            })
            selectedBtns.push('lawn')
        }
        else if(selectedBtns.includes('planting') || selectedBtns.includes('garden') ){
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('lawn'), 1);

            //disabled
            if (disabledBtns.length == 1){
                disabledBtns[0].disabled = false;
                disabledBtns.splice(0, 1)
            }

            articles.forEach(article => {
                if (article.classList.contains('lawn')){
                    article.classList.add('blur')  
                }
            })
        }
        else {
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('lawn'), 1);
            articles.forEach(article => {
                if (!article.classList.contains('lawn')){
                    article.classList.remove('blur')  
                }
            })
        }
    }

        
    function PlantingBtnHandler(event){
       
        selectedBtn = event.target;

        if (!selectedBtns.includes(button)&&selectedBtns.length==2){
            selectedBtn.disabled=true;
            disabledBtns.push(selectedBtn);

        }
        else if(!selectedBtn.classList.contains('button-active')){
            selectedBtn.classList.add('button-active')
            
            articles.forEach(article => {
                if (!article.classList.contains('planting') && selectedBtns.length==0){
                    article.classList.add('blur')  
                }

                if(article.classList.contains('planting') && selectedBtns.length>0){
                    article.classList.remove('blur')  
                }
            })
            selectedBtns.push('planting')
        }
        else if(selectedBtns.includes('garden') || selectedBtns.includes('lawn') ){
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('planting'), 1);

            //disabled
            if (disabledBtns.length == 1){
                disabledBtns[0].disabled = false;
                disabledBtns.splice(0, 1)
            }
            articles.forEach(article => {
                if (article.classList.contains('planting')){
                    article.classList.add('blur')  
                }
            })
        }
        else {
            selectedBtn.classList.remove('button-active')
            selectedBtns.splice(selectedBtns.indexOf('planting'), 1);
            articles.forEach(article => {
                if (!article.classList.contains('planting')){
                    article.classList.remove('blur')  
                }
            })
        }     
    }
})();

(function(){
    const accourdion = document.querySelector('.price-accourdion');
    console.log(accourdion);
    let  detailsItems = Array.from(accourdion.querySelectorAll('details'));
    console.log(detailsItems);

    detailsItems.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            detailsItems.forEach(detail=>{
                if (detail !==targetDetail) {
                    detail.removeAttribute('open');
                }
            })
            
          });

    })
    
})()

let select = function () {
let header = document.querySelector('.select-header');
let selectItem = document.querySelectorAll('.select-item');
let itemsArray = Array.from(document.querySelectorAll('.select-item')) 
let cardsArray = Array.from(document.querySelectorAll('.card')) 



 header.addEventListener('click', ()=>{
        header.parentElement.classList.toggle('active');
        if(header.parentElement.classList.contains('active')){
            cardsArray.forEach(item => {
                item.classList.remove('active');
                console.log('here!')
            })
        }

    })

 selectItem.forEach(item =>{
        item.addEventListener('click', ()=>{
            let text = item.innerText;
           
            header.querySelector('.city-name').innerText = text;
            header.parentElement.classList.remove('active');
            header.classList.add('selected-city')
            document.querySelector('.city-name').classList.add('selected-city')
        })
        
     })

 for (let i = 0; i< itemsArray.length; i++ ){
    itemsArray[i].addEventListener('click', ()=>{
        for(let j = 0; j < cardsArray.length; j++){
            if(i==j){
                cardsArray[j].classList.add('active')
                
                
            }
            else{
                cardsArray[j].classList.remove('active')
                
            }

        }
            

    })

 }

 
}

select();  






