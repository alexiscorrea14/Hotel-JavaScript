document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-reserva');
    const spanClose = document.querySelector('.close-btn');
    const reservaContenido = document.getElementById('reserva-contenido');
    const ocultarModalBtn = document.getElementById('ocultar-reserva');
    const btnTuReserva = document.getElementById('nav-reserva');
    const confirmarReservaBtn = document.getElementById('confirmar-reserva');
    const contadorReserva = document.getElementById('contador-reserva');

    let reservas = [];

    // Asegúrate de que el modal esté oculto al cargar la página
    if (modal) {
        modal.style.display = 'none';
    }

    // Inicializa el contador al cargar la página
    contadorReserva.textContent = reservas.length;

    function abrirModal(tarjeta) {
        const titulo = tarjeta.querySelector('h2').outerHTML;
        const imagenes = tarjeta.querySelector('.slider-imagenes').innerHTML;
        const reserva = {
            titulo: titulo,
            imagenes: imagenes,
            cantidad: 1
        };

        reservas.push(reserva);
        actualizarModal();
    }

    function actualizarModal() {
        reservaContenido.innerHTML = reservas.map((reserva, index) => `
            <div class="modal-reserva">
                <div class="modal-titulo">${reserva.titulo}</div>
                <div class="modal-imagenes">${reserva.imagenes}</div>
                <div class="modal-descripcion">
                    <p>¿Cuántas personas reservarán esta habitación?</p>
                </div>
                <div class="modal-contador">
                    <button class="contador-btn btn-menos" data-index="${index}">-</button>
                    <span class="contador-numero">${reserva.cantidad}</span>
                    <button class="contador-btn btn-mas" data-index="${index}">+</button>
                    <button class="contador-btn eliminar-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Mostrar u ocultar el modal según la cantidad de reservas
        modal.style.display = reservas.length === 0 ? 'none' : 'block';

        // Actualiza el contador en TU Reserva
        contadorReserva.textContent = reservas.length;

        // Inicializar botones del contador y eliminar
        document.querySelectorAll('.btn-mas').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (reservas[index].cantidad < 4) {
                    reservas[index].cantidad++;
                    actualizarModal();
                }
            });
        });

        document.querySelectorAll('.btn-menos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (reservas[index].cantidad > 1) {
                    reservas[index].cantidad--;
                    actualizarModal();
                }
            });
        });

        document.querySelectorAll('.eliminar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                reservas.splice(index, 1);
                actualizarModal();
            });
        });
    }

    function mostrarReservas() {
        if (reservas.length > 0) {
            actualizarModal();
            modal.style.display = 'block';
        } else {
            console.log('No tienes reservas.');
        }
    }

    function ocultarModal() {
        modal.style.display = 'none';
    }

    function agregarHabitacion() {
        const tarjeta = document.querySelector('.tarjeta-habitacion');
        if (tarjeta) {
            abrirModal(tarjeta);
        } else {
            console.log('No hay habitaciones disponibles para agregar.');
        }
    }

    function confirmarReserva() {
        reservas.forEach(reserva => {
            console.log(`Habitación reservada: ${reserva.titulo}, Cantidad de personas: ${reserva.cantidad}`);
        });
        reservas = [];
        actualizarModal(); // Actualiza el contador y oculta el modal si no hay reservas
    }

    spanClose.addEventListener('click', ocultarModal);
    ocultarModalBtn.addEventListener('click', ocultarModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            ocultarModal();
        }
    });

    document.querySelectorAll('.btn-reservar').forEach(button => {
        button.addEventListener('click', () => {
            const tarjeta = button.closest('.tarjeta-habitacion');
            abrirModal(tarjeta);
        });
    });

    btnTuReserva.addEventListener('click', mostrarReservas);
    confirmarReservaBtn.addEventListener('click', confirmarReserva);
});
