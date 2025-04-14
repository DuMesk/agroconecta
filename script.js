// =============================================
// MENU MOBILE TOGGLE (MANTIDO)
// =============================================
document.getElementById('mobileMenu').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    const icon = this.querySelector('i');
    
    nav.classList.toggle('active');
    
    if (icon) {
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// =============================================
// SCROLL SUAVE (MANTIDO)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('#mobileMenu i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// =============================================
// SLIDER DE DEPOIMENTOS (MANTIDO)
// =============================================
const testimonials = [
    {
        quote: "A AgroConecta revolucionou nossas vendas...",
        name: "João Silva",
        role: "Produtor de Café - Minas Gerais",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    // ... (seus outros depoimentos)
];

let currentTestimonial = 0;
const testimonialContainer = document.querySelector('.testimonial-slider');

function showTestimonial(index) {
    if (!testimonialContainer) return;
    
    const testimonial = testimonials[index];
    testimonialContainer.innerHTML = `
        <div class="testimonial-card">
            <p>"${testimonial.quote}"</p>
            <div class="client-info">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="client-avatar">
                <div>
                    <div class="client-name">${testimonial.name}</div>
                    <div class="client-role">${testimonial.role}</div>
                </div>
            </div>
        </div>
    `;
}

showTestimonial(currentTestimonial);

const testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// =============================================
// FORMULÁRIO DE CONTATO (CÓDIGO CORRIGIDO)
// =============================================
const formContato = document.getElementById('formContato');

if (formContato) {
    formContato.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // 1. Preparar dados
            const formData = {
                nome: this.nome.value.trim(),
                email: this.email.value.trim(),
                telefone: this.telefone.value.trim() || 'Não informado',
                negocio: this.negocio.value,
                mensagem: this.mensagem.value.trim()
            };

            // 2. Validação
            if (!formData.nome || !formData.email || !formData.mensagem) {
                throw new Error("Por favor, preencha todos os campos obrigatórios.");
            }

            // 3. Configurar envio
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";
            
            // 4. URL do Google Apps Script (SUA URL)
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyU5Q1UjZxHqd3hOT6Rwf8mAnvHqTiWrybJt89TL1pRDZd90aP96o7nAcuIH_34gmAL/exec';
            
            // 5. Enviar dados (modo no-cors para contornar restrições)
            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Modo crucial para funcionar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // 6. Feedback visual
            alert("Mensagem enviada com sucesso!\nVerifique sua planilha Google.");
            this.reset();

        } catch (error) {
            console.error("Erro no envio:", error);
            alert(`Erro: ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
