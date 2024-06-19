document.addEventListener("DOMContentLoaded", () => {
    const vueloDetalles = JSON.parse(localStorage.getItem("vueloDetalles"))
    const metodoPago = localStorage.getItem("metodoPago")
    const datosPago = JSON.parse(localStorage.getItem("datosPago"))
    const cliente_id = localStorage.getItem("cliente_id")

    if (!vueloDetalles || !metodoPago || !datosPago || !cliente_id) {
        alert("No se encontraron los detalles de la reserva. Por favor, vuelve a seleccionar el vuelo y el método de pago.")
        window.location.href = "verVuelos.html"
        return
    }

    const vueloDetallesDiv = document.getElementById("vuelo-detalles")
    const pagoDetallesDiv = document.getElementById("pago-detalles")

    vueloDetallesDiv.innerHTML = `
        <p><strong>ID:</strong> ${vueloDetalles.vuelo_id}</p>
        <p><strong>Origen:</strong> ${vueloDetalles.origen}</p>
        <p><strong>Destino:</strong> ${vueloDetalles.destino}</p>
        <p><strong>Fecha de Salida:</strong> ${new Date(vueloDetalles.fecha_salida).toLocaleDateString()}</p>
        <p><strong>Fecha de Regreso:</strong> ${vueloDetalles.fecha_regreso ? new Date(vueloDetalles.fecha_regreso).toLocaleDateString() : "N/A"}</p>
        <p><strong>Precio:</strong> ${vueloDetalles.precio}</p>
        <p><strong>Tipo de Vuelo:</strong> ${vueloDetalles.tipo_vuelo}</p>
    `

    pagoDetallesDiv.innerHTML = `
        <p><strong>Método de Pago:</strong> ${metodoPago}</p>
        ${Object.entries(datosPago).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('')}
    `

    const confirmarReservaBtn = document.getElementById("confirmar-reserva")

    confirmarReservaBtn.addEventListener("click", async () => {
        try {
            
            if (!cliente_id) {
                throw new Error("Cliente no autenticado")
            }

            const reservaResponse = await fetch("http://127.0.0.1:3000/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cliente_id,
                    vuelo_id: vueloDetalles.vuelo_id,
                    fecha_reserva: new Date().toISOString().split('T')[0],
                    estado: "Confirmada"
                })
            })

            if (!reservaResponse.ok) {
                throw new Error("Error al registrar la reserva")
            }

            const reserva = await reservaResponse.json()

            const metodoPagoResponse = await fetch(`http://127.0.0.1:3000/metodo-de-pago`)
            if (!metodoPagoResponse.ok) {
                throw new Error("Error al obtener el método de pago")
            }

            const metodosPago = await metodoPagoResponse.json()            

            const metodoPagoData = metodosPago.find(metodo => metodo.nombre_metodo.toLowerCase() === metodoPago.toLowerCase())
            
            if (!metodoPagoData) {
                throw new Error("Método de pago no encontrado")
            }

            const metodoPagoId = metodoPagoData.metodo_id

            const pagoData = {
                reserva_id: reserva.id,
                monto: vueloDetalles.precio,
                fecha_pago: new Date().toISOString().split('T')[0],
                metodo_pago: metodoPagoId
            }

            console.log("Datos del pago:", pagoData)

            const pagoResponse = await fetch("http://127.0.0.1:3000/pagos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pagoData)
            })

            if (!pagoResponse.ok) {
                const errorText = await pagoResponse.text()
                throw new Error("Error al registrar el pago: " + errorText)
            }

            alert("Reserva y pago registrados exitosamente")
            window.location.href = "cliente.html"

        } catch (error) {
            console.error("Error al registrar la reserva o el pago:", error)
            alert("Ocurrió un error al confirmar la reserva y el pago. Por favor, intenta nuevamente.")
        }
    })
})
