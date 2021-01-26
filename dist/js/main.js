// Глобальные

const body = document.querySelector('body');

// Меню
console.log(body)
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

// плавный скролл до якорей
$("body").on('click', '[href*="#"]', function(e){ // при клике на элементы body содержащие в себе "href=#"  =>
  const fixedOffset = 0; 
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixedOffset }, 1000); // пользователя переведет на указанный в href якорь со скоростью 1000ms и с отступом 100px сверху
  e.preventDefault();
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

// Смена картинок в разделе "Награды"

const pointAwards = document.querySelectorAll('.awards__point-link');

for (let pointAward of pointAwards) {
  pointAward.addEventListener('click', e => {
    for (let pointAward of pointAwards) {
      pointAward.classList.remove('_selected');
    }
    pointAward.classList.add('_selected');
    
    const pointAwardData = pointAward.dataset.img,
          imgAward = document.querySelector('.awards-img[src="img/' + pointAwardData + '"]'),
          imgAwards = document.querySelectorAll('.awards-img');
      
    for (let i = 0; i < imgAwards.length; i++) {
      imgAwards[i].closest('.awards__img-item').classList.remove('_show');
    }
    imgAward.closest('.awards__img-item').classList.add('_show');
    console.log(imgAward);
    e.preventDefault();
  });
}