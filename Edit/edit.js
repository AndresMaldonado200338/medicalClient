document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editCitaForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const citaIdElement = document.getElementById('citaId');
            const estadoCitaElement = document.getElementById('estadoCita');
            const citaId = citaIdElement.value.trim();
            const estadoCita = estadoCitaElement.value.trim();

            citaIdElement.classList.remove('is-invalid');
            estadoCitaElement.classList.remove('is-invalid');

            let isValid = true;

            if (!citaId) {
                citaIdElement.classList.add('is-invalid');
                isValid = false;
            }

            if (estadoCita !== 'cancelado') {
                estadoCitaElement.classList.add('is-invalid');
                alert('El único estado permitido es "Cancelado".');
                isValid = false;
            }

            if (isValid) {
                const citaInfo = {
                    Estado: estadoCita
                };

                fetch(`http://localhost:3000/citas/data/${citaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(citaInfo)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.message); });
                    }
                    return response.text();
                })
                .then(message => {
                    alert(message);
                })
                .catch(error => {
                    alert('Error al actualizar la cita: ' + error.message);
                });
            }
        });
    } else {
        console.error('Formulario con ID "editCitaForm" no encontrado.');
    }
});
