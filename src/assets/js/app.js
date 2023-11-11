document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    }

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('header__nav--active');
      this.button.classList.remove('header__menu-button--active');
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };

      if (xl.matches) {
        document.documentElement.style.overflow = 'hidden';
      }
    }

    enableScroll() { 
      document.documentElement.style.overflow = null;
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector('header');

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 300);
    document.addEventListener('scroll', handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  }

  if (xl.matches) {
    scrollAdd();
    document.removeEventListener('scroll', scrollHeader);
  } else {
    document.addEventListener('scroll', scrollHeader);
    scrollRemove();
  }

  xl.addEventListener('change', () => {
    if (xl.matches) {
      document.removeEventListener('scroll', scrollHeader);
      scrollAdd();
    } else {
      document.addEventListener('scroll', scrollHeader);
      scrollRemove();
    }
  });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    document.documentElement.classList.add('scroll-disabled');
    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.classList.remove('scroll-disabled');
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  var prevScrollpos2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function headerActive() {
    var currentScrollPos2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos2 < 0) {
      currentScrollPos2 = 0;
      prevScrollpos2 = 0;
    };
    if (prevScrollpos2 < 0) {
      prevScrollpos2 = 0;
      currentScrollPos2 = 0;
    };
    const num = xl.matches ? 10 : 50;
    if (currentScrollPos2 > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    };

    prevScrollpos2 = currentScrollPos2;
  }

  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };
    // const num = xl.matches ? 10 : 100;
    // if (currentScrollPos > num) {
    //   header.classList.add('header--active');
    // } else {
    //   header.classList.remove('header--active');
    // };
    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else {
      header.classList.add('out');
    };
    prevScrollpos = currentScrollPos;
  };

  function initHeader() {
    document.addEventListener('scroll', headerActive)
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const num = xl.matches ? 10 : 50;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  }

  initHeader();

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2);
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  function leadingZero(num, size) {
    var s = "000000000" + num;
    return s.substring(s.length - size);
  }

  const mainSwipers = document.querySelectorAll('.main-swiper');
  if (mainSwipers.length) {
    mainSwipers.forEach(swiper => {
      const next = swiper.parentElement.querySelector('.next');
      const prev = swiper.parentElement.querySelector('.prev');

      const mainswiperslides = swiper.querySelectorAll('.swiper-slide');
      if (mainswiperslides.length) {
        mainswiperslides.forEach((el, index) => {
          el.setAttribute('data-number', leadingZero(index + 1, 2))
        })
        if (mainswiperslides.length > 1) {
          new Swiper(swiper, {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 500,
            grabCursor: true,
            navigation: {
              nextEl: next,
              prevEl: prev,
            },
          })
        }
      }

    })
  }

  const gallerySwipers = document.querySelectorAll('.gallery-swiper');
  if (gallerySwipers.length) {
    gallerySwipers.forEach(swiper => {
      const next = swiper.parentElement.parentElement.querySelector('.next');
      const prev = swiper.parentElement.parentElement.querySelector('.prev');

      const mainswiperslides = swiper.querySelectorAll('.swiper-slide');
      if (mainswiperslides.length) {
        if (mainswiperslides.length > 1) {
          new Swiper(swiper, {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 500,
            grabCursor: true,
            watchSlidesProgress: true,
            navigation: {
              nextEl: next,
              prevEl: prev,
            },
            on: {
              reachEnd: function () {
                const visibleSlides = swiper.querySelectorAll('.swiper-slide-visible');
                let slidesWidth = 0;
                if (visibleSlides.length > 1) {
                  visibleSlides.forEach(el => {
                    slidesWidth += el.getBoundingClientRect().width;
                  })

                  if (slidesWidth > this.size) {
                    const lastSlide = visibleSlides[visibleSlides.length - 1];
                    lastSlide.classList.add('slide-hide');
                  }
                }

              },
              afterInit: function () {
                const visibleSlides = swiper.querySelectorAll('.swiper-slide-visible');
                let slidesWidth = 0;
                if (visibleSlides.length > 1) {
                  visibleSlides.forEach(el => {
                    slidesWidth += el.getBoundingClientRect().width;
                  })

                  if (slidesWidth > this.size) {
                    const lastSlide = visibleSlides[visibleSlides.length - 1];
                    lastSlide.classList.add('slide-hide');
                  }
                }

              },
              transitionEnd: function () {
                const visibleSlides = swiper.querySelectorAll('.swiper-slide-visible');
                let slidesWidth = 0;
                if (visibleSlides.length > 1) {
                  visibleSlides.forEach(el => {
                    el.classList.remove('slide-hide')
                    slidesWidth += el.getBoundingClientRect().width;
                  })

                  if (slidesWidth > this.size) {
                    const lastSlide = visibleSlides[visibleSlides.length - 1];
                    lastSlide.classList.add('slide-hide');
                  }
                }

              },
              transitionStart: function () {
                const visibleSlides = swiper.querySelectorAll('.swiper-slide-visible');
                if (visibleSlides.length > 1) {
                  visibleSlides.forEach(el => {
                    el.classList.remove('slide-hide')
                  })
                }

              },
            }
          })
        }
      }

    })
  }

  const productSwiper = document.querySelector('.product-swiper');

  if (productSwiper) {
    const productColors = productSwiper.querySelectorAll('.product-color-wrapper');

    if (productColors.length) {
      const colorsList = document.querySelector('.product-colors-list');
      if (colorsList) {
        productColors.forEach(el => {
          const clone = el.cloneNode(true);
          colorsList.appendChild(clone);
        })
      }
    }
    const colorsList = document.querySelectorAll('.product-colors-list > *');
    const swiper = new Swiper(productSwiper, {
      spaceBetween: 0,
      speed: 500,
      loop: true,
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {

        prev: {
          // will set `translateZ(-200px)` on previous slides
          translate: [0, 0, -200],
          opacity: 0,
        },
        next: {
          // will set `translateX(100%)` on next slides
          translate: ['100%', 0, 0],
          opacity: 0,
        },
      },
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      on: {
        slideChange: function (swiper) {
          if (colorsList.length) {
            colorsList.forEach(el => {
              el.classList.remove('active');
            })
            colorsList[swiper.realIndex].classList.add('active');
          }
        },
      }
    })

    if (colorsList.length && swiper) {
      colorsList.forEach((el, index) => {
        el.addEventListener('click', function () {
          colorsList.forEach(color => {
            if (this !== color) {
              color.classList.remove('open-modal')
            }
          })
          this.classList.toggle('open-modal')
          if (this.classList.contains('open-modal')) {
              document.addEventListener('click', clickModalHandler);
          } else {
            document.removeEventListener('click', clickModalHandler);
          }

          swiper.slideToLoop(index, 800);
        })
      })
    }

    function clickModalHandler () {
      if (!event.target.closest('.open-modal')) {
        const modals = document.querySelectorAll('.open-modal')
        if (modals.length) {
          modals.forEach(el => el.classList.remove('open-modal'))
          document.removeEventListener('click', clickModalHandler);
        }
      }
    }

  }


  // const colorsButtons = document.querySelectorAll('.colors-list-item button[data-color-img]');

  // if (colorsButtons.length) {
  //   colorsButtons.forEach(button => {
  //     button.addEventListener('click', function () {
  //       if (this.classList.contains('active')) {
  //         return;
  //       }
  //       const parent = this.closest('.presentation-item, .design-block');
  //       if (parent) {
  //         const active = parent.querySelector('.active');
  //         if (active) {
  //           active.classList.remove('active');
  //         }
  //         this.classList.add('active');

  //         const img = parent.querySelector('.presentation-img img, .design-img img');
  //         if (img) {
  //           const copy = img.cloneNode(true);
  //           copy.src = this.dataset.colorImg;
  //           img.parentElement.appendChild(copy);
  //           img.remove();
  //         }
  //       }
  //     })
  //   })
  // }

  document.addEventListener('click', function () {
    const button = event.target.closest('button[data-color-img]')
    if (button) {
      if (button.classList.contains('active')) {
        return;
      }
      const parent = button.closest('.presentation-item, .design-block');
      if (parent) {
        const active = parent.querySelector('.active');
        if (active) {
          active.classList.remove('active');
        }
        button.classList.add('active');

        const img = parent.querySelector('.presentation-img img, .design-img img');
        if (img) {
          const copy = img.cloneNode(true);
          copy.src = button.dataset.colorImg;
          img.parentElement.appendChild(copy);
          img.remove();
        }
      }
    }
  })

  const firstButtons = document.querySelectorAll('.colors-list-item:first-child button[data-color-img]');

  if (firstButtons.length) {
    firstButtons.forEach(el => {
      el.click();
    })
  }

  const filterButtons = document.querySelectorAll('.filter-button, .footer-search > button');

  if (filterButtons.length) {
    filterButtons.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('active');
      })
    })
  }

  const filterButton = document.getElementById('filter-toggle');
  const filter = document.getElementById('filter');
  const filterClose = document.getElementById('filter-close');

  function closeFilterHandler() {
    if (!event.target.closest('#filter') && !event.target.closest('#filter-toggle')) {
      filter.classList.remove('active');
    }
  }

  if (filterButton && filter) {
    filterButton.addEventListener('click', () => {
      if (filter.classList.contains('active')) {
        filter.classList.remove('active');
        document.removeEventListener('click', closeFilterHandler);
        return;
      }
      filter.classList.add('active');
      document.addEventListener('click', closeFilterHandler);
    })
  }

  if (filterClose && filter) {
    filterClose.addEventListener('click', () => {
      filter.classList.remove('active');
      document.removeEventListener('click', closeFilterHandler);
    })
  }

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10);
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null);
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition);
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal');

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this);
        }
      });
      const closeButton = el.querySelectorAll('.close-button');
      if (closeButton.length) {
        closeButton.forEach(button => {
          button.addEventListener('click', () => {
            modalHandler.apply(el);
          });
        })
      }
    });
  }

  const buttonsModal = document.querySelectorAll('[data-modal]');

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  if (buttonsModal.length) {
    buttonsModal.forEach(el => el.addEventListener('click', modalHandler));
  }

  const inputs = document.querySelectorAll('.page-input');

  if (inputs.length) {
    inputs.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.remove('error');
      })
    })
  }

  const accordionWrappers = document.querySelectorAll('[data-lines]');

  if (accordionWrappers.length) {
    accordionWrappers.forEach(el => {
      const numberOfLines = +el.dataset.lines;
      const slides = el.querySelectorAll('li');

      if (numberOfLines) {
        slides.forEach((el, index) => {
          if (index + 1 > numberOfLines) {
            el.classList.add('hide');
          }
        })
      }
    })
  }

  const accordionButtons = document.querySelectorAll('.accordion-button');

  if (accordionButtons.length) {
    accordionButtons.forEach(el => {
      el.addEventListener('click', function () {
        let showText = this.dataset.show;
        if (this.previousElementSibling) {
          this.previousElementSibling.classList.toggle('active');
          this.classList.toggle('active');
          if (showText) {
            this.dataset.show = this.innerHTML;
            this.innerHTML = showText;
          }
          if (!this.classList.contains('active')) {

            const header = document.querySelector('header');
            let headerH = null;
            if (header) {
              headerH = header.getBoundingClientRect().height;
            }
            const yOffset = headerH ? -headerH : -200;
            const y = this.previousElementSibling.parentElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({top: y, behavior: 'auto'});

          }
        }
      })
    })
  }
});











