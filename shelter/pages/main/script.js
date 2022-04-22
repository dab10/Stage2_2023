let petsArr = ['katrine', 'jennifer', 'woody', 'sophia', 'timmy', 'charly', 'scarlett', 'freddie']

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

// RANDOM INTEGER

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomIntegerArr(countNum) {
  let outArray = []; 
  while(outArray.length < countNum){
      var r = randomInteger(0, (petsArr.length - 1));
      if(outArray.indexOf(r) === -1) outArray.push(r);
  }
  return outArray;
}

let arrRandom = randomIntegerArr((petsArr.length));

//CAROUSEL

if (document.documentElement.clientWidth > 1279) {

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");

window.onload = function() {

  document.querySelector("#item-active").innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(arrRandom[i]);
    document.querySelector("#item-active").appendChild(card);
  }

  let arrRandomNumb0 = arrRandom[0];
  let arrRandomNumb1 = arrRandom[1];
  let arrRandomNumb2 = arrRandom[2];

  if (arrRandom.length < 6) {
    arrRandom = randomIntegerArr(petsArr.length);
    if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};
    if (arrRandom.includes(arrRandomNumb1)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb1), 1)};
    if (arrRandom.includes(arrRandomNumb2)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb2), 1)};
  } else {
    arrRandom = arrRandom.slice(3)
  }

  ITEM_LEFT.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(arrRandom[i]);
    ITEM_LEFT.appendChild(card);
  }

  ITEM_RIGHT.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(arrRandom[i]);
    ITEM_RIGHT.appendChild(card);
  }
}


const createCardTemplate = (i) => {
  
  let namePets = petsArr[i];

  const card = document.createElement('div');
  card.classList.add('pets');
  const img = document.createElement('img');
  img.classList.add('pets__image');
  img.src = `../../assets/images/pets-${namePets}.png`;
  img.alt = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
  card.append(img);

  const petsName = document.createElement('div');
  petsName.classList.add('pets__name');
  petsName.innerHTML = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
  card.append(petsName);

  const petsBtn = document.createElement('button');
  petsBtn.classList.add('button', 'button_bordered', 'pets__button');
  petsBtn.innerHTML = 'Learn more';
  card.append(petsBtn);
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
      const card = createCardTemplate(arrRandom[i]);
      changedItem.appendChild(card);
  }

  let arrRandomNumb0 = arrRandom[0];
  let arrRandomNumb1 = arrRandom[1];
  let arrRandomNumb2 = arrRandom[2];

  if (arrRandom.length < 6) {
    arrRandom = randomIntegerArr(petsArr.length);
    if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};
    if (arrRandom.includes(arrRandomNumb1)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb1), 1)};
    if (arrRandom.includes(arrRandomNumb2)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb2), 1)};
  } else {
    arrRandom = arrRandom.slice(3)
  }

  ITEM_LEFT.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate(arrRandom[i]);
    ITEM_LEFT.appendChild(card);
  }

  ITEM_RIGHT.innerHTML = '';
  for (let i = 0; i < 3; i++) {
  const card = createCardTemplate(arrRandom[i]);
  ITEM_RIGHT.appendChild(card);
  }

  
  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
})

}





if ((document.documentElement.clientWidth > 767) && (document.documentElement.clientWidth < 1280)) {

  const BTN_LEFT = document.querySelector("#btn-left");
  const BTN_RIGHT = document.querySelector("#btn-right");
  const CAROUSEL = document.querySelector("#carousel");
  const ITEM_LEFT = document.querySelector("#item-left");
  const ITEM_RIGHT = document.querySelector("#item-right");
  
  window.onload = function() {
 
    document.querySelector("#item-active").innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const card = createCardTemplate(arrRandom[i]);
      document.querySelector("#item-active").appendChild(card);
    }
  
    let arrRandomNumb0 = arrRandom[0];
    let arrRandomNumb1 = arrRandom[1];
  
    if (arrRandom.length < 4) {
      arrRandom = randomIntegerArr(petsArr.length);
      if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};
      if (arrRandom.includes(arrRandomNumb1)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb1), 1)};
    } else {
      arrRandom = arrRandom.slice(2)
    }
  
    ITEM_LEFT.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const card = createCardTemplate(arrRandom[i]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const card = createCardTemplate(arrRandom[i]);
      ITEM_RIGHT.appendChild(card);
    }
  }
  
  
  const createCardTemplate = (i) => {
    
    let namePets = petsArr[i];
  
    const card = document.createElement('div');
    card.classList.add('pets');
    const img = document.createElement('img');
    img.classList.add('pets__image');
    img.src = `../../assets/images/pets-${namePets}.png`;
    img.alt = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
    card.append(img);
  
    const petsName = document.createElement('div');
    petsName.classList.add('pets__name');
    petsName.innerHTML = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
    card.append(petsName);
  
    const petsBtn = document.createElement('button');
    petsBtn.classList.add('button', 'button_bordered', 'pets__button');
    petsBtn.innerHTML = 'Learn more';
    card.append(petsBtn);
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
    for (let i = 0; i < 2; i++) {
        const card = createCardTemplate(arrRandom[i]);
        changedItem.appendChild(card);
    }
    
    let arrRandomNumb0 = arrRandom[0];
    let arrRandomNumb1 = arrRandom[1];
  
    if (arrRandom.length < 4) {
      arrRandom = randomIntegerArr(petsArr.length);
      if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};
      if (arrRandom.includes(arrRandomNumb1)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb1), 1)};
    } else {
      arrRandom = arrRandom.slice(2)
    }
    
  
    ITEM_LEFT.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const card = createCardTemplate(arrRandom[i]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let i = 0; i < 2; i++) {
    const card = createCardTemplate(arrRandom[i]);
    ITEM_RIGHT.appendChild(card);
    }
  
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
  })
  
  }




  if (document.documentElement.clientWidth < 768) {

    const BTN_LEFT = document.querySelector("#btn-left");
    const BTN_RIGHT = document.querySelector("#btn-right");
    const CAROUSEL = document.querySelector("#carousel");
    const ITEM_LEFT = document.querySelector("#item-left");
    const ITEM_RIGHT = document.querySelector("#item-right");
    
    window.onload = function() {
   
      document.querySelector("#item-active").innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(arrRandom[i]);
        document.querySelector("#item-active").appendChild(card);
      }
    
      let arrRandomNumb0 = arrRandom[0];
    
      if (arrRandom.length < 2) {
        arrRandom = randomIntegerArr(petsArr.length);
        if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};

      } else {
        arrRandom = arrRandom.slice(1)
      }
    
      ITEM_LEFT.innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(arrRandom[i]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(arrRandom[i]);
        ITEM_RIGHT.appendChild(card);
      }
    }
    
    
    const createCardTemplate = (i) => {
      
      let namePets = petsArr[i];
    
      const card = document.createElement('div');
      card.classList.add('pets');
      const img = document.createElement('img');
      img.classList.add('pets__image');
      img.src = `../../assets/images/pets-${namePets}.png`;
      img.alt = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
      card.append(img);
    
      const petsName = document.createElement('div');
      petsName.classList.add('pets__name');
      petsName.innerHTML = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
      card.append(petsName);
    
      const petsBtn = document.createElement('button');
      petsBtn.classList.add('button', 'button_bordered', 'pets__button');
      petsBtn.innerHTML = 'Learn more';
      card.append(petsBtn);
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
      for (let i = 0; i < 1; i++) {
          const card = createCardTemplate(arrRandom[i]);
          changedItem.appendChild(card);
      }
      
      let arrRandomNumb0 = arrRandom[0];
    
      if (arrRandom.length < 2) {
        arrRandom = randomIntegerArr(petsArr.length);
        if (arrRandom.includes(arrRandomNumb0)) {arrRandom.splice(arrRandom.indexOf(arrRandomNumb0), 1)};
      } else {
        arrRandom = arrRandom.slice(1)
      }
      
    
      ITEM_LEFT.innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(arrRandom[i]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let i = 0; i < 1; i++) {
      const card = createCardTemplate(arrRandom[i]);
      ITEM_RIGHT.appendChild(card);
      }
    
      
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.addEventListener("click", moveRight);
    })
    
    }