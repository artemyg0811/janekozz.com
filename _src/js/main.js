// Глобальные

const body = document.querySelector('body');

// Меню

const menu = document.querySelector('.nav__menu'),
      menuBody = document.querySelector('.nav__menu__body'),
      burger = document.querySelector('.nav-burger-icon'),
      menuClose = document.querySelector('.nav__menu-close');

burger.addEventListener('click', function(e) {
  e.stopPropagation();
  menu.classList.add('_show');
  body.classList.add('_lock');
});

menuClose.addEventListener('click', function() {
  menu.classList.remove('_show');
  body.classList.remove('_lock');
});

document.addEventListener('click', function(e) {
  const target = e.target;
  const itsMenu = target == menuBody || menuBody.contains(target);
  const itsBurger = target == burger.contains(target);
  const modalShow = menu.classList.contains('_show');

  if (!itsMenu && !itsBurger && modalShow) {
    menu.classList.remove('_show');
    body.classList.remove('_lock');
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    menu.classList.remove('_show');
    body.classList.remove('_lock');
  }
});

// Аккордион в меню
const accordionHeaders = document.querySelectorAll('.nav__menu__accordion__header');

accordionHeaders.forEach(accordionHeader => {
  const accordionBody = accordionHeader.nextElementSibling;

  accordionHeader.addEventListener('click', e => {
    accordionHeader.classList.toggle('_active');

    if (accordionHeader.classList.contains('_active')) {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    } else {
      accordionBody.style.maxHeight = 0;
    }
  });

  if (accordionHeader.classList.contains('_active')) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
  } else {
    accordionBody.style.maxHeight = 0;
  }
});




// Слайдер на главном экране

$('.header__slider').slick({
  dots: true,
  infinite: false,
  fade: true,
  // slideToShow: 1,
  prevArrow: '.header__slide-arrow-prev',
  nextArrow: '.header__slide-arrow-next',
  dotsClass: 'header__slide__dots',
});