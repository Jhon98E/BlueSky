document.addEventListener("DOMContentLoaded", async () => {
    const vueloId = localStorage.getItem('vueloSeleccionado')

    if (!vueloId) {
        alert("No se ha seleccionado ningún vuelo.")
        window.location.href = 'verVuelos.html'
        return
    }

    try {
        const response = await fetch(`http://127.0.0.1:3000/vuelos/${vueloId}`)
        const vuelo = await response.json()
        const tbody = document.querySelector("#vuelo-seleccionado-table tbody")

        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${vuelo.vuelo_id}</td>
            <td>${vuelo.origen}</td>
            <td>${vuelo.destino}</td>
            <td>${new Date(vuelo.fecha_salida).toLocaleDateString()}</td>
            <td>${vuelo.fecha_regreso ? new Date(vuelo.fecha_regreso).toLocaleDateString() : "N/A"}</td>
            <td>${vuelo.precio}</td>
            <td>${vuelo.tipo_vuelo}</td>
        `

        tbody.appendChild(row)

        document.getElementById("confirmar-pago").addEventListener("click", () => {
            const metodoPago = document.getElementById("metodo-pago").value
            alert(`Vuelo ${vueloId} seleccionado con método de pago: ${metodoPago}`)
            // Aquí puedes añadir la lógica adicional para procesar el pago
        })
    } catch (error) {
        console.error("Error al obtener los datos del vuelo:", error)
    }
})
