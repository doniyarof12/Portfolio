        // Matrix Rain Effect with improved visuals
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"#&_(),.;:?!\\|{}<>[]^~';
        const fontSize = 18;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        const speeds = [];
        const opacities = [];
        
        for(let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * fontSize;
            speeds[i] = 0.5 + Math.random() * 2;
            opacities[i] = 0.1 + Math.random() * 0.3;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
            
            for(let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                // Gradient effect for characters
                const gradient = ctx.createLinearGradient(x, y - 20, x, y + 20);
                gradient.addColorStop(0, 'rgba(0, 255, 157, 0)');
                gradient.addColorStop(0.5, 'rgba(0, 255, 157, ' + opacities[i] + ')');
                gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fillText(text, x, y);
                
                if(y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    speeds[i] = 0.5 + Math.random() * 2;
                    opacities[i] = 0.1 + Math.random() * 0.3;
                }
                
                drops[i] += speeds[i];
            }
        }
        
        // Particle Background
        const particlesContainer = document.getElementById('particles');
        const particles = [];
        const particleCount = 100;
        
        function createParticles() {
            for(let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = 1 + Math.random() * 3;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = 20 + Math.random() * 30;
                const delay = Math.random() * 20;
                const color = Math.random() > 0.66 ? 'var(--primary-color)' : 
                             Math.random() > 0.33 ? 'var(--neon-blue)' : 'var(--neon-pink)';
                
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${posX}%;
                    top: ${posY}%;
                    background: ${color};
                    animation: float ${duration}s ease-in-out ${delay}s infinite;
                    opacity: ${0.05 + Math.random() * 0.1};
                `;
                
                particlesContainer.appendChild(particle);
                particles.push(particle);
            }
        }
        
       
        const typingText = document.getElementById('typingText');
        const texts = [
            "ingilis tilini biladi",
            "java script bilan ishlay oladi",
            "React biqlan ishlay oladi",
            "Css bilan ishlay oladi",
            "html blan ishlay oladi "
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if(isDeleting) {
                typingText.innerHTML = `<span>${currentText.substring(0, charIndex - 1)}</span>`;
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.innerHTML = `<span>${currentText.substring(0, charIndex + 1)}</span>`;
                charIndex++;
                typingSpeed = charIndex === currentText.length ? 1500 : 100;
            }
            
            if(!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, typingSpeed);
                return;
            }
            
            if(isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Header scroll effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav link
            setActiveNavLink();
        });
        
        // Mobile Menu Toggle with animation
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if(navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
                mobileMenuBtn.style.transform = 'rotate(180deg)';
            } else {
                icon.className = 'fas fa-bars';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
            
            // Add click sound effect
            playSound('click');
        });
        
        // Active navigation link on scroll
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        function setActiveNavLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if(window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if(item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }
        
        // Smooth Scrolling with animation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                if(this.getAttribute('href') === '#') return;
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Add visual feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => this.style.transform = '', 300);
                    
                    // Close mobile menu if open
                    if(navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                        mobileMenuBtn.style.transform = 'rotate(0deg)';
                    }
                    
                    // Play navigation sound
                    playSound('navigation');
                }
            });
        });
        
        // Form Submission with enhanced animation
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Encryption animation sequence
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Step 1: Encryption animation
            submitBtn.innerHTML = '<i class="fas fa-lock"></i> Encrypting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Securing transmission...';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Sending...';
                    
                    setTimeout(() => {
                        // Success animation
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                        submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), #00cc7a)';
                        
                        // Show success notification
                        showNotification('Message encrypted and sent successfully! I\'ll respond within 24 hours.', 'success');
                        
                        // Reset form and button
                        setTimeout(() => {
                            contactForm.reset();
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                        }, 2000);
                        
                        // Play success sound
                        playSound('success');
                    }, 1000);
                }, 1000);
            }, 1000);
        });
        
        // Scroll animation for elements
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkScroll() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if(elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Sound effects using Web Audio API
        function playSound(type) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                if(type === 'click') {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.2);
                }
                else if(type === 'navigation') {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                }
                else if(type === 'success') {
                    // Play a chord
                    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
                    
                    frequencies.forEach((freq, index) => {
                        setTimeout(() => {
                            const oscillator = audioContext.createOscillator();
                            const gainNode = audioContext.createGain();
                            
                            oscillator.connect(gainNode);
                            gainNode.connect(audioContext.destination);
                            
                            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                            
                            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                            
                            oscillator.start();
                            oscillator.stop(audioContext.currentTime + 0.3);
                        }, index * 100);
                    });
                }
            } catch(e) {
                // Audio context not supported, silently fail
            }
        }
        
        // Notification system
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 120px;
                right: 30px;
                background: ${type === 'success' ? 'rgba(16, 22, 36, 0.95)' : 'rgba(36, 16, 22, 0.95)'};
                color: ${type === 'success' ? 'var(--primary-color)' : 'var(--neon-pink)'};
                padding: 20px 30px;
                border-radius: var(--button-radius);
                border: 1px solid ${type === 'success' ? 'var(--primary-color)' : 'var(--neon-pink)'};
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                font-family: 'JetBrains Mono', monospace;
                transform: translateX(120%);
                transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                backdrop-filter: blur(10px);
                max-width: 400px;
                line-height: 1.6;
            `;
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}" 
                       style="font-size: 24px;"></i>
                    <div>${message}</div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Animate out after 4 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(120%)';
                setTimeout(() => {
                    if(notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 400);
            }, 4000);
        }
        
        // Initialize everything when page loads
        window.addEventListener('load', () => {
            // Start matrix rain
            setInterval(drawMatrix, 50);
            
            // Create particles
            createParticles();
            
            // Start typing effect
            setTimeout(typeEffect, 1000);
            
            // Check scroll for animations
            window.addEventListener('scroll', checkScroll);
            checkScroll(); // Initial check
            
            // Set active nav link initially
            setActiveNavLink();
            
            // Easter egg: Konami code
            const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
            let konamiIndex = 0;
            
            document.addEventListener('keydown', (e) => {
                if(e.key === konamiCode[konamiIndex]) {
                    konamiIndex++;
                    if(konamiIndex === konamiCode.length) {
                        showNotification('Easter egg activated! Enhanced visual mode enabled!', 'success');
                        
                        // Enhance visuals
                        document.body.style.backgroundImage = `
                            radial-gradient(circle at 10% 20%, rgba(0, 180, 255, 0.1) 0%, transparent 20%),
                            radial-gradient(circle at 90% 30%, rgba(0, 255, 157, 0.1) 0%, transparent 20%),
                            radial-gradient(circle at 50% 80%, rgba(255, 0, 230, 0.1) 0%, transparent 20%),
                            linear-gradient(to bottom, #0a0e17 0%, #050811 100%)
                        `;
                        
                        // Reset after 10 seconds
                        setTimeout(() => {
                            document.body.style.backgroundImage = `
                                radial-gradient(circle at 10% 20%, rgba(0, 180, 255, 0.05) 0%, transparent 20%),
                                radial-gradient(circle at 90% 30%, rgba(0, 255, 157, 0.05) 0%, transparent 20%),
                                radial-gradient(circle at 50% 80%, rgba(255, 0, 230, 0.05) 0%, transparent 20%),
                                linear-gradient(to bottom, #0a0e17 0%, #050811 100%)
                            `;
                            showNotification('Visual mode returned to normal', 'success');
                        }, 10000);
                        
                        konamiIndex = 0;
                    }
                } else {
                    konamiIndex = 0;
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });