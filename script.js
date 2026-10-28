document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Envío del formulario de contacto con Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Te responderé pronto.');
                    contactForm.reset();
                } else {
                    alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión. Por favor verifica tu red.');
            }
        });
    }
});