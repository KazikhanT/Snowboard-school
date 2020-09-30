class Slide {
  constructor(el, dot) {
    this.el = el;
    this.dot = dot;
  }

  toggle() {
    this.el.classList.toggle('slider__slide_active');
    this.dot.classList.toggle('slider__dot_active');
  }
}


class Slider {
  constructor() {
    this.slides = [];
    this.currentSlide = 0;
  }

  init() {
    let allSlides = document.querySelectorAll('.slider__slide');
    let allDots = document.querySelectorAll('.slider__dot');

    if (allSlides.length !== allDots.length) {
      throw new Error('количество slide и dot не равны');
    }

    for (let i = 0; i < allSlides.length; ++i) {
      const newSlide = new Slide(allSlides[i], allDots[i]);
      this.slides.push(newSlide);
    }
  }

  _toggleCurrentSlide() {
    this.slides[this.currentSlide].toggle();
  }

  showNextSlide() {
    this._toggleCurrentSlide();

    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }

    this._toggleCurrentSlide();
  }

  showPrevSlide() {
    this._toggleCurrentSlide();

    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }

    this._toggleCurrentSlide();
  }

  _swipe(touchStart, touchEnd) {
    const minimumSwipeLength = 120;
    const swipeLength = touchStart - touchEnd;

    if (touchStart > touchEnd && swipeLength > minimumSwipeLength) {
      this.showNextSlide();
    }
    else if (touchStart < touchEnd && swipeLength < -minimumSwipeLength) {
      this.showPrevSlide();
    }
  }

  setTouchListener() {
    for (let slide of this.slides) {
      let touchStart = 0
      let touchEnd = 0

      slide.el.addEventListener('touchstart', event => {
        touchStart = event.changedTouches[0].pageX;
      });

      slide.el.addEventListener('touchend', event => {
        touchEnd = event.changedTouches[0].pageX;

        this._swipe(touchStart, touchEnd);
      });
    }
  }

  setDotsListener() {
    for (let i = 0; i < this.slides.length; ++i) {
      this.slides[i].dot.addEventListener('click', () => {
        this._toggleCurrentSlide();
        this.currentSlide = i;
        this._toggleCurrentSlide();
      });
    }
  }
}


export default function() {
  let slider = new Slider();
  slider.init();
  slider.setTouchListener();
  slider.setDotsListener();
}