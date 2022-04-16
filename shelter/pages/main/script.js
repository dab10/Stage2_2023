// MENU 320PX

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-main__navigation');
const backgroundGrey = document.querySelector('.grey');
const navLink = document.querySelector('.navigation-main');
const navLogo = document.querySelector('.logo-main-double')

function toggleMenu() {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('open');
    navLogo.classList.toggle('open-logo');
    backgroundGrey.classList.toggle('overplay');
}

hamburger.addEventListener('click', toggleMenu);


function closeMenu(event) {
    if (event.target.classList.contains('navigation-main__link') || event.target.classList.contains('grey')) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('open');
        navLogo.classList.remove('open-logo');
        backgroundGrey.classList.remove('overplay');
    }    
}

navLink.addEventListener('click', closeMenu);
backgroundGrey.addEventListener('click', closeMenu);