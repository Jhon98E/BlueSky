document.getElementById("formulario-registro").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const nombre = event.target.nombre.value;
    const apellido = event.target.apellido.value;
    const email = event.target.email.value;
    const contrasenia = event.target.contrasenia.value;
  
    try {
      const res = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, apellido, email, contrasenia })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        window.location.href = "inicioSesion.html";
      } else {
        console.error("Error al registrarse:", data.message);
        document.querySelector(".error").textContent = data.message;
        document.querySelector(".error").classList.remove("escondido");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      document.querySelector(".error").textContent = "Error al registrarse";
      document.querySelector(".error").classList.remove("escondido");
    }
  });
  