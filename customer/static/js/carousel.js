//WRAPPER CAROUSEL NO TOCAR
const body = document.querySelector('body'),
    home = document.querySelector('.home'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    homeToggle = body.querySelector('#hola'),
    modeSwitch = body.querySelector(".toggle-switch"),
    sidebarid = document.querySelector('#sidebar'),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    home.classList.toggle("nonclick");
})

homeToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    home.classList.toggle('nonclick');
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

window.addEventListener("DOMContentLoaded", async (e) => {
    const wrapper = document.querySelectorAll(".wrapper");
    wrapper.forEach((doc) => {
        const carousel = doc.querySelector(".carousel");
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const arrowBtns = doc.querySelectorAll("i");
        const carouselChildrens = [...carousel.children];

        let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        arrowBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
            });
        });
    })

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        clearTimeout(timeoutId);
        if (!doc.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    doc.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    doc.addEventListener("mouseleave", autoPlay);
})
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let user = getCookie("user");
if (user == "") {
    $(window).on('load', function () {
        $('#modal').modal('show');
    });
}