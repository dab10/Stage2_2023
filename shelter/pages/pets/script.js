// MENU 320PX

const hamburgerPets = document.querySelector('.hamburger-pets');
const hamburgerCenterLine = document.querySelector('.hamburger-pets__line');
const navLinks = document.querySelectorAll('.navigation-pets__link')
const navPets = document.querySelector('.header-pets__navigation');
const backgroundGrey = document.querySelector('.grey-pets');
const navLinkPets = document.querySelector('.navigation-pets');
const navLogo = document.querySelector('.logo-pets-double')

navLinks.forEach((el) => el.classList.toggle('is-active-menu'));  //change text color menu burger

function toggleMenu() {
    hamburgerPets.classList.toggle('is-active');                    //rotate burger
    hamburgerCenterLine.classList.toggle('is-active-center-line'); //change color center line menu burger
    navPets.classList.toggle('open-pets');
    navLogo.classList.toggle('open-logo');
    backgroundGrey.classList.toggle('overplay-pets');
    document.body.classList.toggle('hidden-pets');
}

hamburgerPets.addEventListener('click', toggleMenu);


function closeMenu(event) {
    if (event.target.classList.contains('navigation-pets__link') || event.target.classList.contains('grey-pets')) {
        hamburgerPets.classList.remove('is-active');
        hamburgerCenterLine.classList.remove('is-active-center-line');
        navPets.classList.remove('open-pets');
        navLogo.classList.remove('open-logo');
        backgroundGrey.classList.remove('overplay-pets');
        document.body.classList.close('hidden-pets');
    }    
}

navLinkPets.addEventListener('click', closeMenu);
backgroundGrey.addEventListener('click', closeMenu);