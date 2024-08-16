document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-reserva');
    const spanClose = document.querySelector('.close-btn');
    const reservaContenido = document.getElementById('reserva-contenido');
    const ocultarModalBtn = document.getElementById('ocultar-reserva');
    const btnTuReserva = document.getElementById('nav-reserva');
    const confirmarReservaBtn = document.getElementById('confirmar-reserva');
    const contadorReserva = document.getElementById('contador-reserva');

    let reservas = [];

    if (modal) {
        modal.style.display = 'none';
    }

    contadorReserva.textContent = reservas.length;

    function abrirModal(tarjeta) {
        const titulo = tarjeta.querySelector('h2').textContent; 
        const imagenes = tarjeta.querySelector('.slider-imagenes').innerHTML;
        const reserva = {
            nombre: titulo, 
            imagenes: imagenes,
            cantidad: 1
        };
    
        reservas.push(reserva);
        actualizarModal();
    
        Swal.fire({
            title: 'Habitación añadida',
            text: 'La habitación ha sido añadida a tu reserva.',
            icon: 'success',
            confirmButtonText: 'Genial'
        });
    }
    

    function actualizarModal() {
        reservaContenido.innerHTML = reservas.map((reserva, index) => `
            <div class="modal-reserva" data-index="${index}">
                <div class="modal-titulo">${reserva.titulo}</div>
                <div class="modal-imagenes">${reserva.imagenes}</div>
                <div class="modal-descripcion">
                    <p>¿Cuántas personas reservarán esta habitación?</p>
                </div>
                <div class="modal-contador">
                    <button class="contador-btn btn-menos">-</button>
                    <span class="contador-numero">${reserva.cantidad}</span>
                    <button class="contador-btn btn-mas">+</button>
                    <button class="contador-btn eliminar-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        modal.style.display = reservas.length === 0 ? 'none' : 'block';

        contadorReserva.textContent = reservas.length;

        //botones del contador
        document.querySelectorAll('.btn-mas').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalReserva = e.target.closest('.modal-reserva');
                const index = parseInt(modalReserva.getAttribute('data-index'), 10);
                if (reservas[index].cantidad < 4) {
                    reservas[index].cantidad++;
                    actualizarModal();
                }
            });
        });

        document.querySelectorAll('.btn-menos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalReserva = e.target.closest('.modal-reserva');
                const index = parseInt(modalReserva.getAttribute('data-index'), 10);
                if (reservas[index].cantidad > 1) {
                    reservas[index].cantidad--;
                    actualizarModal();
                }
            });
        });
    }

    //botón de eliminación
    reservaContenido.addEventListener('click', (e) => {
        if (e.target.closest('.eliminar-btn')) {
            const modalReserva = e.target.closest('.modal-reserva');
            const index = parseInt(modalReserva.getAttribute('data-index'), 10);

            Swal.fire({
                title: 'Eliminar reserva',
                text: '¿Estás seguro de que deseas eliminar esta reserva?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    reservas.splice(index, 1);
                    actualizarModal();

                    Swal.fire({
                        title: 'Reserva eliminada',
                        text: 'La reserva ha sido eliminada exitosamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });

    function mostrarReservas() {
        if (reservas.length > 0) {
            actualizarModal();
            modal.style.display = 'block';
        } else {
            Swal.fire({
                title: 'No tienes reservas',
                text: 'No tienes ninguna reserva en tu lista.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
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
            Swal.fire({
                title: 'Sin habitaciones',
                text: 'No hay habitaciones disponibles para agregar.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }
    }

    function confirmarReserva() {
        if (reservas.length > 0) {
            Swal.fire({
                title: 'Confirmar reserva',
                text: '¿Estás seguro de que deseas confirmar esta reserva?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Método de Pago',
                        html: `
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                <form id="pago-form" style="display: flex; flex-direction: column; gap: 12px;">
                                    <label for="cuotas">Número de cuotas:</label>
                                    <select id="cuotas" class="swal2-input">
                                        <option value="1">1 cuota</option>
                                        <option value="2">2 cuotas</option>
                                        <option value="3">3 cuotas</option>
                                    </select>
                                    <label for="tarjeta">Número de tarjeta:</label>
                                    <input type="text" id="tarjeta" class="swal2-input" placeholder="1234 5678 9012 3456" maxlength="19" />
                                    <label for="codigo">Código de seguridad:</label>
                                    <input type="text" id="codigo" class="swal2-input" placeholder="123" maxlength="3" />
                                </form>
                                <label for="fecha">Selecciona la fecha de reserva:</label>
                                <input type="date" id="fecha" class="swal2-input" />
                            </div>
                        `,
                        focusConfirm: false,
                        showCancelButton: true,
                        confirmButtonText: 'Pagar',
                        cancelButtonText: 'Cancelar',
                        preConfirm: () => {
                            const form = document.getElementById('pago-form');
                            const cuotas = form.querySelector('#cuotas').value;
                            const fecha = document.getElementById('fecha').value;
                            const tarjeta = form.querySelector('#tarjeta').value;
                            const codigo = form.querySelector('#codigo').value;
    
                            if (!fecha || !tarjeta || !codigo) {
                                Swal.showValidationMessage('Por favor, completa todos los campos.');
                                return false;
                            }
    
                            return { cuotas, fecha, tarjeta, codigo };
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const { cuotas, fecha, tarjeta, codigo } = result.value;
    
                            Swal.fire({
                                title: 'Recibo de Reserva',
                                html: `
                                    <div style="display: flex; flex-direction: column; gap: 12px;">
                                        <p><strong>Reserva Confirmada</strong></p>
                                        <p>Tu reserva ha sido confirmada.</p>
                                        <p><strong>Detalles del Pago:</strong></p>
                                        <p>Cuotas: ${cuotas}</p>
                                        <p>Fecha: ${fecha}</p>
                                        <p><strong>Detalles de la Tarjeta:</strong></p>
                                        <p>Tarjeta: ${tarjeta.replace(/.(?=.{4})/g, '*')}</p>
                                        <p>Código de Seguridad: ${codigo}</p>
                                        <p><strong>Detalles de la Habitación:</strong></p>
                                        ${reservas.map(reserva => `
                                            <p>Habitación: ${reserva.nombre}</p>
                                            <p>Cantidad de personas: ${reserva.cantidad}</p>
                                        `).join('')}
                                    </div>
                                `,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
    
                            reservas = [];
                            actualizarModal();
                        }
                    });
    
                    document.getElementById('fecha').setAttribute('min', '2024-08-10'); 
                    document.getElementById('fecha').setAttribute('max', '2024-12-31'); 
                }
            });
        } else {
            Swal.fire({
                title: 'Sin reservas',
                text: 'No hay reservas para confirmar.',
                icon: 'info',
                confirmButtonText: 'Entendido'
            });
        }
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

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const contenedorTarjetas = document.querySelector('.contenedor-tarjetas');

            data.forEach(habitacion => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-habitacion';

                const imagenesDiv = document.createElement('div');
                imagenesDiv.className = 'imagen-habitacion';

                const slider = document.createElement('div');
                slider.className = 'slider-imagenes';

                habitacion.imagenes.forEach((imagen, index) => {
                    const img = document.createElement('img');
                    img.src = imagen;
                    img.alt = habitacion.nombre; 
                    if (index === 0) {
                        img.style.opacity = '1';
                    }
                    slider.appendChild(img);
                });

                imagenesDiv.appendChild(slider);

                const contenidoDiv = document.createElement('div');
                contenidoDiv.className = 'contenido-habitacion';

                const titulo = document.createElement('h2');
                titulo.textContent = habitacion.nombre; 

                const descripcion = document.createElement('p');
                descripcion.textContent = habitacion.descripcion;

                const precio = document.createElement('p');
                precio.className = 'precio';
                precio.textContent = `$${habitacion.precio} por noche`;

                const btnReservar = document.createElement('button');
                btnReservar.className = 'btn-reservar';
                btnReservar.textContent = 'Reservar';
                btnReservar.addEventListener('click', () => {
                    abrirModal(tarjeta);
                });

                contenidoDiv.appendChild(titulo);
                contenidoDiv.appendChild(descripcion);
                contenidoDiv.appendChild(precio);
                contenidoDiv.appendChild(btnReservar);

                tarjeta.appendChild(imagenesDiv);
                tarjeta.appendChild(contenidoDiv);

                contenedorTarjetas.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error cargando las habitaciones:', error));

    if (btnTuReserva) {
        btnTuReserva.addEventListener('click', mostrarReservas);
    }

    if (confirmarReservaBtn) {
        confirmarReservaBtn.addEventListener('click', confirmarReserva);
    }
});
