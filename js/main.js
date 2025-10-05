// ===================================
// CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ===================================
const CONFIG = {
    scrollOffset: 80,
    animationDelay: 100,
    scrollThreshold: 50
};

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
    initScrollToTop();
    initContactButtons();
    initProjectButtons();
});

// ===================================
// ÍCONES LUCIDE
// ===================================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===================================
// MENU MOBILE
// ===================================
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!mobileMenuButton || !mobileMenu) return;

    // Toggle menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        updateMenuIcon(mobileMenu.classList.contains('active'));
    });

    // Fechar menu ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            updateMenuIcon(false);
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            updateMenuIcon(false);
        }
    });
}

function updateMenuIcon(isOpen) {
    const icon = document.querySelector('#mobile-menu-button i');
    if (!icon) return;

    if (isOpen) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

// ===================================
// SCROLL SUAVE
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// HEADER SCROLL
// ===================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > CONFIG.scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===================================
// ANIMAÇÕES NO SCROLL
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// SCROLL TO TOP
// ===================================
function initScrollToTop() {
    // Criar botão se não existir
    let scrollButton = document.getElementById('scroll-to-top');
    
    if (!scrollButton) {
        scrollButton = document.createElement('button');
        scrollButton.id = 'scroll-to-top';
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i data-lucide="arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(scrollButton);
        lucide.createIcons();
    }

    // Mostrar/esconder botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll ao topo
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// BOTÕES DE CONTATO
// ===================================
function initContactButtons() {
    // Botões "Ver Projetos"
    document.querySelectorAll('[data-action="view-projects"]').forEach(btn => {
        btn.addEventListener('click', () => {
            scrollToSection('projects');
        });
    });

    // Botões "Entre em Contato"
    document.querySelectorAll('[data-action="contact"]').forEach(btn => {
        btn.addEventListener('click', () => {
            scrollToSection('contact');
        });
    });

    // Botões de email
    document.querySelectorAll('[data-action="email"]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'mailto:alexdevelopnet@gmail.com';
        });
    });

    // Botões de LinkedIn
    document.querySelectorAll('[data-action="linkedin"]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://www.linkedin.com/in/alex-feitoza-6056a5237/', '_blank');
        });
    });

    // Botões de GitHub
    document.querySelectorAll('[data-action="github"]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://github.com/anfsusax', '_blank');
        });
    });
}

// ===================================
// BOTÕES DE PROJETOS
// ===================================
function initProjectButtons() {
    const projects = {
        bankmore: {
            github: 'https://github.com/anfsusax',
            demo: '#'
        },
        protocol: {
            github: 'https://github.com/anfsusax',
            demo: '#'
        },
        fipe: {
            github: 'https://github.com/anfsusax',
            demo: '#'
        }
    };

    // Adicionar eventos aos botões de projetos
    Object.keys(projects).forEach(projectKey => {
        const githubBtn = document.querySelector(`[data-project="${projectKey}"][data-action="github"]`);
        const demoBtn = document.querySelector(`[data-project="${projectKey}"][data-action="demo"]`);

        if (githubBtn) {
            githubBtn.addEventListener('click', () => {
                window.open(projects[projectKey].github, '_blank');
            });
        }

        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                if (projects[projectKey].demo !== '#') {
                    window.open(projects[projectKey].demo, '_blank');
                } else {
                    showNotification('Demo em breve!');
                }
            });
        }
    });
}

// ===================================
// FORMULÁRIO DE CONTATO
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Aqui você pode adicionar a lógica de envio do formulário
        console.log('Dados do formulário:', data);
        
        // Simular envio
        showNotification('Mensagem enviada com sucesso!');
        form.reset();
    });
}

// ===================================
// UTILITÁRIOS
// ===================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// ANIMAÇÕES ADICIONAIS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// PERFORMANCE - Lazy Loading de Imagens
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// ANALYTICS (Opcional)
// ===================================
function trackEvent(category, action, label) {
    // Implementar tracking de eventos (Google Analytics, etc)
    console.log('Event tracked:', { category, action, label });
}

// ===================================
// EASTER EGG - Konami Code
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('🎉 Você encontrou o Easter Egg! Desenvolvedor curioso detectado!', 'success');
    document.body.style.animation = 'rainbow 2s linear';
}

// ===================================
// EXPORT (para uso em módulos)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        showNotification,
        trackEvent
    };
}
