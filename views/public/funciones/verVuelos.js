document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://127.0.0.1:3000/vuelos")
        const vuelos = await response.json()
        const tbody = document.querySelector("#vuelos-table tbody")

        vuelos.forEach(vuelo => {
            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${vuelo.vuelo_id}</td>
                <td>${vuelo.origen}</td>
                <td>${vuelo.destino}</td>
                <td>${new Date(vuelo.fecha_salida).toLocaleDateString()}</td>
                <td>${vuelo.fecha_regreso ? new Date(vuelo.fecha_regreso).toLocaleDateString() : "N/A"}</td>
                <td>${vuelo.precio}</td>
                <td>${vuelo.tipo_vuelo}</td>
            `;

            tbody.appendChild(row)
        })
    } catch (error) {
        console.error("Error al obtener los datos de los vuelos:", error)
    }
})