document.addEventListener('DOMContentLoaded', function() {
    // Animación de números al cargar
    animateNumbers();
    
    // FAQ interactivo
    document.querySelectorAll('.boton-faq').forEach(boton => {
        boton.addEventListener('click', () => {
            const respuesta = boton.nextElementSibling;
            respuesta.classList.toggle('activa');
            
            // Cambiar icono ▼/▲
            if (respuesta.classList.contains('activa')) {
                boton.innerHTML = boton.innerHTML.replace('▼', '▲');
            } else {
                boton.innerHTML = boton.innerHTML.replace('▲', '▼');
            }
        });
    });
    
    // Efecto de movimiento al pasar el ratón
    document.querySelectorAll('.ejemplo').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Animación al hacer scroll
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });
    
    // Ejecutar al cargar por si hay elementos visibles
    animateOnScroll();
});

function animateNumbers() {
    const numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        // Guardar el valor original si no está guardado
        if (!numero.dataset.original) {
            numero.dataset.original = numero.textContent;
        }
        
        // Obtener solo el número (eliminar % si existe)
        const valorFinal = parseInt(numero.dataset.original.replace('%', ''));
        let start = 0;
        const duracion = 1500;
        const incremento = valorFinal / (duracion / 16);
        
        numero.textContent = '0';
        
        const timer = setInterval(() => {
            start += incremento;
            numero.textContent = Math.floor(start);
            if (start >= valorFinal) {
                numero.textContent = valorFinal;
                // Restaurar el % si el original lo tenía
                if (numero.dataset.original.includes('%')) {
                    numero.textContent += '%';
                }
                clearInterval(timer);
            }
        }, 16);
    });
}

function animateOnScroll() {
    const cards = document.querySelectorAll('.card, .dato-item, .ejemplo');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
    );
}