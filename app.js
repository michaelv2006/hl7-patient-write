document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("procedureForm");
  const statusMsg = document.getElementById("status");
  const errorMsg = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Oculta mensajes anteriores
    statusMsg.style.display = "none";
    errorMsg.style.display = "none";

    // Captura los datos del formulario
    const data = {
      name: document.getElementById("name").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      practitionerName: document.getElementById("practitionerName").value.trim(),
      performedDateTime: document.getElementById("performedDateTime").value,
      description: document.getElementById("description").value.trim(),
    };

    try {
      const response = await fetch("https://hl7-fhir-ehr-michael.onrender.com/procedures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        statusMsg.style.display = "block";
        form.reset();
      } else {
        const resText = await response.text();
        console.error("Error en respuesta:", resText);
        errorMsg.innerText = "Error del servidor: " + resText;
        errorMsg.style.display = "block";
      }
    } catch (error) {
      console.error("Error al conectar:", error);
      errorMsg.innerText = "Fallo de conexión: " + error.message;
      errorMsg.style.display = "block";
    }
  });
});

