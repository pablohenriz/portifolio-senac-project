// ── Formulário de Contato ──
// Substitua a URL abaixo pelo seu endpoint real
// (Formspree, EmailJS, backend próprio, etc.)

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit');
        const submitText = submitBtn.querySelector('.submit-text');

        // Estado de loading
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';

        // ── OPÇÃO 1: Formspree (gratuito, sem backend)
        // 1. Crie conta em https://formspree.io
        // 2. Crie um form e pegue o ID
        // 3. Substitua 'SEU_ID_AQUI' pelo ID do seu form

        const FORMSPREE_ID = 'SEU_ID_AQUI';

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: contactForm.nome.value,
                    email: contactForm.email.value,
                    telefone: contactForm.telefone.value,
                    mensagem: contactForm.mensagem.value,
                }),
            });

            if (response.ok) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = '✓ Mensagem enviada! Responderei em breve.';
                contactForm.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (err) {
            // Se ainda não configurou o Formspree, simula sucesso visual
            // Remova este bloco quando tiver o endpoint real
            if (FORMSPREE_ID === 'SEU_ID_AQUI') {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = '✓ (Demo) Formulário funcionando! Configure o endpoint para envio real.';
                contactForm.reset();
            } else {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = '✗ Algo deu errado. Tente novamente ou me mande um email.';
            }
        } finally {
            submitBtn.disabled = false;
            submitText.textContent = 'Enviar mensagem';

            // Remove o feedback após 6 segundos
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
            }, 6000);
        }
    });
}