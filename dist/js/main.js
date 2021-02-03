"use strict"

document.addEventListener('DOMContentLoaded', function() {

// Глобальные
const body = document.querySelector('body');

// Меню
const menu = document.querySelector('#navMenu'),
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

// Форма регистрации
const signUp = document.querySelector('#signUp'),
      btnBooking = document.querySelectorAll('.btn-booking'),
      signUpClose = document.querySelector('.signup-close'),
      signUpBody = document.querySelector('.nav__menu__body');

for (let i = 0; i < btnBooking.length; i++) {
  btnBooking[i].addEventListener('click', function(e) {
    e.preventDefault();
    signUp.classList.add('_show');
    body.classList.add('_lock');
  });
}

signUpClose.addEventListener('click', function() {
  signUp.classList.remove('_show');
  body.classList.remove('_lock');
});

const form = document.querySelector('#formSendTelegram');

form.addEventListener('submit', formSend);

async function formSend(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('telegram.php', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    const result = await response.json();
    form.reset();
    // alert(result.message);
    const successful = document.querySelector('.response-successful');
    successful.classList.add('_show');
    setTimeout(() => {
      successful.classList.remove('_show');
    }, 3000);
  } else {
    const error = document.querySelector('.response-error');
    error.classList.add('_show');
    setTimeout(() => {
      error.classList.remove('_show');
    }, 3000);
  }
}

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
    this.classList.toggle('_active');
  });

  if (accordionHeader.classList.contains('_active')) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
  } else {
    accordionBody.style.maxHeight = 0;
  }
});

// плавный скролл до якорей
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        menu.classList.remove('_show');
        body.classList.remove('_lock');
    });
}
// Слайдер на главном экране
$('.header__slider').slick({
  dots: true,
  infinite: false,
  fade: true,
  prevArrow: '.header__slide-arrow-prev',
  nextArrow: '.header__slide-arrow-next',
  dotsClass: 'header__slide__dots',
});

// номер слайда на главном экране
const slickArrows = document.querySelectorAll('.slick-arrow');

for (let i = 0; i < slickArrows.length; i++) {
  slickArrows[i].addEventListener('click', () => {
    const slickActive = document.querySelector('li.slick-active button'),
          slideNumber = document.querySelector('.header__slide-sign');
    
    slideNumber.textContent = slickActive.textContent;
  });
}

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
    e.preventDefault();
  });
}

// Фильтр
const filterLinks = document.querySelectorAll('.portfolio-moving-link'),
      filterImages = document.querySelectorAll('.portfolio__img');

for (let filterLink of filterLinks) {
  filterLink.addEventListener('click', e => {

    document.location.replace("../#portfolio");

    // удаляю все классы _selected
    for (let filterLink of filterLinks) {
      filterLink.parentNode.classList.remove('_selected');
    }

    // добавляю клас родителю выбранной ссылкы
    filterLink.parentNode.classList.add('_selected');
    e.preventDefault();

    // узнаю дата атрибут выбранной ссылки
    const filterLinkData = filterLink.dataset.filter;

    // фильтр картинок
    for (let i = 0; i < filterImages.length; i++) {
      filterImages[i].classList.remove('_show');
      filterImages[i].classList.remove('_hide');
      
      if (filterImages[i].classList.contains(filterLinkData) || filterLinkData == 'all') {
        filterImages[i].classList.add('_show');
      } if (!filterImages[i].classList.contains(filterLinkData) && filterLinkData != 'all')  {
        filterImages[i].classList.add('_hide');
      }
    }
  });
}

// В начало раздела Портфолио
const portfolioSection = document.querySelector('#portfolio'),
      portfolioArrowTop = document.querySelector('.portfolio-top');

// window.addEventListener('scroll', e => {
//   // if (pageYOffset = 300) {
//   //   portfolioArrowTop.classList.add('_show');
//   // }
//   console.log(pageYOffset + 'px');
// });

// Скопировать адрес инсты
new ClipboardJS('.portfolio__insta-copy');

document.querySelector('.portfolio__insta-copy').addEventListener('click', function(e) {
  this.classList.add('_click');
  setTimeout(() => {
    this.classList.remove('_click');
  }, 1000);
});

// const copyInstagramLink = document.querySelector('.portfolio__insta-copy'),
//       instagramLink = document.querySelector('.portfolio__insta-text');

// copyInstagramLink.addEventListener('click', function(e) {
//   // instagramLink.select();
//   instagramLink.nodeValue.execCommand('copy');
//   e.preventDefault();
// });

// const copyEmailBtn = document.querySelector('.portfolio__insta-copy');  
// copyEmailBtn.addEventListener('click', function(event) {  
//   // Выборка ссылки с электронной почтой 
//   const emailLink = document.querySelector('.portfolio__insta-text');  
//   const range = document.createRange();  
//   range.selectNode(emailLink);  
//   window.getSelection().addRange(range);  
//   event.preventDefault();
    
//   try {  
//     // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
//     const successful = document.execCommand('copy');  
//     const msg = successful ? 'successful' : 'unsuccessful';  
//     console.log('Copy email command was ' + msg);  
//   } catch(err) {  
//     console.log('Oops, unable to copy');  
//   }  
    
//   // Снятие выделения - ВНИМАНИЕ: вы должны использовать
//   // removeRange(range) когда это возможно
//   window.getSelection().removeAllRanges();  
// });

// прикрепляю к элементу с классом _selected красную линию
const currentSelectedLink = document.querySelector('.portfolio-moving-point._selected'),
      linkIndicator = document.querySelector('.portfolio-moving-indicator'),
      linkItems = document.querySelectorAll('.portfolio-moving-point');

      // console.log(currentSelectedLink)
// linkIndicator.style.height = currentSelectedLink[0].clientHeight + 'px';
// linkIndicator.style.top = currentSelectedLink[0].offsetTop + 'px';

// ФИКСАЦИЯ ФИЛЬТРА В РАЗДЕЛЕ ПОРТФОЛИО
(function(){
  let a = document.querySelector('.portfolio-moving'), b = null, P = 16;
  window.addEventListener('scroll', Ascroll, false);
  document.body.addEventListener('scroll', Ascroll, false);
  function Ascroll() {
    if (b == null) {
      let Sa = getComputedStyle(a, ''), s = '';
      for (let i = 0; i < Sa.length; i++) {
        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
          s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
        }
      }
      b = document.createElement('div');
      b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
      a.insertBefore(b, a.firstChild);
      const l = a.childNodes.length;
      for (let i = 1; i < l; i++) {
        b.appendChild(a.childNodes[1]);
      }
      a.style.height = b.getBoundingClientRect().height + 'px';
      a.style.padding = '0';
      a.style.border = '0';
    }
    const Ra = a.getBoundingClientRect(),
        R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.portfolio-images').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
    if ((Ra.top - P) <= 0) {
      if ((Ra.top - P) <= R) {
        b.className = 'stop';
        b.style.top = - R +'px';
      } else {
        b.className = 'sticky';
        b.style.top = P + 'px';
      }
    } else {
      b.className = '';
      b.style.top = '';
    }
    window.addEventListener('resize', function() {
      a.children[0].style.width = getComputedStyle(a, '').width;
    }, false);
  }
  })();
















});