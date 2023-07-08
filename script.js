'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const openModalWindow = function () {
  
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow));

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML ='We use cookies to improve the performance of the site. By staying on our site, you agree to the terms use of cookies. <button class="btn btn--close-cookie">Ok</button>';
// const header = document.querySelector('.header');
// header.prepend(message);

// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   message.remove();
// });
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 10 + 'px';



btnScrollTo.addEventListener('click', function(e){

  const section1Coords = section1.getBoundingClientRect(); //return position of the element

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset, 
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({behavior: 'smooth'});

});

// smooth page navigation

// document.querySelectorAll('.nav__link').forEach(function(htmlElement){
//   htmlElement.addEventListener('click', function(e){
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({behavior: 'smooth'});
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({behavior: 'smooth'});
  }
});

//Активные кнопки


tabContainer.addEventListener('click', function(e){
  const clickedButton = e.target.closest('.operations__tab');
  if(!clickedButton) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  //Активный контент
  tabContents.forEach(content => content.classList.remove('operations__content--active'));
  document
  .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
  .classList.add('operations__content--active');

});

// Анимация потускнения на панели навигации

const navLinksHoverAnimation = function(e){
  if(e.target.classList.contains('nav__link')){
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if(el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
}

nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));


//Sticky navigation
// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e){
//   if(this.window.scrollY > section1Coords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('stiky');
//   }
// });


//Sticky navigationt - Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav =function(entries){
  const entry = entries[0];
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(
  getStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
headerObserver.observe(header);

//Появления частей сайта

const allSections = document.querySelectorAll('.section');

const appearanceSection = function(entries, observer){
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.10,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading

const loadImg = function(entries, observer){
  const entry = entries[0];
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
 
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImagesObserver = new IntersectionObserver(loadImg, 
  {
    root: null,
    threshold: 0.7,
  });

lazyImages.forEach(img => lazyImagesObserver.observe(img));

//Sliders
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelectorAll('.dots');

const slides = document.querySelectorAll('.slide');
let currentslide = 0;
let slidesNumber = slides.length;

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

const nextSlide = function(){
  if(currentslide === slidesNumber - 1){
    currentslide = 0;
  }
  else{
  currentslide++;
  }
  moveToSlide(currentslide);
}

const previousSlide = function(){
  if(currentslide === 0){
    currentslide = slidesNumber - 1;
  }
  else{
  currentslide--;
  }
  moveToSlide(currentslide);
}

slides.forEach((slide, index) => slide.style.transform = `translateX(${index * 100}%)`);

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') previousSlide();
});


//Lifecycle DOM Events



