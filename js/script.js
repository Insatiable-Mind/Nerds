'use strict';

(function() {
  /* Changing attr of a contact form for html linter */
  document.querySelector("#form").setAttribute("action", "");

  /*** CONTACT FORM ***/
  let contactButton = document.querySelector('.map__contacts-button');
  contactButton.addEventListener('click', openForm);

  let contactForm = document.querySelector('.contact-form');
  let closeButton = contactForm.querySelector('.contact-form__close-button');
  closeButton.addEventListener('click', closeForm);

  let contactFormOverlay = document.querySelector('.contact-form__overlay');
  contactFormOverlay.addEventListener('click', closeForm);

  function openForm(e) {
    let nameInput = contactForm.querySelector('input[name="name"]');

    e.preventDefault();

    contactForm.classList.add('contact-form_open');
    contactFormOverlay.classList.add('contact-form__overlay_open');
    nameInput.focus();
  }

  function closeForm() {
    contactForm.classList.remove('contact-form_open');
    contactFormOverlay.classList.remove('contact-form__overlay_open');
  }


  /*** SLIDER ***/
  let sliderList = document.querySelector('.slider__list');
  let sliderItem = sliderList.querySelectorAll('.slider__item');
  let slideWidth = sliderItem[0].offsetWidth;
  let slideMargin = getComputedStyle(sliderItem[0]).marginRight;
  let sliderSwitch = document.querySelectorAll('.slider__switch');

  if (sliderItem.length !== 0) {
    slideMargin = +slideMargin.replace('px', '');

    sliderSwitch[0].addEventListener('click', function() {
      showSlide(0);
    });
    sliderSwitch[1].addEventListener('click', function() {
      showSlide(1);
    });
    sliderSwitch[2].addEventListener('click', function() {
      showSlide(2);
    });

    let showSlideshow = setInterval(function() {
      changeSlide(detectSlideNumber());
    }, 8000); 

    sliderList.addEventListener('mouseover', function() {
      clearInterval(showSlideshow);
    });

    sliderList.addEventListener('mouseout', function() {
      showSlideshow = setInterval(function() {
        changeSlide(detectSlideNumber());
      }, 8000); 
    });
  }

  function findSlidePosition(slideNumber, slideWidth) {
    return 0 - slideNumber * (slideWidth + slideMargin);
  }

  function showSlide(slideNumber) {
    let slidePosition = findSlidePosition(slideNumber, slideWidth);
    let slideSum = sliderItem.length;

    sliderList.style.left = slidePosition + 'px';
  }

  function changeSlide(slideNumber) {
    let nextSlidePosition = findSlidePosition(slideNumber + 1, slideWidth);

    sliderSwitch[slideNumber].checked = false;

    let slideSum = sliderItem.length;

    if (slideNumber === slideSum - 1) {
      nextSlidePosition = 0;
      sliderSwitch[0].checked = true;
    } else {
      sliderSwitch[slideNumber + 1].checked = true;
    }

    sliderList.style.left = nextSlidePosition + 'px';
  }

  function detectSlideNumber() {
    let slidePosition = sliderList.style.left.replace('px', '');

    return (0 - slidePosition) / (slideWidth + slideMargin);
  }


  /*** CATALOG: SORTING ARROWS ***/
  let arrowUp = document.querySelector('.catalog__sorting-arrow_up');
  let arrowDown = document.querySelector('.catalog__sorting-arrow_down');

  if (arrowUp !== null && arrowDown !== null) {
    arrowUp.addEventListener('click', makeArrowActive);
    arrowDown.addEventListener('click', makeArrowActive);
  }

  function makeArrowActive(e) {
    e.preventDefault();

    if (arrowUp.classList.contains('catalog__sorting-arrow_active')) {
      arrowUp.classList.remove('catalog__sorting-arrow_active');
      arrowDown.classList.add('catalog__sorting-arrow_active');
    } else if (arrowDown.classList.contains('catalog__sorting-arrow_active')) {
      arrowDown.classList.remove('catalog__sorting-arrow_active');
      arrowUp.classList.add('catalog__sorting-arrow_active');
    } 
  }
}());


/*** YANDEX MAP ***/
ymaps.ready(init);

function init(){
  let myMap;
  let myPlacemark;

  myMap = new ymaps.Map('map', {
    center: [59.939212, 30.319986],
    zoom: 17,
    controls: []
  });

  myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, { 
    iconLayout: 'default#image',
    iconImageHref: 'img/all/map/map-logomarker.png',
    iconImageSize: [231, 190],
    iconImageOffset: [-45, -200],
  });

  myMap.geoObjects.add(myPlacemark);
}
