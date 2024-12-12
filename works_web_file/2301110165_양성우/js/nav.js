window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // active 클래스 토글
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const dropdownBackground = document.createElement('div');
    dropdownBackground.className = 'dropdown-background';
    header.appendChild(dropdownBackground);

    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                const dropdownHeight = dropdown.offsetHeight;
                dropdownBackground.style.height = `${dropdownHeight}px`;
            }
        });

        item.addEventListener('mouseleave', function() {
            dropdownBackground.style.height = '0';
        });
    });
});


