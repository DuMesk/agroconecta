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
const formContato = document.getElementById('formContato');

if (formContato) {
    formContato.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            // 1. Preparar dados do formulário
            const formData = {
                nome: this.name.value.trim(),
                email: this.email.value.trim(),
                telefone: this.phone.value.trim() || 'Não informado',
                negocio: this.business.value,
                mensagem: this.message.value.trim()
            };

            // 2. Validação básica
            if (!formData.nome || !formData.email || !formData.mensagem) {
                throw new Error("Por favor, preencha nome, e-mail e mensagem!");
            }

            // 3. Desabilitar botão e mudar texto
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";

            // 4. Enviar dados pro Google Apps Script
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxQimrXlFDTl07keH1oywQJNSXSBP9ith8dLk8b0lz_34oMe56f_8sdxFEqqSjcgRNK/exec';

            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // ignora política de CORS
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // 5. Mensagem simulada de sucesso
            alert("📨 Mensagem enviada com sucesso!");
            this.reset();

        } catch (error) {
            console.error("Erro no envio:", error);
            alert(`⚠️ ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
