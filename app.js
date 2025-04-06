document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const name = document.getElementById("paciente").value.trim();
  const birthDate = document.getElementById("consulta").value.trim(); // Asumido como fecha de nacimiento
  const practitioner = document.getElementById("medico").value.trim(); // Este no es parte de Patient FHIR pero lo dejamos como nota
  const gender = "unknown"; // Si no hay input de género, se puede ajustar
  const identifier = document.getElementById("cedula").value.trim();

  // Crear objeto FHIR tipo Patient
  const patientFHIR = {
    resourceType: "Patient",
    name: [
      {
        use: "official",
        text: name
      }
    ],
    gender: gender,
    birthDate: birthDate,
    identifier: [
      {
        use: "official",
        system: "http://hospital.example.org/cedula",
        value: identifier
      }
    ]
  };

  try {
    const response = await fetch("https://hl7-fhir-ehr-michael.onrender.com/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patientFHIR)
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const result = await response.json();
    alert("Paciente registrado correctamente ✅");
    console.log("Respuesta del servidor:", result);
  } catch (error) {
    alert("Hubo un error al registrar el paciente ❌");
    console.error("Error:", error);
  }
});
