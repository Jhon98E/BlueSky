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

        const metodoPagoSelect = document.getElementById("metodo-pago")
        const formularioTarjeta = document.getElementById("formulario-tarjeta")
        const formularioPaypal = document.getElementById("formulario-paypal")
        const formularioTransferencia = document.getElementById("formulario-transferencia")

        metodoPagoSelect.addEventListener("change", (event) => {
            const metodoSeleccionado = event.target.value;
            formularioTarjeta.style.display = metodoSeleccionado === "tarjeta" ? "block" : "none"
            formularioPaypal.style.display = metodoSeleccionado === "paypal" ? "block" : "none"
            formularioTransferencia.style.display = metodoSeleccionado === "transferencia" ? "block" : "none"
        })

        document.getElementById("confirmar-pago").addEventListener("click", () => {
            const metodoPago = metodoPagoSelect.value
            let datosPago = {}

            if (metodoPago === "tarjeta") {
                datosPago = {
                    numeroTarjeta: document.getElementById("numero-tarjeta").value,
                    nombreTarjeta: document.getElementById("nombre-tarjeta").value,
                    fechaExpiracion: document.getElementById("fecha-expiracion").value,
                    cvv: document.getElementById("cvv").value
                }
            } else if (metodoPago === "paypal") {
                datosPago = {
                    emailPaypal: document.getElementById("email-paypal").value
                }
            } else if (metodoPago === "transferencia") {
                datosPago = {
                    nombreBanco: document.getElementById("nombre-banco").value,
                    numeroCuenta: document.getElementById("numero-cuenta").value,
                    nombreTitular: document.getElementById("nombre-titular").value,
                    tipoCuenta: document.getElementById("tipo-cuenta").value
                }
            }

            alert(`Vuelo ${vueloId} seleccionado con método de pago: ${metodoPago}\nDatos de Pago: ${JSON.stringify(datosPago)}`)
            // Aquí puedes añadir la lógica adicional para procesar el pago
        })
        
    } catch (error) {
        console.error("Error al obtener los datos del vuelo:", error)
    }
})
