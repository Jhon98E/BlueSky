document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      window.location.href = "paginaInicio.html"
    } else {
      const data = await res.json()
      console.error("Error al cerrar sesión:", data.message)
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
})
