document.querySelectorAll('.img-container').forEach(container => {
    const img = container.querySelector('.floating-img');
    const text = container.querySelector('.typing-text');
    
    img.addEventListener('mouseenter', () => {
        const fullText = text.dataset.text;
        text.textContent = '';
        text.classList.add('active');
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                text.textContent += fullText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    });
    
    img.addEventListener('mouseleave', () => {
        text.textContent = '';
        text.classList.remove('active');
    });
});