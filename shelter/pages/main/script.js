// MENU 320PX

// $(document).ready(function(){
//     $(".hamburger").click(function(){
//       $(this).toggleClass("is-active");
//     });
//   });


const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-main__navigation');
const backgroundGrey = document.querySelector('.grey');
//const navLink = document.querySelector('.nav-list');

function toggleMenu() {
  hamburger.classList.toggle('is-active');
  nav.classList.toggle('open');
  backgroundGrey.classList.toggle('overplay');
}
hamburger.addEventListener('click', toggleMenu);


// function closeMenu() {
//   nav.classList.remove('open');
//   div.classList.remove('overplay');
//   hamburger.classList.remove('is-active');
// }
//nav.addEventListener('click', closeMenu);