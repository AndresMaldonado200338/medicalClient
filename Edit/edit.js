document.getElementById('editCitaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const citaId = document.getElementById('citaId');
    const estadoCita = document.getElementById('estadoCita');

    citaId.classList.remove('is-invalid');
    estadoCita.classList.remove('is-invalid');

    let isValid = true;

    if (!citaId.value.trim()) {
        citaId.classList.add('is-invalid');
        isValid = false;
    }

    if (!estadoCita.value) {
        estadoCita.classList.add('is-invalid');
        isValid = false;
    }

    // Verifica si el estado seleccionado es "cancelado"
    if (estadoCita.value !== 'cancelado') {
        alert('El único estado permitido es "Cancelado".');
        estadoCita.classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        const citaInfo = {
            Estado: estadoCita.value
        };

        fetch(`http://localhost:3000/citas/data/${citaId.value}`, {
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
