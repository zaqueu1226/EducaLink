document.addEventListener('DOMContentLoaded', () => {

    // Helper to show messages in auth forms
    const showAuthMessage = (form, message, type = 'error') => {
        let messageEl = form.querySelector('.auth-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'auth-message';
            form.prepend(messageEl);
        }
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
        messageEl.style.display = 'block';
    };

    // --- Signup Form Handler ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('input[name="role"]:checked').value;

            const users = JSON.parse(localStorage.getItem('educalink_users')) || [];

            if (users.find(user => user.email === email)) {
                showAuthMessage(signupForm, 'Este email já está cadastrado.');
                return;
            }

            const newUser = { fullname, email, password, role };
            users.push(newUser);
            localStorage.setItem('educalink_users', JSON.stringify(users));
            
            showAuthMessage(signupForm, 'Conta criada com sucesso! Redirecionando para o login...', 'success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // --- Login Form Handler ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const users = JSON.parse(localStorage.getItem('educalink_users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store logged-in user info in sessionStorage
                sessionStorage.setItem('educalink_currentUser', JSON.stringify(user));
                showAuthMessage(loginForm, 'Login bem-sucedido! Redirecionando para os cursos...', 'success');
                 setTimeout(() => {
                    window.location.href = 'courses.html';
                }, 1500);
            } else {
                showAuthMessage(loginForm, 'Email ou senha inválidos.');
            }
        });
    }

    // --- Forgot Password Form Handler ---
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const users = JSON.parse(localStorage.getItem('educalink_users')) || [];
            
            // In a real app, you would send an email. Here we just show a message.
            // We show the same message whether the email exists or not for security reasons.
            const message = 'Se uma conta com este e-mail existir, um link de redefinição de senha foi enviado.';
            showAuthMessage(forgotPasswordForm, message, 'success');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Do not prevent default for links to other pages
            if (!this.getAttribute('href').endsWith('.html')) {
                 e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fade-in animation on scroll
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});