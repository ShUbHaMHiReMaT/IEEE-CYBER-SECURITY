// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor effect
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', function(e) {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const bars = document.querySelectorAll('.bar');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        bars.forEach(bar => bar.classList.toggle('active'));
        
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Module filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const moduleCards = document.querySelectorAll('.module-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            moduleCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Counter animation
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const startTime = Date.now();
        const step = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        };
        
        requestAnimationFrame(step);
    }

    // Start counter animation when element is in viewport
    const counters = document.querySelectorAll('.count');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Matrix animation for hero section
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const container = document.getElementById('cyberMatrix');
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Characters to display
        const characters = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const columns = Math.floor(canvas.width / 20);
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height);
        }
        
        function draw() {
            // Add semi-transparent black rectangle to create fade effect
            ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set text color and font
            ctx.fillStyle = '#00ff9d';
            ctx.font = '15px monospace';
            
            // Draw each character
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw character
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                // Reset drop if it reaches bottom or randomly
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drop down
                drops[i]++;
            }
        }
        
        // Run matrix animation
        setInterval(draw, 40);
        
        // Resize canvas when window is resized
        window.addEventListener('resize', function() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        });
    }
    
    createMatrixEffect();

    // Terminal animation effect
    function animateTerminal() {
        const terminalOutput = document.getElementById('terminalOutput');
        const lines = terminalOutput.querySelectorAll('p');
        let currentLine = 0;
        
        // Hide all lines initially
        lines.forEach(line => {
            line.style.display = 'none';
        });
        
        // Function to show next line
        function showNextLine() {
            if (currentLine < lines.length) {
                lines[currentLine].style.display = 'block';
                
                // Simulate typing effect for command lines
                if (lines[currentLine].classList.contains('command')) {
                    const text = lines[currentLine].textContent;
                    lines[currentLine].textContent = '';
                    
                    let charIndex = 0;
                    const typeInterval = setInterval(() => {
                        if (charIndex < text.length) {
                            lines[currentLine].textContent += text.charAt(charIndex);
                            charIndex++;
                        } else {
                            clearInterval(typeInterval);
                            currentLine++;
                            
                            // Show next line after a delay
                            setTimeout(showNextLine, lines[currentLine - 1].classList.contains('command') ? 500 : 300);
                        }
                    }, 50);
                } else {
                    currentLine++;
                    
                    // Show next line after a delay
                    setTimeout(showNextLine, 300);
                }
            } else {
                // Restart animation after a delay
                setTimeout(() => {
                    currentLine = 0;
                    lines.forEach(line => {
                        line.style.display = 'none';
                    });
                    showNextLine();
                }, 5000);
            }
        }
        
        // Start animation
        showNextLine();
    }
    
    // Start terminal animation when the element is in viewport
    const terminalEl = document.querySelector('.terminal');
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTerminal();
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (terminalEl) {
        terminalObserver.observe(terminalEl);
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('toggleTheme');
    const toggleIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'light');
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    });
});
// Auth.js - Handle login and signup functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Password strength check on signup page
    const passwordInput = document.getElementById('password');
    const strengthLevel = document.querySelector('.strength-level');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthLevel) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password strength
            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update UI
            strengthLevel.className = 'strength-level';
            
            if (password.length === 0) {
                strengthLevel.style.width = '0%';
                strengthText.textContent = 'Password strength';
            } else if (strength < 2) {
                strengthLevel.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength < 4) {
                strengthLevel.classList.add('medium');
                strengthText.textContent = 'Medium strength';
            } else {
                strengthLevel.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember')?.checked || false;
            
            // Here you would normally send this data to your backend
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Example authentication request
            authenticateUser(email, password, rememberMe);
        });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (!termsAccepted) {
                alert('You must accept the terms and conditions');
                return;
            }
            
            // Here you would normally send this data to your backend
            console.log('Signup attempt:', { firstName, lastName, email, password });
            
            // Example registration request
            registerUser(firstName, lastName, email, password);
        });
    }
    
    // Example authentication function - replace with actual API calls
    function authenticateUser(email, password, rememberMe) {
        // Simulate API request
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            return response.json();
        })
        .then(data => {
            // Store auth token in localStorage or sessionStorage
            localStorage.setItem('authToken', data.token);
            
            // Redirect to dashboard or home page
            window.location.href = '/dashboard.html';
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        });
    }
    
    // Example registration function - replace with actual API calls
    function registerUser(firstName, lastName, email, password) {
        // Simulate API request
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            // Store auth token
            localStorage.setItem('authToken', data.token);
            
            // Redirect to onboarding or dashboard
            window.location.href = '/onboarding.html';
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert('Registration failed: ' + error.message);
        });
    }
});
