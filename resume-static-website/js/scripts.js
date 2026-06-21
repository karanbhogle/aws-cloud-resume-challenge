/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const scrollContainer = document.querySelector('.content-scrollable');
    const sideNav = document.querySelector('#sideNav');
    const wrapper = document.querySelector('.resume-main-wrapper');

    // Manage layout active states based on scroll position (About vs other sections)
    function updateLayoutState() {
        if (!wrapper) return;

        let isAboutActive = false;
        if (window.innerWidth >= 1200) {
            // On desktop, check the scroll offset of the left visual columns vs right content scrollable
            isAboutActive = !scrollContainer || scrollContainer.scrollTop < 80;
        } else {
            // On mobile, check window scroll position
            isAboutActive = window.scrollY < 250;
        }

        if (isAboutActive) {
            wrapper.classList.add('about-active');
        } else {
            wrapper.classList.remove('about-active');
        }

        // Manage active layout states for the Connect page
        let isConnectActive = false;
        if (window.innerWidth >= 1200 && scrollContainer) {
            // Check if scroll has reached near the bottom of the container
            isConnectActive = (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 60);
        } else {
            // On mobile, check window scroll position near the bottom of the page
            isConnectActive = (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80);
        }

        const activeLink = sideNav ? sideNav.querySelector('.nav-link.active') : null;
        if (activeLink && activeLink.getAttribute('href') === '#connect') {
            isConnectActive = true;
        }
        if (window.connectAnimationTimeout) {
            clearTimeout(window.connectAnimationTimeout);
        }

        if (isConnectActive) {
            window.connectAnimationTimeout = setTimeout(() => {
                // Temporarily remove the active class to measure raw un-transformed coordinates
                wrapper.classList.remove('connect-active');
                
                // Calculate dynamic animation trajectories
                const sourceIcons = document.querySelectorAll('.profile-card-socials li');
                const targetBoxes = document.querySelectorAll('.connect-list li.card1');

                if (sourceIcons.length === targetBoxes.length) {
                    sourceIcons.forEach((icon, index) => {
                        const target = targetBoxes[index];
                        const iconRect = icon.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();

                        if (iconRect.width > 0 && targetRect.width > 0) {
                            const deltaX = targetRect.left + (targetRect.width / 2) - (iconRect.left + (iconRect.width / 2));
                            const deltaY = targetRect.top + (targetRect.height / 2) - (iconRect.top + (iconRect.height / 2));
                            icon.style.setProperty('--target-x', `${deltaX}px`);
                            icon.style.setProperty('--target-y', `${deltaY}px`);
                        }
                    });
                }
                
                // Add the class back immediately to trigger/update the animation smoothly
                wrapper.classList.add('connect-active');
            }, 150);
        } else {
            wrapper.classList.remove('connect-active');
        }
    }

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateLayoutState);
    }
    window.addEventListener('scroll', updateLayoutState);
    window.addEventListener('resize', updateLayoutState);

    // Initial check (slightly deferred to ensure scroll position state loads)
    setTimeout(updateLayoutState, 50);



    // Activate Bootstrap scrollspy on the scrollable container element
    if (scrollContainer && sideNav) {
        new bootstrap.ScrollSpy(scrollContainer, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Smooth scroll navigation links
    const scrollLinks = document.querySelectorAll('.js-scroll-trigger');
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement && scrollContainer) {
                // Calculate the top offset relative to the scroll container
                const containerTop = scrollContainer.getBoundingClientRect().top;
                const elementTop = targetElement.getBoundingClientRect().top;
                const relativeTop = elementTop - containerTop + scrollContainer.scrollTop;

                // On desktop, scroll inside the scrollable container
                if (window.innerWidth >= 1200) {
                    scrollContainer.scrollTo({
                        top: relativeTop,
                        behavior: 'smooth'
                    });
                } else {
                    // On mobile/tablet, scroll the window itself
                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.scrollY - 70, // offset for top navbar
                        behavior: 'smooth'
                    });
                }

                // Update active class manually to guarantee immediate visual feedback
                scrollLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');

                // Trigger immediate layout state update on click
                setTimeout(updateLayoutState, 10);
            }
        });
    });

    // Intersection Observer for scroll reveal animations inside the container
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve element to keep the animation state permanent after first view
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Observe with root set to scrollContainer on desktop for proper visibility detection
            root: window.innerWidth >= 1200 ? scrollContainer : null,
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // Autoscroll logic for certificates/badges (Marquee)
    const marquee = document.querySelector('.certificates-frame .social-icons');
    if (marquee) {
        let step = 1;
        const delay = 35;
        let direction = 1; // 1 for scrolling right, -1 for scrolling left

        function autoScroll() {
            const maxScrollLeft = marquee.scrollWidth - marquee.clientWidth;
            if (maxScrollLeft <= 0) return;

            marquee.scrollLeft += step * direction;

            // Reverse direction at endpoints to scroll back and forth
            if (marquee.scrollLeft >= maxScrollLeft - 1) {
                direction = -1;
            } else if (marquee.scrollLeft <= 1) {
                direction = 1;
            }
        }

        let scrollInterval = setInterval(autoScroll, delay);

        // Pause scrolling on mouse enter and resume on leave
        marquee.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        marquee.addEventListener('mouseleave', () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(autoScroll, delay);
        });
    }

});

// Visitor counter functionality
const profileVisitsEl = document.getElementById("profileVisits");
if (profileVisitsEl) {
    profileVisitsEl.innerHTML = "---";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            profileVisitsEl.innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "https://2ihnq4vblccgf7mwu5ibcm3cdi0chhoy.lambda-url.us-east-1.on.aws/", true);
    xhttp.send();
}