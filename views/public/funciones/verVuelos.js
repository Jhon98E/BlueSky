document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("http://127.0.0.1:3000/vuelos")
        const vuelos = await res.json()
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
                <td><button class="btn btn-primary seleccionar-vuelo" data-id="${vuelo.vuelo_id}">Seleccionar</button></td>
            `

            tbody.appendChild(row)
        })

        document.querySelectorAll(".seleccionar-vuelo").forEach(button => {
            button.addEventListener("click", event => {
                const vueloId = event.target.dataset.id
                localStorage.setItem('vueloSeleccionado', vueloId)
                window.location.href = 'metodoPago.html'
            })
        })

    } catch (error) {
        console.error("Error al obtener los datos de los vuelos:", error)
    }
})
