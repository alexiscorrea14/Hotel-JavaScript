document.addEventListener('DOMContentLoaded', function() {
    const infoItems = document.querySelectorAll('.info-item');

    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // botón redondo que regresa a la sección de íconos
    const volverIconosButton = document.createElement('button');
    volverIconosButton.id = 'volver-iconos';
    volverIconosButton.classList.add('boton-redondo');
    volverIconosButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(volverIconosButton);

    volverIconosButton.addEventListener('click', function() {
        const iconosSection = document.querySelector('.info');

        if (iconosSection) {
            iconosSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});