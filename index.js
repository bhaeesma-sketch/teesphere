/* ═══════════════════════════════════════════════════════
   TEESPHERE — GSAP-Powered Interactive JavaScript
   GSAP ScrollTrigger, Parallax, Count-Up, Floating Text
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // ── State ──
    const isMobile = window.innerWidth <= 640;

    // ── DOM ──
    const loader = document.getElementById('loader');
    const loaderFill = document.getElementById('loaderFill');
    const nav = document.getElementById('mainNav');
    const heroTshirt = document.getElementById('heroTshirt');

    // ═══════════════════════════════════════
    //  GSAP LOADER ANIMATION
    // ═══════════════════════════════════════
    const loaderTL = gsap.timeline({
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    loader.style.visibility = 'hidden';
                    loader.style.pointerEvents = 'none';
                    initHeroAnimations();
                }
            });
        }
    });

    loaderTL
        .to(loaderFill, {
            width: '100%',
            duration: 2.2,
            ease: 'power2.inOut',
        });

    // ═══════════════════════════════════════
    //  GSAP HERO ENTRANCE
    // ═══════════════════════════════════════
    function initHeroAnimations() {
        const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTL
            // Eyebrow
            .to('.hero-eyebrow', {
                opacity: 1,
                y: 0,
                duration: 0.8,
            })
            // Title lines — staggered cinematic reveal
            .from('.title-line', {
                y: 120,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
            }, '-=0.4')
            // Subtitle
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0,
                duration: 0.9,
            }, '-=0.5')
            // Actions
            .to('.hero-actions', {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, '-=0.5')
            // T-shirt  —  dramatic scale + fade
            .to('.hero-tshirt', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.4,
                ease: 'power3.out',
            }, '-=1')
            // Float tags
            .to('.hero-float-tag', {
                opacity: 0.6,
                duration: 0.6,
                stagger: 0.15,
            }, '-=0.4')
            // Scroll indicator
            .to('.hero-scroll-indicator', {
                opacity: 1,
                duration: 0.6,
            }, '-=0.3');

        // Hero T-shirt floating animation (infinite)
        gsap.to('.hero-tshirt', {
            y: '-=12',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: 1.5,
            force3D: true
        });

        // Hero Mouse Parallax
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.hero-tshirt', {
                x: xPos,
                y: yPos,
                rotationY: xPos * 0.2,
                rotationX: -yPos * 0.2,
                duration: 1,
                ease: 'power2.out',
                force3D: true
            });
        });
    }

    // ═══════════════════════════════════════
    //  GSAP SCROLL REVEALS
    // ═══════════════════════════════════════
    function initScrollAnimations() {
        // Fade up reveals
        gsap.utils.toArray('.gsap-reveal').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: i % 3 * 0.15,
                ease: 'power3.out',
            });
        });

        // Scale reveals (collection items)
        gsap.utils.toArray('.gsap-reveal-scale').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                scale: 0.9,
                y: 30,
                opacity: 0,
                duration: 1.2,
                delay: (i % 3) * 0.1,
                ease: 'expo.out',
            });
        });

        // Left reveals
        gsap.utils.toArray('.gsap-reveal-left').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                x: -80,
                opacity: 0,
                duration: 1.1,
                ease: 'power3.out',
            });
        });

        // Right reveals
        gsap.utils.toArray('.gsap-reveal-right').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                x: 80,
                opacity: 0,
                duration: 1.1,
                ease: 'power3.out',
            });
        });

        // Journey cards — staggered hover-lift animation
        gsap.utils.toArray('.journey-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' });
                gsap.to(card.querySelector('.journey-number'), { opacity: 0.6, duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
                gsap.to(card.querySelector('.journey-number'), { opacity: 0.3, duration: 0.3 });
            });
        });

        // Collection items — smooth hover scale
        gsap.utils.toArray('.collection-item').forEach((item) => {
            const img = item.querySelector('.collection-item-image');
            const tag = item.querySelector('.collection-item-tag');

            item.addEventListener('mouseenter', () => {
                gsap.to(img, { scale: 1.08, filter: 'brightness(1) contrast(1.1)', duration: 0.8, ease: 'power2.out' });
                gsap.to(tag, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(img, { scale: 1, filter: 'brightness(0.8) contrast(1.1)', duration: 0.8, ease: 'power2.out' });
                gsap.to(tag, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.out' });
            });
        });
    }

    // ═══════════════════════════════════════
    //  GSAP PARALLAX (ScrollTrigger)
    // ═══════════════════════════════════════
    function initParallax() {
        // Thread divider backgrounds
        gsap.utils.toArray('.thread-divider-bg').forEach((bg) => {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: -80,
                ease: 'none',
            });
        });

        // Thread divider text — horizontal parallax
        gsap.utils.toArray('.thread-divider-text').forEach((txt) => {
            gsap.to(txt, {
                scrollTrigger: {
                    trigger: txt.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                x: -120,
                ease: 'none',
            });
        });
    }

    // ═══════════════════════════════════════
    //  COUNT-UP (Stats)
    // ═══════════════════════════════════════
    function initCountUp() {
        gsap.utils.toArray('.stat-num').forEach((num) => {
            const val = parseInt(num.textContent);
            num.textContent = '0';
            gsap.to(num, {
                scrollTrigger: {
                    trigger: num,
                    start: 'top 90%',
                },
                innerText: val,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power3.out',
            });
        });
    }

    // ═══════════════════════════════════════
    //  MARQUEE (Infinite Loop)
    // ═══════════════════════════════════════
    function initMarquee() {
        const marquee = document.querySelector('.marquee-inner');
        if (!marquee) return;
        
        // Clone for seamless loop
        marquee.innerHTML += marquee.innerHTML;

        gsap.to(marquee, {
            xPercent: -50,
            duration: 30, // Slower for smoothness
            repeat: -1,
            ease: 'none',
            force3D: true
        });
    }

    // ═══════════════════════════════════════
    //  FLOATING TEXT
    // ═══════════════════════════════════════
    function initFloatingText() {
        const texts = ['#floatingText1', '#floatingText2', '#floatingText3'];
        texts.forEach((id, i) => {
            const el = document.querySelector(id);
            if (!el) return;

            gsap.to(el, {
                y: -20,
                x: i % 2 === 0 ? 10 : -10,
                opacity: 0.4,
                duration: 5 + i,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                force3D: true
            });
        });
    }

    // ═══════════════════════════════════════
    //  LOGO ANIMATIONS
    // ═══════════════════════════════════════
    function initLogoAnimations() {
        const logo = document.querySelector('.teesphere-logo');
        if (!logo) return;

        const globe = logo.querySelector('.logo-globe');
        const orbit = logo.querySelector('.logo-orbit');
        const star1 = logo.querySelector('.logo-star-1');
        const star2 = logo.querySelector('.logo-star-2');

        const circumference = 2 * Math.PI * 185;
        gsap.set(orbit, { strokeDasharray: circumference, strokeDashoffset: circumference });

        // Entrance
        logo.addEventListener('mouseenter', () => {
            gsap.to(globe, { rotation: 360, duration: 2, ease: 'power2.inOut' });
            gsap.to(orbit, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' });
        });

        // Infinite states
        window.addEventListener('load', () => {
             // Continuous Loops
            gsap.to(globe, {
                rotation: 3,
                scale: 1.01,
                transformOrigin: '50% 50%',
                duration: 5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                force3D: true
            });

            gsap.to(orbit, {
                strokeDashoffset: -circumference,
                duration: 10,
                repeat: -1,
                ease: 'none'
            });
        });
    }

    // ═══════════════════════════════════════
    //  E-COMMERCE LOGIC
    // ═══════════════════════════════════════

    const products = {
        'obsidian-oversized': {
            name: 'Obsidian Oversized',
            price: 28.500,
            tag: 'Bestseller',
            desc: 'A structural masterpiece crafted from 300 GSM heavy-weight cotton. The Obsidian Oversized tee defines modern luxury silhouette with dropped shoulders and a meticulous charcoal-black finish.',
            img: 'assets/hyper-back.jpeg',
            weight: '300 GSM'
        },
        'vision-essential': {
            name: 'Vision Essential',
            price: 32.000,
            tag: 'New Drop',
            desc: 'The Vision Essential tee is the core of our research. Featuring a custom boxy fit and a unique sepia-toned finish, it represents the intersection of speed and artisan craft.',
            img: 'assets/jersey-32.jpeg',
            weight: '280 GSM'
        },
        'charcoal-research': {
            name: 'Charcoal Research',
            price: 35.000,
            tag: 'Limited',
            desc: 'Part of our experimental research drops. This limited edition piece features a high-density print and a structural handle that maintains its shape through every wear.',
            img: 'assets/tshirt_1.png',
            weight: '320 GSM'
        },
        'obsidian-elite': {
            name: 'Obsidian Elite',
            price: 38.000,
            tag: 'Elite Edition',
            desc: 'The pinnacle of the TEESPHERE collection. The Obsidian Elite utilizes a rare obsidian-dyed knit for unparalleled depth of color and a premium, heavy-weight feel.',
            img: 'assets/tshirt_1.png',
            weight: '340 GSM'
        },
        'desert-vision': {
            name: 'Desert Vision',
            price: 34.500,
            tag: 'Trending',
            desc: 'Inspired by the vast horizons of the desert. This tee features a sun-washed aesthetic and a breathable yet substantial cotton construct.',
            img: 'assets/tshirt_2.png',
            weight: '280 GSM'
        },
        'midnight-research': {
            name: 'Midnight Research',
            price: 36.000,
            tag: 'Research Drop',
            desc: 'A dark, brooding interpretation of our research series. The Midnight Research tee is designed for those who navigate the urban landscape with purpose.',
            img: 'assets/tshirt_3.png',
            weight: '310 GSM'
        },
        'charcoal-craft': {
            name: 'Charcoal Craft',
            price: 35.500,
            tag: 'Artisan',
            desc: 'Where artisan techniques meet modern silhouettes. The Charcoal Craft tee features a unique distressed finish that makes every piece one-of-a-kind.',
            img: 'assets/tshirt_4.png',
            weight: '300 GSM'
        },
        'forest-atelier': {
            name: 'Forest Atelier',
            price: 39.000,
            tag: 'Atelier Serie',
            desc: 'Crafted in our limited Atelier series. The Forest Atelier tee explores deep, organic tones and a sophisticated, tailored oversized fit.',
            img: 'assets/tshirt_5.png',
            weight: '330 GSM'
        },
        'off-white-essence': {
            name: 'Off-White Essence',
            price: 32.500,
            tag: 'Essential',
            desc: 'The purest form of TEESPHERE. The Off-White Essence tee is a study in minimalism, focusing on the quality of the thread and the precision of the cut.',
            img: 'assets/tshirt_6.png',
            weight: '280 GSM'
        },
        'echo-park-wildcats': {
            name: 'Echo Park Wildcats',
            price: 42.000,
            tag: 'Community',
            desc: 'Special edition Echo Park Wildcats jersey. A tribute to our community roots, featuring premium mesh construction and high-fidelity graphics.',
            img: 'assets/echo-park.jpeg',
            weight: 'Mesh / 240 GSM'
        },
        'ford-68': {
            name: 'Ford 68',
            price: 45.000,
            tag: 'Community',
            desc: 'The Ford 68 jersey. Induced by the golden era of speed. This piece combines vintage racing aesthetics with the TEESPHERE luxury standard.',
            img: 'assets/ford-68.jpeg',
            weight: 'Mesh / 240 GSM'
        },
    };

    let cart = JSON.parse(localStorage.getItem('teesphere_cart')) || [];
    let activeProduct = null;
    let selectedSize = 'M';

    function initEcommerce() {
        const cartBtn = document.getElementById('cartBtn');
        const cartClose = document.getElementById('cartClose');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const productModal = document.getElementById('productModal');
        const productOverlay = document.getElementById('productOverlay');
        const modalClose = document.getElementById('modalClose');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const sizeBtns = document.querySelectorAll('.size-btn');
        const modalAddBtn = document.getElementById('modalAddBtn');

        // ── Cart UI ──
        function updateCartUI() {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            let count = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="cart-empty-msg">Your bag is currently empty.</p>';
                checkoutBtn.disabled = true;
            } else {
                cart.forEach((item, index) => {
                    const product = products[item.id];
                    total += product.price * item.quantity;
                    count += item.quantity;

                    const itemEl = document.createElement('div');
                    itemEl.className = 'cart-item';
                    itemEl.innerHTML = `
                        <img src="${product.img}" alt="${product.name}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4>${product.name}</h4>
                            <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                            <button class="cart-item-remove" data-index="${index}">Remove</button>
                        </div>
                        <div class="cart-item-price">OMR ${(product.price * item.quantity).toFixed(3)}</div>
                    `;
                    cartItemsContainer.appendChild(itemEl);
                });
                checkoutBtn.disabled = false;
            }

            cartCount.textContent = count;
            cartCount.classList.add('bump');
            setTimeout(() => cartCount.classList.remove('bump'), 300);

            cartTotal.textContent = `OMR ${total.toFixed(3)}`;
            localStorage.setItem('teesphere_cart', JSON.stringify(cart));
        }

        // ── Cart Actions ──
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                cartSidebar.classList.add('active');
                cartOverlay.classList.add('active');
            });
        }

        [cartClose, cartOverlay].forEach(el => {
            if (el) {
                el.addEventListener('click', () => {
                    cartSidebar.classList.remove('active');
                    cartOverlay.classList.remove('active');
                });
            }
        });

        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart-item-remove')) {
                    const index = e.target.dataset.index;
                    cart.splice(index, 1);
                    updateCartUI();
                }
            });
        }

        // ── Product Modal ──
        function openProductModal(productId) {
            const product = products[productId];
            if (!product) return;

            activeProduct = productId;
            selectedSize = 'M';
            
            // Reset Size Buttons
            sizeBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.size === 'M') btn.classList.add('active');
            });

            document.getElementById('modalImg').src = product.img;
            document.getElementById('modalTag').textContent = product.tag;
            document.getElementById('modalTitle').textContent = product.name;
            document.getElementById('modalPrice').textContent = `OMR ${product.price.toFixed(3)}`;
            document.getElementById('modalDesc').textContent = product.desc;
            document.getElementById('modalWeight').textContent = product.weight;

            productModal.classList.add('active');
            productOverlay.classList.add('active');
        }

        [modalClose, productOverlay].forEach(el => {
            if (el) {
                el.addEventListener('click', () => {
                    productModal.classList.remove('active');
                    productOverlay.classList.remove('active');
                });
            }
        });

        // Click on product items
        document.querySelectorAll('[data-product-id]').forEach(item => {
            item.addEventListener('click', () => {
                openProductModal(item.dataset.productId);
            });
        });

        // Size Selection
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
            });
        });

        // Add to Bag
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', () => {
                const existingItem = cart.find(item => item.id === activeProduct && item.size === selectedSize);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: activeProduct,
                        size: selectedSize,
                        quantity: 1
                    });
                }

                updateCartUI();
                
                // Close modal and open cart for feedback
                productModal.classList.remove('active');
                productOverlay.classList.remove('active');
                
                setTimeout(() => {
                    cartSidebar.classList.add('active');
                    cartOverlay.classList.add('active');
                }, 400);
            });
        }

        // Checkout Placeholder
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                checkoutBtn.textContent = 'Processing...';
                checkoutBtn.disabled = true;
                
                setTimeout(() => {
                    cart = [];
                    updateCartUI();
                    checkoutBtn.textContent = 'Order Placed!';
                    
                    setTimeout(() => {
                        cartSidebar.classList.remove('active');
                        cartOverlay.classList.remove('active');
                        checkoutBtn.textContent = 'Proceed to Checkout';
                    }, 1500);
                }, 2000);
            });
        }

        updateCartUI();
    }

    // ═══════════════════════════════════════
    //  INIT
    // ═══════════════════════════════════════
    initHeroAnimations();
    initScrollAnimations();
    initParallax();
    initCountUp();
    initMarquee();
    initFloatingText();
    initLogoAnimations();
    initEcommerce();

})();
