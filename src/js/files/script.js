// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Отримання поточного URL
const currentUrl = window.location.pathname;
    
// Отримання всіх посилань меню
const menuLinks = document.querySelectorAll('.link-menu');

// Прохід по кожному посиланню і додавання класу 'active' до відповідного пункту
menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentUrl) {
        link.classList.add('active');
    }
});

// ---------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let headerHeight = header.clientHeight;

    const handleScroll = () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            header.style.top = `-${headerHeight}px`;
        } else if (scrollTop === 0) {
            header.style.backgroundColor = 'transparent';
        } else {
            header.style.top = '0';
            header.style.backgroundColor = '#ECF0F5';
        }

        lastScrollTop = scrollTop;
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        },
        { rootMargin: `-${headerHeight}px 0px 0px 0px` }
    );

    const checkWidth = () => {
        if (window.innerWidth <= 767.98) {
            window.addEventListener('scroll', handleScroll);
            observer.observe(header);
        } else {
            window.removeEventListener('scroll', handleScroll);
            header.style.top = '0';
            observer.unobserve(header);
            header.classList.remove('scrolled');
        }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
});

// Button Up

let buttonUp = document.querySelector('.button-up');
let isScrolling;

buttonUp.addEventListener('mouseenter', function() {
    clearTimeout(isScrolling);
    buttonUp.style.opacity = 1;
    buttonUp.style.bottom = '50px';
});

buttonUp.addEventListener('mouseleave', function() {
    isScrolling = setTimeout(function() {
        buttonUp.style.opacity = 0;
        buttonUp.style.bottom = '-100px';
    }, 5000);
});

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        buttonUp.style.opacity = 1;
        buttonUp.style.bottom = '50px';
    } else {
        buttonUp.style.opacity = 0;
        buttonUp.style.bottom = '-100px';
    }   

    clearTimeout(isScrolling);

    isScrolling = setTimeout(function() {
        buttonUp.style.opacity = 0;
        buttonUp.style.bottom = '-100px';
    }, 5000);
});

// --------------------------------------------------------------------------

function processTextBlock(textBlock) {

    textBlock.setAttribute("data-original-text", textBlock.textContent);

    const dataChar = textBlock.dataset.char.split(',').map(Number);
    const content = textBlock.textContent;
    textBlock.innerHTML = '';

    content.split('').forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;

        if (char === ' ') {
            const space = document.createTextNode(' ');
            textBlock.appendChild(space);
        } else {
            textBlock.appendChild(span);
            applyAnimation(span, dataChar, i);
        }
    });
}

function applyAnimation(span, dataChar, i) {
        if (dataChar.length > 0) {
            const delayIncrement = dataChar[0] || 1000;
            const delay = delayIncrement + i * (dataChar[1] || 50);
    
            span.style.opacity = "0";
            span.style.transform = "scale(0)";
            span.style.transformOrigin = "right top";
            span.style.transition = `opacity 500ms ease-in-out ${delay}ms`;
    
            setTimeout(() => {
                span.style.opacity = "1";
                span.style.transform = "scale(1)";
                span.style.transition = `transform 300ms ease-in-out 0ms`;
            }, delay);
        }
    }


function restoreOriginalText(textBlock) {
    const originalText = textBlock.getAttribute("data-original-text");

    setTimeout(() => {
        textBlock.innerHTML = originalText;
    }, 3000);
}

document.querySelectorAll("[data-char]").forEach(processTextBlock);
document.querySelectorAll("[data-char]").forEach(restoreOriginalText);