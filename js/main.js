// Hice los Algoritmos referidos a un hotel.

function calcularPrecioSemana() {
    alert("Bienvenidos al Hotel estrella !! \n Les dejamos los precios para días de semana.");

    let cantidadDias = prompt("Ingrese la cantidad de días que se queda o escriba CANCELAR para salir :");
    let precioPorDia = 6000; 

    if (cantidadDias.toUpperCase() === "CANCELAR") {
        alert("Operación cancelada.");
        return; 
    }

    if (isNaN(cantidadDias) || cantidadDias <= 0) {
        alert("Por favor, ingrese un número válido para la cantidad de días.");
    } else {
        cantidadDias = parseInt(cantidadDias);

        let precioTotal = cantidadDias * precioPorDia;

        alert(`El precio total para ${cantidadDias} días de semana es: $ ${precioTotal}.`);
    }
}

function calcularPrecioFinDeSemana() {
    alert("Bienvenidos al Hotel estrella !! \n Les dejamos los precios para fines de semana y feriados.");

    let cantidadDias = prompt("Ingrese la cantidad de días de estadía o escriba CANCELAR para salir:");
    let precioPorDia = 8000;

    if (cantidadDias.toUpperCase() === "CANCELAR") {
        alert("Operación cancelada.");
        return;
    }

    if (isNaN(cantidadDias) || cantidadDias <= 0) {
        alert("Por favor, ingrese un número válido para la cantidad de días.");
    } else {
        cantidadDias = parseInt(cantidadDias);

        let precioTotal = cantidadDias * precioPorDia;

        alert(`El precio total para ${cantidadDias} días en fines de semana y feriados es: $ ${precioTotal}.`);
    }
}

function iniciarTrabajo() {
    alert("Bienvenidos al sistema del Holtel Estrella !!  \n Aqui puede gestionar los precios del hotel.");

    let opcion = prompt("Seleccione una opción:\n 1. Calcular precio para días de semana.\n 2. Calcular precio para fines de semana y feriados.\n 3. CANCELAR.");

    opcion = opcion.toUpperCase();

    if (opcion === "CANCELAR") {
        alert("Operación cancelada.");
        return; 
    }

    opcion = parseInt(opcion);

    switch (opcion) {
        case 1:
            calcularPrecioSemana();
            break;
        case 2:
            calcularPrecioFinDeSemana();
            break;
        default:
            alert("Opción inválida. Por favor, seleccione una opción válida.");
    }
}

iniciarTrabajo();