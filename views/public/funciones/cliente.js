document.addEventListener("DOMContentLoaded", async () => {
    const clienteId = localStorage.getItem("cliente_id");

    if (!clienteId) {
        console.error("No se encontró cliente_id en localStorage");
        return;
    }

    try {
        // Obtener datos del cliente
        const clienteRes = await fetch(`http://localhost:3000/registro/${clienteId}`);
        const clienteData = await clienteRes.json();
        if (!clienteRes.ok) {
            throw new Error(clienteData.message);
        }

        // Mostrar el nombre del cliente
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.textContent = `Bienvenido Cliente: ${clienteData.nombre} ${clienteData.apellido}`;

        // Obtener reservas del cliente
        const reservasRes = await fetch(`http://localhost:3000/reservas/cliente/${clienteId}`);
        const reservasData = await reservasRes.json();
        if (!reservasRes.ok) {
            throw new Error(reservasData.message);
        }

        // Mostrar la lista de reservas en una tabla
        const reservasTableBody = document.querySelector("#reservas-table tbody");
        reservasData.forEach(reserva => {
            const row = document.createElement("tr");

            const reservaIdCell = document.createElement("td");
            reservaIdCell.textContent = reserva.reserva_id;
            row.appendChild(reservaIdCell);

            const vueloIdCell = document.createElement("td");
            vueloIdCell.textContent = reserva.vuelo_id;
            row.appendChild(vueloIdCell);

            const fechaCell = document.createElement("td");
            // Asegurarse de que la fecha sea válida y formatearla
            const fecha = new Date(reserva.fecha_reserva).toLocaleDateString();
            fechaCell.textContent = fecha !== "Invalid Date" ? fecha : "Fecha no disponible";
            row.appendChild(fechaCell);
            
            const fechaSalidaCell = document.createElement("td");
            const fechaSalida = new Date(reserva.fecha_salida).toLocaleDateString();
            fechaSalidaCell.textContent = fechaSalida !== "Invalid Date" ? fechaSalida : "Fecha no disponible";
            row.appendChild(fechaSalidaCell);

            const estadoCell = document.createElement("td");
            estadoCell.textContent = reserva.estado;
            row.appendChild(estadoCell);

            reservasTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar datos del cliente:", error);
    }
});
