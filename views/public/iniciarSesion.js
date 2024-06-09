document.getElementById("formulario-login").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const contrasenia = event.target.contrasenia.value;

    if (!email || !contrasenia) {
      document.querySelector(".error").textContent = "Todos los campos son obligatorios";
      document.querySelector(".error").classList.remove("escondido");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/registro/iniciar-sesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, contrasenia })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        window.location.href = "cliente.html";
      } else {
        console.error("Error al iniciar sesión:", data.message);
        document.querySelector(".error").textContent = data.message;
        document.querySelector(".error").classList.remove("escondido");
      }
    } catch (error) {
      console.error("Error al iniciar Sesión:", error);
      document.querySelector(".error").textContent = "Error al conectar con el servidor";
      document.querySelector(".error").classList.remove("escondido");
    }
  });
  