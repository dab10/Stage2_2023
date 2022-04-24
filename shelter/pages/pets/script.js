let petsArr = ['katrine', 'jennifer', 'woody', 'sophia', 'timmy', 'charly', 'scarlett', 'freddie']

// MENU 320PX

const hamburgerPets = document.querySelector('.hamburger-pets');
const hamburgerCenterLine = document.querySelector('.hamburger-pets__line');
const navLinks = document.querySelectorAll('.navigation-pets__link')
const navPets = document.querySelector('.header-pets__navigation');
const backgroundGrey = document.querySelector('.grey-pets');
const navLinkPets = document.querySelector('.navigation-pets');
const navLogo = document.querySelector('.logo-pets-double')


function toggleMenu() {
    hamburgerPets.classList.toggle('is-active');                    //rotate burger
    navPets.classList.toggle('open-pets');
    navLogo.classList.toggle('open-logo');
    backgroundGrey.classList.toggle('overplay-pets');
    document.body.classList.toggle('hidden-pets');
}

hamburgerPets.addEventListener('click', toggleMenu);


function closeMenu(event) {
    if (event.target.classList.contains('navigation-pets__link') || event.target.classList.contains('grey-pets')) {
        hamburgerPets.classList.remove('is-active');
        navPets.classList.remove('open-pets');
        navLogo.classList.remove('open-logo');
        backgroundGrey.classList.remove('overplay-pets');
        document.body.classList.remove('hidden-pets');
    }    
}

navLinkPets.addEventListener('click', closeMenu);
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
    
//CONST PAGINATION

  let arrRandom = randomIntegerArr((petsArr.length));
  let arrArrRandom = [];
  let currentPage = 0;
  
  
  //PAGINATION 1280px


  if (document.documentElement.clientWidth > 1279) {
  
  const BTN_LEFT = document.querySelector("#btn-left");
  const BTN_LEFT_END = document.querySelector("#btn-left-end");
  const BTN_RIGHT = document.querySelector("#btn-right");
  const BTN_RIGHT_END = document.querySelector("#btn-right-end");
  const CAROUSEL = document.querySelector("#carousel");
  const ITEM_ACTIVE = document.querySelector("#item-active");
  const ITEM_LEFT = document.querySelector("#item-left");
  const ITEM_RIGHT = document.querySelector("#item-right");
  const CURRENT_PAGE = document.querySelector('.current-page')
  
//RANDOM WHEN COME TO PAGE
  
  window.onload = function() {
    for (let i = 0; i < 6; i++) {
        arrArrRandom.push(randomIntegerArr(petsArr.length))
    }
    console.log(arrArrRandom)
      

    document.querySelector("#item-active").innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const card = createCardTemplate(arrArrRandom[currentPage][i]);
      document.querySelector("#item-active").appendChild(card);
    }
  
    ITEM_LEFT.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
      ITEM_LEFT.appendChild(card);
      
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
      ITEM_RIGHT.appendChild(card);
   
    }
  }
  
 // FUNCTION FOR CREATE PETSCARD

  const createCardTemplate = (i) => {
    
    let namePets = petsArr[i];
  
    const card = document.createElement('div');
    card.classList.add('pets');
    card.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
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
    petsBtn.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
    petsBtn.innerHTML = 'Learn more';
    card.append(petsBtn);
    return card;
  }
  
// FUNCTION FOR MOVE LEFT

  const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
    CURRENT_PAGE.innerHTML = (currentPage + 1) - 1;
    currentPage = currentPage - 1
    if (currentPage !== 5) {
        BTN_RIGHT.removeAttribute("disabled");
        BTN_RIGHT.classList.remove("no-cursor");
        BTN_RIGHT.classList.add("button-circle_bordered");
        BTN_RIGHT_END.removeAttribute("disabled");
        BTN_RIGHT_END.classList.remove("no-cursor");
        BTN_RIGHT_END.classList.add("button-circle_bordered");
    }
  };

  BTN_LEFT.addEventListener("click", moveLeft);

  // FUNCTION FOR MOVE RIGHT
  
  const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
    CURRENT_PAGE.innerHTML = (currentPage + 1) + 1;
    currentPage = currentPage + 1
    if (currentPage !== 0) {
        BTN_LEFT.removeAttribute("disabled");
        BTN_LEFT.classList.remove("no-cursor");
        BTN_LEFT.classList.add("button-circle_bordered");
        BTN_LEFT_END.removeAttribute("disabled");
        BTN_LEFT_END.classList.remove("no-cursor");
        BTN_LEFT_END.classList.add("button-circle_bordered");
    }
  };
  
  BTN_RIGHT.addEventListener("click", moveRight);
  
// MOVE END LEFT

  BTN_LEFT_END.addEventListener('click', () => {
    
    ITEM_ACTIVE.innerHTML = "";
    for (let j = 0; j < 8; j++) {
        const card = createCardTemplate(arrArrRandom[0][j]);
        ITEM_ACTIVE.appendChild(card);
    }
   
    ITEM_LEFT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
      const card = createCardTemplate(arrArrRandom[1][j]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
    const card = createCardTemplate(arrArrRandom[1][j]);
    ITEM_RIGHT.appendChild(card);
    }

    BTN_RIGHT.addEventListener("click", moveRight);
    BTN_LEFT.setAttribute("disabled", "disabled");
    BTN_LEFT.classList.remove('button-circle_bordered');
    BTN_LEFT.classList.add('no-cursor');
    BTN_LEFT_END.setAttribute("disabled", "disabled");
    BTN_LEFT_END.classList.remove('button-circle_bordered');
    BTN_LEFT_END.classList.add('no-cursor');
    BTN_RIGHT.removeAttribute("disabled");
    BTN_RIGHT.classList.remove("no-cursor");
    BTN_RIGHT.classList.add("button-circle_bordered");
    BTN_RIGHT_END.removeAttribute("disabled");
    BTN_RIGHT_END.classList.remove("no-cursor");
    BTN_RIGHT_END.classList.add("button-circle_bordered");
    CURRENT_PAGE.innerHTML = 1;
    currentPage = 0;
  })

// MOVE END RIGHT
  
  BTN_RIGHT_END.addEventListener('click', () => {
    
    ITEM_ACTIVE.innerHTML = "";
    for (let j = 0; j < 8; j++) {
        const card = createCardTemplate(arrArrRandom[5][j]);
        ITEM_ACTIVE.appendChild(card);
    }
   
    ITEM_LEFT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
      const card = createCardTemplate(arrArrRandom[4][j]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
    const card = createCardTemplate(arrArrRandom[4][j]);
    ITEM_RIGHT.appendChild(card);
    }

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.setAttribute("disabled", "disabled");
    BTN_RIGHT.classList.remove('button-circle_bordered');
    BTN_RIGHT.classList.add('no-cursor');
    BTN_RIGHT_END.setAttribute("disabled", "disabled");
    BTN_RIGHT_END.classList.remove('button-circle_bordered');
    BTN_RIGHT_END.classList.add('no-cursor');
    BTN_LEFT.removeAttribute("disabled");
    BTN_LEFT.classList.remove("no-cursor");
    BTN_LEFT.classList.add("button-circle_bordered");
    BTN_LEFT_END.removeAttribute("disabled");
    BTN_LEFT_END.classList.remove("no-cursor");
    BTN_LEFT_END.classList.add("button-circle_bordered");
    CURRENT_PAGE.innerHTML = 6;
    currentPage = 5;
  })
  
// CAROUSEL

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
  
if (currentPage > 0 && currentPage < 5) {

    changedItem.innerHTML = "";
    for (let j = 0; j < 8; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage][j]);
        changedItem.appendChild(card);
    }
   
    ITEM_LEFT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
    const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
    ITEM_RIGHT.appendChild(card);
    }
  
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
} else if (currentPage === 5) {

    changedItem.innerHTML = "";
    for (let j = 0; j < 8; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage][j]);
        changedItem.appendChild(card);
    }
   
    ITEM_LEFT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
    const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
    ITEM_RIGHT.appendChild(card);
    }

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.setAttribute("disabled", "disabled");
    BTN_RIGHT.classList.remove('button-circle_bordered');
    BTN_RIGHT.classList.add('no-cursor');
    BTN_RIGHT_END.setAttribute("disabled", "disabled");
    BTN_RIGHT_END.classList.remove('button-circle_bordered');
    BTN_RIGHT_END.classList.add('no-cursor');
} else if (currentPage === 0) {
    
    changedItem.innerHTML = "";
    for (let j = 0; j < 8; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage][j]);
        changedItem.appendChild(card);
    }
   
    ITEM_LEFT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
      ITEM_LEFT.appendChild(card);
    }
  
    ITEM_RIGHT.innerHTML = '';
    for (let j = 0; j < 8; j++) {
    const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
    ITEM_RIGHT.appendChild(card);
    }

    BTN_RIGHT.addEventListener("click", moveRight);
    BTN_LEFT.setAttribute("disabled", "disabled");
    BTN_LEFT.classList.remove('button-circle_bordered');
    BTN_LEFT.classList.add('no-cursor');
    BTN_LEFT_END.setAttribute("disabled", "disabled");
    BTN_LEFT_END.classList.remove('button-circle_bordered');
    BTN_LEFT_END.classList.add('no-cursor');
}

})
  
  }


  //PAGINATION 768px


  if ((document.documentElement.clientWidth > 767) && (document.documentElement.clientWidth < 1280)) {
  
    const BTN_LEFT = document.querySelector("#btn-left");
    const BTN_LEFT_END = document.querySelector("#btn-left-end");
    const BTN_RIGHT = document.querySelector("#btn-right");
    const BTN_RIGHT_END = document.querySelector("#btn-right-end");
    const CAROUSEL = document.querySelector("#carousel");
    const ITEM_ACTIVE = document.querySelector("#item-active");
    const ITEM_LEFT = document.querySelector("#item-left");
    const ITEM_RIGHT = document.querySelector("#item-right");
    const CURRENT_PAGE = document.querySelector('.current-page')
    
  //RANDOM WHEN COME TO PAGE
    
    window.onload = function() {
        let arrLocal = [];
        let arrLocal1 = [];
        let arrLocal2 = [];
        let arrLocal3 = [];
        let arrLocal4 = [];
        let arrLocal5 = [];
        let arrLocal6 = [];
        let arrLocal7 = [];
        let arrLocal8 = [];

      for (let i = 0; i < 2; i++) {
          arrLocal = randomIntegerArr(8);
          arrLocal1 = arrLocal.slice(0, 6);
          arrLocal2 = arrLocal.slice(6, 8);
          arrArrRandom.push(arrLocal1);
          arrLocal3 = randomIntegerArr(8);
          arrLocal4 = arrLocal3.slice(0, 4);
          while (arrLocal4.includes(arrLocal2[0]) || arrLocal4.includes(arrLocal2[1])) {
            arrLocal3 = randomIntegerArr(8);
            arrLocal4 = arrLocal3.slice(0, 4);
          }
          arrArrRandom.push(arrLocal2.concat(arrLocal4));
          arrLocal5 = arrLocal3.slice(4, 8);
          arrLocal6 = randomIntegerArr(8);
          arrLocal7 = arrLocal6.slice(0, 2);
          while (arrLocal7.includes(arrLocal5[0]) || arrLocal7.includes(arrLocal5[1]) || arrLocal7.includes(arrLocal5[2]) || arrLocal7.includes(arrLocal5[3])) {
            arrLocal6 = randomIntegerArr(8);
            arrLocal7 = arrLocal6.slice(0, 2);
          }
          arrArrRandom.push(arrLocal5.concat(arrLocal7))
          arrLocal8 = arrLocal6.slice(2, 8)
          arrArrRandom.push(arrLocal8)
      }
          console.log(arrArrRandom)
  
      document.querySelector("#item-active").innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage][i]);
        document.querySelector("#item-active").appendChild(card);
      }
    
      ITEM_LEFT.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
        ITEM_LEFT.appendChild(card);
        
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
        ITEM_RIGHT.appendChild(card);
     
      }
    }
    
   // FUNCTION FOR CREATE PETSCARD
  
    const createCardTemplate = (i) => {
      
      let namePets = petsArr[i];
    
      const card = document.createElement('div');
      card.classList.add('pets');
      card.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
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
      petsBtn.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
      petsBtn.innerHTML = 'Learn more';
      card.append(petsBtn);
      return card;
    }
    
  // FUNCTION FOR MOVE LEFT
  
    const moveLeft = () => {
      CAROUSEL.classList.add("transition-left");
      BTN_LEFT.removeEventListener("click", moveLeft);
      BTN_RIGHT.removeEventListener("click", moveRight);
      CURRENT_PAGE.innerHTML = (currentPage + 1) - 1;
      currentPage = currentPage - 1
      if (currentPage !== 7) {
          BTN_RIGHT.removeAttribute("disabled");
          BTN_RIGHT.classList.remove("no-cursor");
          BTN_RIGHT.classList.add("button-circle_bordered");
          BTN_RIGHT_END.removeAttribute("disabled");
          BTN_RIGHT_END.classList.remove("no-cursor");
          BTN_RIGHT_END.classList.add("button-circle_bordered");
      }
    };
  
    BTN_LEFT.addEventListener("click", moveLeft);
  
    // FUNCTION FOR MOVE RIGHT
    
    const moveRight = () => {
      CAROUSEL.classList.add("transition-right");
      BTN_LEFT.removeEventListener("click", moveLeft);
      BTN_RIGHT.removeEventListener("click", moveRight);
      CURRENT_PAGE.innerHTML = (currentPage + 1) + 1;
      currentPage = currentPage + 1
      if (currentPage !== 0) {
          BTN_LEFT.removeAttribute("disabled");
          BTN_LEFT.classList.remove("no-cursor");
          BTN_LEFT.classList.add("button-circle_bordered");
          BTN_LEFT_END.removeAttribute("disabled");
          BTN_LEFT_END.classList.remove("no-cursor");
          BTN_LEFT_END.classList.add("button-circle_bordered");
      }
    };
    
    BTN_RIGHT.addEventListener("click", moveRight);
    
  // MOVE END LEFT
  
    BTN_LEFT_END.addEventListener('click', () => {
      
      ITEM_ACTIVE.innerHTML = "";
      for (let j = 0; j < 6; j++) {
          const card = createCardTemplate(arrArrRandom[0][j]);
          ITEM_ACTIVE.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        const card = createCardTemplate(arrArrRandom[1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
      const card = createCardTemplate(arrArrRandom[1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_RIGHT.addEventListener("click", moveRight);
      BTN_LEFT.setAttribute("disabled", "disabled");
      BTN_LEFT.classList.remove('button-circle_bordered');
      BTN_LEFT.classList.add('no-cursor');
      BTN_LEFT_END.setAttribute("disabled", "disabled");
      BTN_LEFT_END.classList.remove('button-circle_bordered');
      BTN_LEFT_END.classList.add('no-cursor');
      BTN_RIGHT.removeAttribute("disabled");
      BTN_RIGHT.classList.remove("no-cursor");
      BTN_RIGHT.classList.add("button-circle_bordered");
      BTN_RIGHT_END.removeAttribute("disabled");
      BTN_RIGHT_END.classList.remove("no-cursor");
      BTN_RIGHT_END.classList.add("button-circle_bordered");
      CURRENT_PAGE.innerHTML = 1;
      currentPage = 0;
    })
  
  // MOVE END RIGHT
    
    BTN_RIGHT_END.addEventListener('click', () => {
      
      ITEM_ACTIVE.innerHTML = "";
      for (let j = 0; j < 6; j++) {
          const card = createCardTemplate(arrArrRandom[7][j]);
          ITEM_ACTIVE.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        const card = createCardTemplate(arrArrRandom[6][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
      const card = createCardTemplate(arrArrRandom[6][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.setAttribute("disabled", "disabled");
      BTN_RIGHT.classList.remove('button-circle_bordered');
      BTN_RIGHT.classList.add('no-cursor');
      BTN_RIGHT_END.setAttribute("disabled", "disabled");
      BTN_RIGHT_END.classList.remove('button-circle_bordered');
      BTN_RIGHT_END.classList.add('no-cursor');
      BTN_LEFT.removeAttribute("disabled");
      BTN_LEFT.classList.remove("no-cursor");
      BTN_LEFT.classList.add("button-circle_bordered");
      BTN_LEFT_END.removeAttribute("disabled");
      BTN_LEFT_END.classList.remove("no-cursor");
      BTN_LEFT_END.classList.add("button-circle_bordered");
      CURRENT_PAGE.innerHTML = 8;
      currentPage = 7;
    })
    
  // CAROUSEL
  
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
    
  if (currentPage > 0 && currentPage < 7) {
  
      changedItem.innerHTML = "";
      for (let j = 0; j < 6; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
    
      
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.addEventListener("click", moveRight);
  } else if (currentPage === 7) {
  
      changedItem.innerHTML = "";
      for (let j = 0; j < 6; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.setAttribute("disabled", "disabled");
      BTN_RIGHT.classList.remove('button-circle_bordered');
      BTN_RIGHT.classList.add('no-cursor');
      BTN_RIGHT_END.setAttribute("disabled", "disabled");
      BTN_RIGHT_END.classList.remove('button-circle_bordered');
      BTN_RIGHT_END.classList.add('no-cursor');
  } else if (currentPage === 0) {
      
      changedItem.innerHTML = "";
      for (let j = 0; j < 6; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 6; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_RIGHT.addEventListener("click", moveRight);
      BTN_LEFT.setAttribute("disabled", "disabled");
      BTN_LEFT.classList.remove('button-circle_bordered');
      BTN_LEFT.classList.add('no-cursor');
      BTN_LEFT_END.setAttribute("disabled", "disabled");
      BTN_LEFT_END.classList.remove('button-circle_bordered');
      BTN_LEFT_END.classList.add('no-cursor');
  }
  
  })
    
    }


  //PAGINATION 320px


  if ((document.documentElement.clientWidth < 768)) {
  
    const BTN_LEFT = document.querySelector("#btn-left");
    const BTN_LEFT_END = document.querySelector("#btn-left-end");
    const BTN_RIGHT = document.querySelector("#btn-right");
    const BTN_RIGHT_END = document.querySelector("#btn-right-end");
    const CAROUSEL = document.querySelector("#carousel");
    const ITEM_ACTIVE = document.querySelector("#item-active");
    const ITEM_LEFT = document.querySelector("#item-left");
    const ITEM_RIGHT = document.querySelector("#item-right");
    const CURRENT_PAGE = document.querySelector('.current-page')
    
  //RANDOM WHEN COME TO PAGE
    
    window.onload = function() {
        let arrLocal = [];
        let arrLocal1 = [];
        let arrLocal2 = [];
        let arrLocal3 = [];
        let arrLocal4 = [];
        let arrLocal5 = [];
        let arrLocal6 = [];
        let arrLocal7 = [];
        let arrLocal8 = [];
        let arrArrLocal = [];

      for (let i = 0; i < 2; i++) {
          arrLocal = randomIntegerArr(8);
          arrLocal1 = arrLocal.slice(0, 6);
          arrLocal2 = arrLocal.slice(6, 8);
          arrArrLocal.push(arrLocal1);
          arrLocal3 = randomIntegerArr(8);
          arrLocal4 = arrLocal3.slice(0, 4);
          while (arrLocal4.includes(arrLocal2[0]) || arrLocal4.includes(arrLocal2[1])) {
            arrLocal3 = randomIntegerArr(8);
            arrLocal4 = arrLocal3.slice(0, 4);
          }
          arrArrLocal.push(arrLocal2.concat(arrLocal4));
          arrLocal5 = arrLocal3.slice(4, 8);
          arrLocal6 = randomIntegerArr(8);
          arrLocal7 = arrLocal6.slice(0, 2);
          while (arrLocal7.includes(arrLocal5[0]) || arrLocal7.includes(arrLocal5[1]) || arrLocal7.includes(arrLocal5[2]) || arrLocal7.includes(arrLocal5[3])) {
            arrLocal6 = randomIntegerArr(8);
            arrLocal7 = arrLocal6.slice(0, 2);
          }
          arrArrLocal.push(arrLocal5.concat(arrLocal7))
          arrLocal8 = arrLocal6.slice(2, 8)
          arrArrLocal.push(arrLocal8)
      }
      
      arrArrLocal = arrArrLocal.reduce((a, b) => a.concat(b), []);    
      console.log(arrArrLocal)

      for (let i = 0; i < Math.ceil(arrArrLocal.length / 3); i++) {
        arrArrRandom[i] = arrArrLocal.slice((i * 3), (i * 3) + 3);
        }
        console.log(arrArrRandom)


      document.querySelector("#item-active").innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage][i]);
        document.querySelector("#item-active").appendChild(card);
      }
    
      ITEM_LEFT.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
        ITEM_LEFT.appendChild(card);
        
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][i]);
        ITEM_RIGHT.appendChild(card);
     
      }
    }
    
   // FUNCTION FOR CREATE PETSCARD
  
    const createCardTemplate = (i) => {
      
      let namePets = petsArr[i];
    
      const card = document.createElement('div');
      card.classList.add('pets');
      card.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
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
      petsBtn.id = `${namePets[0].toUpperCase() + namePets.slice(1)}`;
      petsBtn.innerHTML = 'Learn more';
      card.append(petsBtn);
      return card;
    }
    
  // FUNCTION FOR MOVE LEFT
  
    const moveLeft = () => {
      CAROUSEL.classList.add("transition-left-pets");
      BTN_LEFT.removeEventListener("click", moveLeft);
      BTN_RIGHT.removeEventListener("click", moveRight);
      CURRENT_PAGE.innerHTML = (currentPage + 1) - 1;
      currentPage = currentPage - 1
      if (currentPage !== 15) {
          BTN_RIGHT.removeAttribute("disabled");
          BTN_RIGHT.classList.remove("no-cursor");
          BTN_RIGHT.classList.add("button-circle_bordered");
          BTN_RIGHT_END.removeAttribute("disabled");
          BTN_RIGHT_END.classList.remove("no-cursor");
          BTN_RIGHT_END.classList.add("button-circle_bordered");
      }
    };
  
    BTN_LEFT.addEventListener("click", moveLeft);
  
    // FUNCTION FOR MOVE RIGHT
    
    const moveRight = () => {
      CAROUSEL.classList.add("transition-right-pets");
      BTN_LEFT.removeEventListener("click", moveLeft);
      BTN_RIGHT.removeEventListener("click", moveRight);
      CURRENT_PAGE.innerHTML = (currentPage + 1) + 1;
      currentPage = currentPage + 1
      if (currentPage !== 0) {
          BTN_LEFT.removeAttribute("disabled");
          BTN_LEFT.classList.remove("no-cursor");
          BTN_LEFT.classList.add("button-circle_bordered");
          BTN_LEFT_END.removeAttribute("disabled");
          BTN_LEFT_END.classList.remove("no-cursor");
          BTN_LEFT_END.classList.add("button-circle_bordered");
      }
    };
    
    BTN_RIGHT.addEventListener("click", moveRight);
    
  // MOVE END LEFT
  
    BTN_LEFT_END.addEventListener('click', () => {
      
      ITEM_ACTIVE.innerHTML = "";
      for (let j = 0; j < 3; j++) {
          const card = createCardTemplate(arrArrRandom[0][j]);
          ITEM_ACTIVE.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const card = createCardTemplate(arrArrRandom[1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
      const card = createCardTemplate(arrArrRandom[1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_RIGHT.addEventListener("click", moveRight);
      BTN_LEFT.setAttribute("disabled", "disabled");
      BTN_LEFT.classList.remove('button-circle_bordered');
      BTN_LEFT.classList.add('no-cursor');
      BTN_LEFT_END.setAttribute("disabled", "disabled");
      BTN_LEFT_END.classList.remove('button-circle_bordered');
      BTN_LEFT_END.classList.add('no-cursor');
      BTN_RIGHT.removeAttribute("disabled");
      BTN_RIGHT.classList.remove("no-cursor");
      BTN_RIGHT.classList.add("button-circle_bordered");
      BTN_RIGHT_END.removeAttribute("disabled");
      BTN_RIGHT_END.classList.remove("no-cursor");
      BTN_RIGHT_END.classList.add("button-circle_bordered");
      CURRENT_PAGE.innerHTML = 1;
      currentPage = 0;
    })
  
  // MOVE END RIGHT
    
    BTN_RIGHT_END.addEventListener('click', () => {
      
      ITEM_ACTIVE.innerHTML = "";
      for (let j = 0; j < 3; j++) {
          const card = createCardTemplate(arrArrRandom[15][j]);
          ITEM_ACTIVE.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const card = createCardTemplate(arrArrRandom[14][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
      const card = createCardTemplate(arrArrRandom[14][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.setAttribute("disabled", "disabled");
      BTN_RIGHT.classList.remove('button-circle_bordered');
      BTN_RIGHT.classList.add('no-cursor');
      BTN_RIGHT_END.setAttribute("disabled", "disabled");
      BTN_RIGHT_END.classList.remove('button-circle_bordered');
      BTN_RIGHT_END.classList.add('no-cursor');
      BTN_LEFT.removeAttribute("disabled");
      BTN_LEFT.classList.remove("no-cursor");
      BTN_LEFT.classList.add("button-circle_bordered");
      BTN_LEFT_END.removeAttribute("disabled");
      BTN_LEFT_END.classList.remove("no-cursor");
      BTN_LEFT_END.classList.add("button-circle_bordered");
      CURRENT_PAGE.innerHTML = 16;
      currentPage = 15;
    })
    
  // CAROUSEL
  
    CAROUSEL.addEventListener("animationend", (animationEvent) => {
      let changedItem;
      if (animationEvent.animationName === "move-left-pets") {
        CAROUSEL.classList.remove("transition-left-pets");
        changedItem = ITEM_LEFT;
        document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
      } else {
        CAROUSEL.classList.remove("transition-right-pets");
        changedItem = ITEM_RIGHT;
        document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
      }
    
  if (currentPage > 0 && currentPage < 15) {
  
      changedItem.innerHTML = "";
      for (let j = 0; j < 3; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
    
      
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.addEventListener("click", moveRight);
  } else if (currentPage === 15) {
  
      changedItem.innerHTML = "";
      for (let j = 0; j < 3; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage - 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_LEFT.addEventListener("click", moveLeft);
      BTN_RIGHT.setAttribute("disabled", "disabled");
      BTN_RIGHT.classList.remove('button-circle_bordered');
      BTN_RIGHT.classList.add('no-cursor');
      BTN_RIGHT_END.setAttribute("disabled", "disabled");
      BTN_RIGHT_END.classList.remove('button-circle_bordered');
      BTN_RIGHT_END.classList.add('no-cursor');
  } else if (currentPage === 0) {
      
      changedItem.innerHTML = "";
      for (let j = 0; j < 3; j++) {
          const card = createCardTemplate(arrArrRandom[currentPage][j]);
          changedItem.appendChild(card);
      }
     
      ITEM_LEFT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
        ITEM_LEFT.appendChild(card);
      }
    
      ITEM_RIGHT.innerHTML = '';
      for (let j = 0; j < 3; j++) {
      const card = createCardTemplate(arrArrRandom[currentPage + 1][j]);
      ITEM_RIGHT.appendChild(card);
      }
  
      BTN_RIGHT.addEventListener("click", moveRight);
      BTN_LEFT.setAttribute("disabled", "disabled");
      BTN_LEFT.classList.remove('button-circle_bordered');
      BTN_LEFT.classList.add('no-cursor');
      BTN_LEFT_END.setAttribute("disabled", "disabled");
      BTN_LEFT_END.classList.remove('button-circle_bordered');
      BTN_LEFT_END.classList.add('no-cursor');
  }
  
  })
    
    }




//POPUP

const ITEM = document.getElementById("item-active");
const ITEM_PETS_RIGHT = document.getElementById("item-right");
const ITEM_PETS_LEFT = document.getElementById("item-left");
const popupBtn = document.querySelector('.button-popup')
const backgroundGreyPopup = document.querySelector('.grey-popup')
const popupTable = document.querySelector('.popup-wrapper')
const popupImage = document.querySelector('.popup__image')
const popupPetsName = document.querySelector('.popup__name')
const popupPetsType = document.querySelector('.popup__type')
const popupPetsDescription = document.querySelector('.popup__description')
const popupPetsAge = document.querySelector('.popup__subtitle-age')
const popupPetsInoculations = document.querySelector('.popup__subtitle-inoculations')
const popupPetsDiseases = document.querySelector('.popup__subtitle-diseases')
const popupPetsParasites = document.querySelector('.popup__subtitle-parasites')


ITEM.addEventListener('click', petsNumb)
ITEM_PETS_RIGHT.addEventListener('click', petsNumb)
ITEM_PETS_LEFT.addEventListener('click', petsNumb)
backgroundGreyPopup.addEventListener('click', closePopup)

function petsNumb(event) {
    
      if (event.target.classList.contains('item')) {
        return;
      }

      if (event.target.classList.contains('pets__image')) {
        for (let i = 0; i < data.length; i++) {
          if (event.target.alt === data[i].name) {
            res = i;
          
          }
        }
      }

      if (event.target.classList.contains('pets__name')) {
        for (let i = 0; i < data.length; i++) {
          if (event.target.innerHTML === data[i].name) {
            res = i;
          
          }
        }
      }

      if (event.target.classList.contains('pets__button')) {
        for (let i = 0; i < data.length; i++) {
          if (event.target.id === data[i].name) {
            res = i;
          
          }
        }
      }

      if (event.target.classList.contains('pets')) {
        for (let i = 0; i < data.length; i++) {
          if (event.target.id === data[i].name) {
            res = i;
          }
        }
      }
      createCardPopup(res);
}

function closePopup(event) {
  
  if (event.target.classList.contains('overlay-popup') || event.target.classList.contains('button-popup')) {
    backgroundGreyPopup.classList.remove('overlay-popup');
    popupTable.classList.remove('open-popup')
    popupBtn.style.display = 'none';
    document.body.classList.remove('hidden');
  }    
}




  const createCardPopup = (i) => {
      backgroundGreyPopup.classList.add('overlay-popup');
      document.body.classList.add('hidden');
      popupTable.classList.add('open-popup');
      popupBtn.style.display = 'flex';
      popupImage.src = `../../assets/images/${data[i].name.toLowerCase()}.png`;
      popupPetsName.innerHTML = data[i].name;
      popupPetsType.innerHTML = `${data[i].type} - ${data[i].breed}`;
      popupPetsDescription.innerHTML = data[i].description;
      popupPetsAge.innerHTML = ` ${data[i].age}`;
      popupPetsInoculations.innerHTML = ` ${data[i].inoculations}`;
      popupPetsDiseases.innerHTML = ` ${data[i].diseases}`;
      popupPetsParasites.innerHTML = ` ${data[i].parasites}`;
  }