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
    document.body.classList.toggle('hidden');
}

hamburger.addEventListener('click', toggleMenu);


function closeMenu(event) {
    if (event.target.classList.contains('navigation-main__link') || event.target.classList.contains('grey')) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('open');
        navLogo.classList.remove('open-logo');
        backgroundGrey.classList.remove('overplay');
        document.body.classList.remove('hidden');
    }    
}

navLink.addEventListener('click', closeMenu);
backgroundGrey.addEventListener('click', closeMenu);

//CAROUSEL

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");

const createCardTemplate = () => {
  const card = document.createElement("div");
  card.classList.add("pets");
  card.innerHTML = "<img class='pets__image' src='../../assets/images/pets-timmy.png' alt='pets-timmy'><div class='pets__name'>Timmy</div><button class='button button_bordered pets__button'>Learn more</button>";
  return card;
}

const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add("transition-right");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === "move-left") {
    CAROUSEL.classList.remove("transition-left");
    changedItem = ITEM_LEFT;
    document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
  } else {
    CAROUSEL.classList.remove("transition-right");
    changedItem = ITEM_RIGHT;
    document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
  }
  
  changedItem.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate();
    //card.innerText = Math.floor(Math.random() * 8);
    changedItem.appendChild(card);
  }
  
  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
})