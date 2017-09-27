'use strict';

(function() {
  /* Changing attr of a contact form for html linter */
  document.querySelector("#form").setAttribute("action", "");

  /*** CONTACT FORM ***/
  var contactButton = document.querySelector('.map__contacts-button'),
    contactForm = document.querySelector('.contact-form'),
    closeButton = contactForm.querySelector('.contact-form__close-button'),
    contactFormOverlay = document.querySelector('.contact-form__overlay');

  contactButton.addEventListener('click', openForm);
  closeButton.addEventListener('click', closeForm);
  contactFormOverlay.addEventListener('click', closeForm);

  function openForm(e) {
    var nameInput = contactForm.querySelector('input[name="name"]');

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
  var sliderList = document.querySelector('.slider__list'),
      sliderItem = document.querySelectorAll('.slider__item');

  if (sliderItem.length !== 0) {
    var slideWidth = sliderItem[0].offsetWidth,
      sliderSwitch = document.querySelectorAll('.slider__switch'),
      slideMargin = getComputedStyle(sliderItem[0]).marginRight;

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

    var showSlideshow = setInterval(function() {
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
    var slidePosition = findSlidePosition(slideNumber, slideWidth),
        slideSum = sliderItem.length;

    sliderList.style.left = slidePosition + 'px';
  }

  function changeSlide(slideNumber) {
    var nextSlidePosition = findSlidePosition(slideNumber + 1, slideWidth),
        slideSum = sliderItem.length;

    sliderSwitch[slideNumber].checked = false;

    if (slideNumber === slideSum - 1) {
      nextSlidePosition = 0;
      sliderSwitch[0].checked = true;
    } else {
      sliderSwitch[slideNumber + 1].checked = true;
    }

    sliderList.style.left = nextSlidePosition + 'px';
  }

  function detectSlideNumber() {
    var slidePosition = sliderList.style.left.replace('px', '');

    return (0 - slidePosition) / (slideWidth + slideMargin);
  }


  /*** CATALOG: SORTING ARROWS ***/
  var arrowUp = document.querySelector('.catalog__sorting-arrow_up'),
      arrowDown = document.querySelector('.catalog__sorting-arrow_down');

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
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map('map', {
      center: [59.939212, 30.319986],
      zoom: 17,
      controls: []
    });

    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, { 
      iconLayout: 'default#image',
      iconImageHref: '../img/all/map/map-logomarker.png',
      iconImageSize: [231, 190],
      iconImageOffset: [-45, -200],
    });

    myMap.geoObjects.add(myPlacemark);
}
