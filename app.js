document.getElementById('procedureform').addEventListener('submit', function(event) {
  event.preventDefault();

  const data = {
    resourceType: "ServiceRequest",
    status: "active",
    intent: "order",
    subject: {
      display: `${document.getElementById("name").value} ${document.getElementById("lastName").value}`,
    },
    performer: [
      {
        display: document.getElementById("practitionerName").value,
      },
    ],
    occurrenceDateTime: document.getElementById("performedDateTime").value,
    code: {
      text: document.getElementById("description").value,
    },
    supportingInfo: [
      {
        telecom: [
          {
            system: "phone",
            value: document.getElementById("phone").value,
          },
          {
            system: "email",
            value: document.getElementById("email").value || "",
          }
        ],
        gender: document.getElementById("gender").value,
      },
    ],
  };

  try {
    const response = await fetch("https://hl7-fhir-ehr-michael.onrender.com/service-request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Procedimiento registrado exitosamente. ID: " + result._id);
      document.getElementById("procedureForm").reset();
    } else {
      const errorData = await response.json();
      alert("Error al registrar procedimiento: " + errorData.detail);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión con el servidor.");
  }
});

  });
});

