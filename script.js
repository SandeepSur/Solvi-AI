document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // --- Particles Animation ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = 70;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // --- GSAP ScrollTrigger Animations for "Is This You" Section ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const container = document.querySelector('#is-this-you-scroll-section');
        const cards = gsap.utils.toArray(".problem-card");

        if (container && cards.length) {
            let mm = gsap.matchMedia();

            // 1. DESKTOP LAYOUT (width >= 1280px)
            mm.add("(min-width: 1280px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        pin: false,
                    }
                });

                const offsets = [
                    { x: -350, yStart: "65vh", yMid: "-15px", yEnd: "-75vh" },
                    { x: 350, yStart: "65vh", yMid: "15px", yEnd: "-75vh" },
                    { x: -350, yStart: "65vh", yMid: "15px", yEnd: "-75vh" },
                    { x: 350, yStart: "65vh", yMid: "-15px", yEnd: "-75vh" },
                ];

                cards.forEach((card, index) => {
                    const opt = offsets[index] || offsets[0];
                    tl.fromTo(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yStart,
                            opacity: 0,
                            
                        },
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 0.6,
                            ease: "none"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yEnd,
                            opacity: 0,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    );
                });
            });

            // 2. TABLET LAYOUT (768px <= width < 1280px)
            mm.add("(min-width: 768px) and (max-width: 1279px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        pin: false,
                    }
                });

                const offsets = [
                    { x: -250, yStart: "65vh", yMid: "-10px", yEnd: "-75vh" },
                    { x: 250, yStart: "65vh", yMid: "10px", yEnd: "-75vh" },
                    { x: -250, yStart: "65vh", yMid: "10px", yEnd: "-75vh" },
                    { x: 250, yStart: "65vh", yMid: "-10px", yEnd: "-75vh" },
                ];

                cards.forEach((card, index) => {
                    const opt = offsets[index] || offsets[0];
                    tl.fromTo(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yStart,
                            opacity: 0,
                            
                        },
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 0.6,
                            ease: "none"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yEnd,
                            opacity: 0,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    );
                });
            });

            // 3. MOBILE LAYOUT (width < 768px)
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        pin: false,
                    }
                });

                const offsets = [
                    { x: -16, yStart: "60vh", yMid: "-95px", yEnd: "-70vh" },
                    { x: 16, yStart: "60vh", yMid: "95px", yEnd: "-70vh" },
                    { x: -16, yStart: "60vh", yMid: "-95px", yEnd: "-70vh" },
                    { x: 16, yStart: "60vh", yMid: "95px", yEnd: "-70vh" },
                ];

                cards.forEach((card, index) => {
                    const opt = offsets[index] || offsets[0];
                    tl.fromTo(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yStart,
                            opacity: 0,
                            
                        },
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yMid,
                            opacity: 1,
                            
                            duration: 0.6,
                            ease: "none"
                        }
                    ).to(
                        card,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: opt.x,
                            y: opt.yEnd,
                            opacity: 0,
                            
                            duration: 1,
                            ease: "sine.inOut"
                        }
                    );
                });
            });
        }

        // --- How It Works Section Animations ---
        const hiwSection = document.querySelector('.how-it-works');
        if (hiwSection) {
            const tlHiw = gsap.timeline({
                scrollTrigger: {
                    trigger: hiwSection,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            // 1. Header fade in
            tlHiw.fromTo(".hiw-header", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // 2. Cards stagger in
            tlHiw.fromTo(".hiw-card", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
                "-=0.4"
            );

            // 3. Card 1 Mic Pop In
            tlHiw.fromTo(".hiw-mic-icon",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                "-=1.0"
            );

            // 4. Card 2 Progress Bars
            tlHiw.fromTo(".hiw-progress-fill", 
                { width: "0%" }, 
                { 
                    width: (i, el) => el.getAttribute('data-width'), 
                    duration: 1.5, 
                    ease: "power3.out",
                    stagger: 0.2
                },
                "-=0.6"
            );

            // 5. Card 3 Chart Reveal
            tlHiw.fromTo("#hiw-chart-rect", 
                { attr: { width: 0 } }, 
                { attr: { width: 200 }, duration: 1.5, ease: "power2.inOut" },
                "-=1.5"
            );
        }

        // --- Our Process Carousel Navigation ---
        const processCarousel = document.querySelector('.process-carousel');
        const navPrev = document.querySelector('.nav-prev');
        const navNext = document.querySelector('.nav-next');

        if (processCarousel && navPrev && navNext) {
            const scrollAmount = 380 + 24; // card width + gap
            
            
            navNext.addEventListener('click', () => {
                processCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        // --- Sample Videos GSAP Animations & Modal Logic ---
        const svSection = document.querySelector('.sample-videos-section');
        if (svSection) {
            const tlSv = gsap.timeline({
                scrollTrigger: {
                    trigger: svSection,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tlSv.fromTo([".sv-badge", ".sv-headline", ".sv-subtitle"],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            )
            .fromTo(".sv-strip-wrapper",
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "+=0.3"
            )
            .fromTo(".sv-cta-btn",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }
            ); // Removed delay to make it pop smoother

            // --- Advanced Video Player Modal Logic ---
            const playerModal = document.getElementById('svPlayerModal');
            const playerClose = document.getElementById('svPlayerClose');
            const iframeWrapper = document.getElementById('svPlayerIframeWrapper');
            const playerPrev = document.getElementById('svPlayerPrev');
            const playerNext = document.getElementById('svPlayerNext');
            const playerDotsContainer = document.getElementById('svPlayerDots');
            const playerCurrent = document.getElementById('svPlayerCurrent');
            const playerSpeciality = document.querySelector('.sv-player-speciality');
            const playerTopic = document.querySelector('.sv-player-topic');
            const playerContainer = document.querySelector('.sv-player-container');
            
            const allCards = document.querySelectorAll('.sv-card');
            const uniqueCards = Array.from(allCards).slice(0, 6);
            let currentIndex = 0;

            if (playerModal && iframeWrapper) {
                // Initialize dots
                uniqueCards.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'sv-player-dot-btn';
                    dot.addEventListener('click', () => loadVideo(index));
                    playerDotsContainer.appendChild(dot);
                });
                const dots = document.querySelectorAll('.sv-player-dot-btn');

                function loadVideo(index) {
                    currentIndex = index;
                    const card = uniqueCards[index];
                    const videoId = card.getAttribute('data-video-id');
                    const speciality = card.querySelector('.sv-speciality').innerText;
                    const topic = card.querySelector('.sv-topic').innerText;

                    // Update UI
                    playerSpeciality.innerText = speciality;
                    playerTopic.innerText = topic;
                    playerCurrent.innerText = index + 1;
                    
                    dots.forEach((dot, i) => {
                        if (i === index) dot.classList.add('active');
                        else dot.classList.remove('active');
                    });

                    // Load iframe
                    iframeWrapper.innerHTML = `<iframe width="100%" height="100%" style="border:0;" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                }

                function openModal(index) {
                    loadVideo(index);
                    playerModal.classList.add('active');
                    
                    // GSAP Open Animation
                    gsap.fromTo(playerContainer, 
                        { scale: 0.90, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
                    );
                }

                function closePlayerModal() {
                    playerModal.classList.remove('active');
                    setTimeout(() => {
                        iframeWrapper.innerHTML = '';
                    }, 300);
                }

                // Click events on cards
                allCards.forEach((card, i) => {
                    card.addEventListener('click', () => {
                        openModal(i % 6);
                    });
                });

                // Navigation
                playerPrev.addEventListener('click', () => {
                    const newIndex = currentIndex === 0 ? 5 : currentIndex - 1;
                    loadVideo(newIndex);
                });

                playerNext.addEventListener('click', () => {
                    const newIndex = currentIndex === 5 ? 0 : currentIndex + 1;
                    loadVideo(newIndex);
                });

                playerClose.addEventListener('click', closePlayerModal);

                playerModal.addEventListener('click', (e) => {
                    if (e.target === playerModal || e.target.classList.contains('sv-player-body')) {
                        closePlayerModal();
                    }
                });

                // Keyboard Nav
                document.addEventListener('keydown', (e) => {
                    if (!playerModal.classList.contains('active')) return;
                    
                    if (e.key === 'Escape') closePlayerModal();
                    if (e.key === 'ArrowLeft') playerPrev.click();
                    if (e.key === 'ArrowRight') playerNext.click();
                });
            }
        }


        // --- Why Choose Us Section GSAP Animations ---
        const wcuSection = document.querySelector('.why-choose-us');
        if (wcuSection) {
            // Section Entrance (Headline & Subtitle)
            gsap.fromTo([".wcu-headline", ".wcu-subtitle"],
                { y: 40, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1,
                    scrollTrigger: {
                        trigger: wcuSection,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Cards stagger in
            gsap.fromTo(".wcu-card",
                { y: 40, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".wcu-grid",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // --- What You Get Section GSAP Animations ---
        const wygSection = document.querySelector('.what-you-get');
        if (wygSection) {
            const wygCenter = document.querySelector('.wyg-center-image');
            const wygLines = document.querySelectorAll('.wyg-connection-line');
            const wygLeftCards = document.querySelectorAll('.wyg-column.left .wyg-card');
            const wygRightCards = document.querySelectorAll('.wyg-column.right .wyg-card');

            // Initial state for drawing lines
            wygLines.forEach(line => {
                line.style.animation = "none";
                line.style.strokeDasharray = "500";
                line.style.strokeDashoffset = "500";
            });

            const tlWyg = gsap.timeline({
                scrollTrigger: {
                    trigger: ".what-you-get",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                    onLeaveBack: () => {
                        wygLines.forEach(line => {
                            line.style.animation = "none";
                            line.style.strokeDasharray = "500";
                            line.style.strokeDashoffset = "500";
                        });
                    }
                }
            });

            tlWyg.fromTo(wygCenter,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" }
            )
            .to(wygLines,
                {
                    strokeDashoffset: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        wygLines.forEach(line => {
                            line.style.strokeDasharray = "8 8";
                            line.style.animation = "wygFlow 2s linear infinite";
                        });
                    }
                }
            )
            .fromTo(wygLeftCards,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 },
                "-=0.2"
            )
            .fromTo(wygRightCards,
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 },
                "<"
            );

            // Hover effects mapping line to card
            const wygCards = document.querySelectorAll('.wyg-card');
            wygCards.forEach((card, index) => {
                card.addEventListener('mouseenter', () => {
                    if (wygLines[index]) wygLines[index].classList.add('active-line');
                });
                card.addEventListener('mouseleave', () => {
                    if (wygLines[index]) wygLines[index].classList.remove('active-line');
                });
            });
        }

        // --- FAQ Section GSAP Animations & Accordion Logic ---
        const faqSection = document.querySelector('.faq-section');
        if (faqSection) {
            // GSAP Entrance
            gsap.fromTo([".faq-badge", ".faq-headline"],
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: faqSection,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems.length > 0) {
                gsap.fromTo(faqItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08,
                        scrollTrigger: {
                            trigger: faqSection,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Accordion Logic
                faqItems.forEach((item) => {
                    const answerWrapper = item.querySelector('.faq-answer-wrapper');
                    
                    // Initialize first item max-height if open on load
                    if (item.classList.contains('open') && answerWrapper) {
                        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
                    }

                    item.addEventListener('click', () => {
                        const isOpen = item.classList.contains('open');

                        // Close all
                        faqItems.forEach((otherItem) => {
                            otherItem.classList.remove('open');
                            const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
                            if (otherWrapper) {
                                otherWrapper.style.maxHeight = null;
                            }
                        });

                        // If it wasn't open before click, open it now
                        if (!isOpen) {
                            item.classList.add('open');
                            if (answerWrapper) {
                                answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
                            }
                        }
                    });
                });
            }
        }

        // --- Final CTA Section GSAP Animations ---
        const finalCta = document.querySelector('.final-cta-section');
        if (finalCta) {
            const tlFinal = gsap.timeline({
                scrollTrigger: {
                    trigger: finalCta,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tlFinal.fromTo(".final-cta-badge",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                0
            )
            .fromTo(".final-cta-headline",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.2
            )
            .fromTo(".final-cta-buttons",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                0.4
            );
        }
    }

    // --- Footer GSAP Animations ---
    const siteFooter = document.querySelector('.site-footer');
    if (siteFooter) {
        const footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: siteFooter,
                start: "top 80%",
            }
        });

        footerTl.fromTo(".footer-logo-icon",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo([".footer-tagline", ".footer-subtitle"],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
            "-=0.4"
        )
        .fromTo(".footer-social-btn",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
            "-=0.4"
        )
        .fromTo(".footer-bg-text",
            { opacity: 0 },
            { opacity: 0.04, duration: 1.2, ease: "power2.out" },
            0
        )
        .fromTo(".footer-bottom-bar",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            "-=0.2"
        );
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Footer Particles Animation ---
    const footerCanvas = document.getElementById('footer-particles');
    if (footerCanvas) {
        const ctx = footerCanvas.getContext('2d');
        let footerParticlesArray = [];

        function setFooterCanvasSize() {
            const rect = siteFooter.getBoundingClientRect();
            footerCanvas.width = rect.width;
            footerCanvas.height = rect.height;
        }
        
        window.addEventListener('resize', setFooterCanvasSize);
        if (siteFooter) setFooterCanvasSize();

        class FooterParticle {
            constructor() {
                this.x = Math.random() * footerCanvas.width;
                this.y = Math.random() * footerCanvas.height;
                this.size = Math.random() * 3 + 2; // 2px to 5px
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
                this.color = Math.random() > 0.5 ? 'rgba(124, 58, 237, 0.60)' : 'rgba(59, 130, 246, 0.50)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x < 0) this.x = footerCanvas.width;
                if (this.x > footerCanvas.width) this.x = 0;
                if (this.y < 0) this.y = footerCanvas.height;
                if (this.y > footerCanvas.height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initFooterParticles() {
            footerParticlesArray = [];
            for (let i = 0; i < 40; i++) {
                footerParticlesArray.push(new FooterParticle());
            }
        }

        function handleFooterParticles() {
            for (let i = 0; i < footerParticlesArray.length; i++) {
                footerParticlesArray[i].update();
                footerParticlesArray[i].draw();
                
                // Draw connecting lines
                for (let j = i; j < footerParticlesArray.length; j++) {
                    const dx = footerParticlesArray[i].x - footerParticlesArray[j].x;
                    const dy = footerParticlesArray[i].y - footerParticlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
                        ctx.lineWidth = 1;
                        ctx.moveTo(footerParticlesArray[i].x, footerParticlesArray[i].y);
                        ctx.lineTo(footerParticlesArray[j].x, footerParticlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateFooterParticles() {
            ctx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
            handleFooterParticles();
            requestAnimationFrame(animateFooterParticles);
        }

        initFooterParticles();
        animateFooterParticles();
    }
});
