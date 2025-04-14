// Mobile Menu Toggle
document.getElementById('mobileMenu').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
    
    // Change icon
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('#mobileMenu i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would normally send the form data to your server
    // For this example, we'll just show an alert
    alert('Obrigado por sua mensagem! Entraremos em contato em breve.');
    this.reset();
});

// Simple testimonial slider
let currentTestimonial = 0;
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

function showTestimonial(index) {
    const testimonial = testimonials[index];
    const testimonialContainer = document.querySelector('.testimonial-slider');
    
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

// Initial testimonial
showTestimonial(currentTestimonial);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);