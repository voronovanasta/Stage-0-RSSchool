console.log('Оценка:70\n1. Соответствие 768-24.\n2.Соответствие 380 - 24.\n3. Нет полосы прокрутки -10.\n4.Адаптивное меню -22.');

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
    let selectedBtns = [];
    console.log(selectedBtns);
    let selectedBtn;

    //support disabled
    let disabledBtns = [];
    

    //список 3 кнопок

    const servicesBtns = document.querySelectorAll('.button-service')

   
    //массив всех карточек
    const articles = Array.from(document.querySelectorAll('.article'))
    let button = ''
  
    
    servicesBtns.forEach(btn=>{
        btn.addEventListener('click', (e)=>{

         console.log(selectedBtns)

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

                console.log(selectedBtn.disabled===true)
                console.log(selectedBtns.length)

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
    
    })()




    




