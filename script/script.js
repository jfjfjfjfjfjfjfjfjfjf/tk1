// Навигация между страницами
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const feedbackForm = document.getElementById('feedback-form');
    
    // Обработчик кликов по навигационным ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            // Закрыть мобильное меню, если оно открыто
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Обработчик для кнопки мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    });
    
    // Адаптация меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
    
    // Обработчик отправки формы обратной связи
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // В реальном приложении здесь был бы AJAX-запрос к серверу
            console.log('Данные формы:', { name, email, phone, message });
            
            // Показываем уведомление
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            feedbackForm.reset();
        });
    }
    
    // Функция для показа страницы
    function showPage(pageId) {
        // Скрыть все страницы
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Показать целевую страницу
        document.getElementById(pageId).classList.add('active');
        
        // Прокрутка к верху страницы
        window.scrollTo(0, 0);
    }
    
    // Инициализация - показать главную страницу при загрузке
    showPage('home');
});

// Дополнительные функции для улучшения UX
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Добавление класса для анимации при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.product-card, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });
});

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    .product-card, .about-content, .contact-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);