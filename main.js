document.addEventListener('DOMContentLoaded',function (){

    const titles = [
        { num: 1, title: "Косметология: уходы, инъекции, лифтинг", img: "./assets/img/slide1-thumb.webp" },
        { num: 2, title: "SPA и европейские массажи", img: "./assets/img/slide2-thumb.webp" },
        { num: 3, title: "Коррекция фигуры и силуэта", img: "./assets/img/slide3-thumb.webp" },
        { num: 4, title: "Косметология: уходы, инъекции, лифтинг", img: "./assets/img/slide1-thumb.webp" },
        { num: 5, title: "SPA и европейские массажи", img: "./assets/img/slide2-thumb.webp" },
        { num: 6, title: "Коррекция фигуры и силуэта", img: "./assets/img/slide3-thumb.webp" }
    ];

    const autoplayDelay = 5000;

    const heroSwiper = new Swiper('.hero__slider', {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: autoplayDelay,
            disableOnInteraction: false,
            waitForTransition: false
        },
        speed: 1000,
        lazy: true,
        pagination: {
            el: '.hero__pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `
        <div class="${className}">
          <div class="hero__pagination-left">
            <div class="hero__pagination-number">${titles[index].num}</div>
             <div class="hero__pagination-title">${titles[index].title}</div>
          </div>
          <div class="hero__pagination-right">
            <img src="${titles[index].img}" alt="" class="hero__pagination-img">
          </div>
          <div class="hero__pagination-line"><span></span></div>
        </div>
      `;
            }
        },
        on: {
            slideChangeTransitionStart: function () {
                document.querySelectorAll('.hero__pagination-line span').forEach(el => {
                    el.classList.remove('animate');
                    el.style.animationDuration = "";
                });

                const active = document.querySelector('.swiper-pagination-bullet-active .hero__pagination-line span');
                if (active) {
                    active.classList.add('animate');
                    active.style.animationDuration = autoplayDelay + "ms";
                }
            }
        }
    });

    window.addEventListener("load", () => {
        const first = document.querySelector('.swiper-pagination-bullet-active .hero__pagination-line span');
        if (first) {
            first.classList.add('animate');
            first.style.animationDuration = autoplayDelay + "ms";
        }
    });


    const burgers = document.querySelectorAll(".header__burger");
    const menu = document.querySelector(".menu--mobile");
    const main = document.querySelector("main");

    burgers.forEach((burger) => {
        burger.addEventListener("click", () => {
            menu.classList.toggle("menu--active");
            burger.classList.toggle("header__burger--active");
        });
    });

    document.querySelectorAll(".menu__toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".menu__item");
            const submenu = item.querySelector(".menu__submenu");

            document.querySelectorAll(".menu__item--has-submenu").forEach((el) => {
                if (el !== item) {
                    el.classList.remove("menu__item--open");
                    const sub = el.querySelector(".menu__submenu");
                    sub.style.maxHeight = null;
                }
            });

            if (item.classList.contains("menu__item--open")) {
                item.classList.remove("menu__item--open");
                submenu.style.maxHeight = null;
            } else {
                item.classList.add("menu__item--open");
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            }
        });
    });

    main.addEventListener("click", (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.remove("menu--active");
        }
    });

})