// =============================================
// MENU MOBILE TOGGLE
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
// SCROLL SUAVE PARA LINKS ÂNCORA
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

            // Fechar menu mobile se estiver aberto
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
// SLIDER DE DEPOIMENTOS
// =============================================
const testimonials = [
    {
        quote: "A AgroConecta revolucionou nossas vendas. Em 4 meses já tivemos um aumento de 150% no faturamento através do e-commerce que eles implementaram. O atendimento é personalizado e entendem profundamente as necessidades do produtor rural.",
        name: "João Silva",
        role: "Produtor de Café - Minas Gerais",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "Nunca imaginei que as redes sociais poderiam trazer tantos clientes para meu sítio de frutas orgânicas. A equipe da AgroConecta fez um trabalho excepcional, mostrando o dia a dia da nossa produção de forma autêntica.",
        name: "Maria Oliveira",
        role: "Produtora de Frutas Orgânicas - São Paulo",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "Como produtor de gado de corte, sempre fui cético com marketing digital. Mas os resultados falam por si: 40% mais clientes no primeiro trimestre após contratar a AgroConecta. Recomendo a todos os colegas pecuaristas.",
        name: "Carlos Mendes",
        role: "Pecuarista - Mato Grosso",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
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

// Inicializa o slider
showTestimonial(currentTestimonial);

// Rotação automática a cada 5 segundos
const testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// =============================================
// FORMULÁRIO DE CONTATO
// =============================================
const formContato = document.getElementById('formContato');

if (formContato) {
    const submitButton = formContato.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    formContato.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Desabilita o botão durante o envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Coleta os dados do formulário
        const formData = {
            nome: this.nome.value.trim(),
            email: this.email.value.trim(),
            telefone: this.telefone.value.trim(),
            negocio: this.negocio.value,
            mensagem: this.mensagem.value.trim()
        };
        
        // Validação básica
        if (!formData.nome || !formData.email || !formData.mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }
        
        try {
            // URL do seu Google Apps Script
            const urlScript = 'https://script.google.com/macros/s/AKfycbyU5Q1UjZxHqd3hOT6Rwf8mAnvHqTiWrybJt89TL1pRDZd90aP96o7nAcuIH_34gmAL/exec';
            
            const response = await fetch(urlScript, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const resultado = await response.json();
            
            if (resultado.success) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            } else {
                throw new Error(resultado.error || 'Erro ao processar seu formulário');
            }
            
        } catch (error) {
            console.error('Erro no envio:', error);
            alert('Houve um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde ou nos contate por outro meio.');
            
            // Você pode adicionar um fallback aqui, como:
            // 1. Salvar os dados localmente para envio posterior
            // 2. Redirecionar para um e-mail (mailto:)
        } finally {
            // Reativa o botão independentemente do resultado
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
