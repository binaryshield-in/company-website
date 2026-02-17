$(document).ready(function () {

    // ===== PRELOADER ROBUST FIX =====
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
        }
    }

    // Normal load
    window.addEventListener('load', function () {
        setTimeout(hidePreloader, 800); // 0.8 seconds delay
    });

    // Fallback: Force hide after 5 seconds to prevent getting stuck
    setTimeout(hidePreloader, 5000);

    // ===== MOBILE MENU =====
    $('#menu-btn').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Close menu via close button (✕)
    $('#nav-close').click(function () {
        $('#menu-btn').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    });

    // Close menu when clicking a nav link
    $('.navbar ul li a').click(function () {
        $('#menu-btn').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    });

    // Close menu when clicking overlay background
    $('.navbar').click(function (e) {
        if (e.target === this) {
            $('#menu-btn').removeClass('fa-times');
            $('.navbar').removeClass('nav-toggle');
        }
    });

    // ===== ELITE SCROLL REVEAL =====
    const eliteRevealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const eliteRevealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('premium-reveal-active');
                observer.unobserve(entry.target);
            }
        });
    };

    const eliteRevealObserver = new IntersectionObserver(eliteRevealCallback, eliteRevealOptions);
    document.querySelectorAll('.premium-reveal, .item, .resource-card, .team .card, .trust-card, .process-step, .client-stat').forEach(el => {
        eliteRevealObserver.observe(el);
    });

    // ===== HEADER SCROLL EFFECT =====
    $(window).on('load scroll', function () {
        $('#menu-btn').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        }
        else {
            $('.header').removeClass('scrolled');
        }
    });

    // ===== COUNTER ANIMATION (IntersectionObserver) =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.ceil(current);
                        }
                    }, duration / steps);
                });
            }
        });
    }, observerOptions);

    const countersSection = document.querySelector('.counters');
    if (countersSection) {
        counterObserver.observe(countersSection);
    }

    // ===== OWL CAROUSEL =====
    (function ($) {
        "use strict";

        $(".clients-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } }
        });

        $(".testimonials-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 992: { items: 4 } }
        });

    })(jQuery);

    // ===== BACK TO TOP =====
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        }
    });
    $('.back-to-top').click(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return false;
    });

    // ===== FAQ ACCORDION =====
    $('.accordion-header').click(function () {
        const body = $(this).next('.accordion-body');
        const isOpen = body.is(':visible');

        // Close all other items
        $('.accordion .accordion-body').slideUp(500);
        $('.accordion-header').not(this).attr('aria-expanded', 'false');
        $('.accordion .accordion-header span').not($(this).children('span')).text('+');

        if (isOpen) {
            // If already open, close it
            body.slideUp(500);
            $(this).attr('aria-expanded', 'false');
            $(this).children('span').text('+');
        } else {
            // If closed, open it
            body.slideDown(500);
            $(this).attr('aria-expanded', 'true');
            $(this).children('span').text('-');
        }
    });

    // ===== CYBER PARTICLE CANVAS =====
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        // Reduce particles on mobile for performance
        const particleCount = window.innerWidth < 768 ? 35 : 80;
        const connectionDistance = 150;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`;
                ctx.fill();
                ctx.closePath();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawConnections();
            requestAnimationFrame(animate);
        }

        animate();
    }



});