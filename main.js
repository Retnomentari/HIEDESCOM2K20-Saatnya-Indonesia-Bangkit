//Selectors
let header = document.querySelector('.header');
let menu = document.querySelector('.menu');

window.addEventListener('scroll', function(){
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('active', windowPosition)
})

menu.addEventListener('click', function(){
    header.classList.toggle('menu-open');
})