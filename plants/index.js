
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


