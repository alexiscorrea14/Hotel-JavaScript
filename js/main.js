// Proyecto hotel 
const cuartos = [
    { numero: 101, tipo: "Simple", precioSemana: 6000, precioFinDeSemana: 8000, reservado: false },
    { numero: 102, tipo: "Doble", precioSemana: 8000, precioFinDeSemana: 10000, reservado: true },
    { numero: 103, tipo: "Suite", precioSemana: 12000, precioFinDeSemana: 15000, reservado: false },
    { numero: 104, tipo: "Simple", precioSemana: 6000, precioFinDeSemana: 8000, reservado: false },
    { numero: 105, tipo: "Doble", precioSemana: 8000, precioFinDeSemana: 10000, reservado: true },
    { numero: 106, tipo: "Suite", precioSemana: 12000, precioFinDeSemana: 15000, reservado: false },
    { numero: 107, tipo: "Simple", precioSemana: 6000, precioFinDeSemana: 8000, reservado: false },
    { numero: 108, tipo: "Doble", precioSemana: 8000, precioFinDeSemana: 10000, reservado: true }
];

function calcularPrecio(cuarto, cantidadDias, esFinDeSemana) {
    let precioPorDia;
    if (esFinDeSemana) {
        precioPorDia = cuarto.precioFinDeSemana;
    } else {
        precioPorDia = cuarto.precioSemana;
    }
    return cantidadDias * precioPorDia;
}

function mostrarCuartosDisponibles() {
    console.table(cuartos);
    let disponibles = cuartos.filter(cuarto => cuarto.reservado === false);
    if (disponibles.length === 0) {
        alert("No hay cuartos disponibles.");
    } else {
        alert("Cuartos disponibles:");
        disponibles.forEach(cuarto => {
            alert(`Número: ${cuarto.numero}, Tipo: ${cuarto.tipo}, Precio semana: ${cuarto.precioSemana}, Precio fin de semana: ${cuarto.precioFinDeSemana}`);
        });
    }
}

function generarRecibo(cuarto, cantidadDias, precioTotal) {
    let fecha = new Date();
    console.log("----- Recibo de Reserva -----");
    console.log(`Fecha: ${fecha.toLocaleDateString()} Hora: ${fecha.toLocaleTimeString()}`);
    console.log(`Cuarto reservado: ${cuarto.numero}`);
    console.log(`Tipo de cuarto: ${cuarto.tipo}`);
    console.log(`Días de estadía: ${cantidadDias}`);
    console.log(`Precio total: $${precioTotal}`);
    console.log("------------------------------");
}

function reservarCuarto() {
    console.table(cuartos);

    let numeroCuarto = parseInt(prompt("Ingrese el número del cuarto que desea reservar:"));
    let cuarto = cuartos.find(cuarto => cuarto.numero === numeroCuarto);

    if (cuarto === undefined) {
        alert("Número de cuarto inválido.");
        return;
    }

    if (cuarto.reservado === true) {
        alert("El cuarto ya está ocupado.");
        return;
    }

    let tipoDia = prompt("¿Está reservando para días de semana o fines de semana? (escriba 'semana' o 'fin de semana')").toLowerCase();
    let esFinDeSemana = tipoDia === "fin de semana";
    let cantidadDias = parseInt(prompt("Ingrese la cantidad de días de estadía:"));

    if (isNaN(cantidadDias) || cantidadDias <= 0) {
        alert("Por favor, ingrese un número válido para la cantidad de días.");
        return;
    }

    let precioTotal = calcularPrecio(cuarto, cantidadDias, esFinDeSemana);
    alert(`El precio total para ${cantidadDias} días es: $ ${precioTotal}.`);

    cuarto.reservado = true;
    alert("Cuarto reservado con éxito.");
    
    generarRecibo(cuarto, cantidadDias, precioTotal);
}

function iniciarTrabajo() {
    alert("Bienvenidos al sistema del Hotel Estrella !!  \n Aquí puede gestionar los precios del hotel y reservar cuartos.");

    let continuar = true;

    while (continuar) {
        let opcion = prompt("Seleccione una opción:\n 1. Calcular precio para días de semana.\n 2. Calcular precio para fines de semana y feriados.\n 3. Reservar un cuarto.\n 4. CANCELAR.");

        if (opcion.toUpperCase() === "CANCELAR" || opcion === "4") {
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
            case 3:
                reservarCuarto();
                break;
            default:
                alert("Opción inválida. Por favor, seleccione una opción válida.");
        }

        continuar = confirm("¿Desea realizar otra operación?");
    }

    alert("Gracias por usar el sistema del Hotel Estrella.");
}

iniciarTrabajo();