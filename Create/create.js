document.getElementById('newAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const documentNumber = document.getElementById('floatingInputDocumentNumber');
    const appointmentDate = document.getElementById('floatingInputAppointmentDate');
    const image = document.getElementById('inputGroupFile04');

    const totalDocumentNumbers = /^\d+$/;
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    documentNumber.classList.remove('is-invalid');
    appointmentDate.classList.remove('is-invalid');
    image.classList.remove('is-invalid');

    document.getElementById('docNumberInvalidText').style.display = 'none';
    document.getElementById('docNumberLengthInvalidText').style.display = 'none';
    document.getElementById('appointmentDateInvalidText').style.display = 'none';
    document.getElementById('appointmentDatePastText').style.display = 'none';
    document.getElementById('notFileLoaded').style.display = 'none';
    document.getElementById('fileNotImage').style.display = 'none';

    let isValid = true;

    if (!totalDocumentNumbers.test(documentNumber.value)) {
        documentNumber.classList.add('is-invalid');
        document.getElementById('docNumberInvalidText').style.display = 'block';
        isValid = false;
    } else if (documentNumber.value.length < 7 || documentNumber.value.length > 10) {
        documentNumber.classList.add('is-invalid');
        document.getElementById('docNumberLengthInvalidText').style.display = 'block';
        isValid = false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!appointmentDate.value) {
        appointmentDate.classList.add('is-invalid');
        document.getElementById('appointmentDateInvalidText').style.display = 'block';
        isValid = false;
    } else if (appointmentDate.value < today) {
        appointmentDate.classList.add('is-invalid');
        document.getElementById('appointmentDatePastText').style.display = 'block';
        isValid = false;
    }

    const file = image.files[0];
    if (!file) {
        image.classList.add('is-invalid');
        document.getElementById('notFileLoaded').style.display = 'block';
        isValid = false;
    } else if (!allowedImageTypes.includes(file.type)) {
        image.classList.add('is-invalid');
        document.getElementById('fileNotImage').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const formData = new FormData();
        formData.append('cc', documentNumber.value);
        formData.append('Fecha', appointmentDate.value);
        formData.append('file', file);

        fetch('http://localhost:3000/citas/data', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                showSuccessPopup(data.Id);
                document.getElementById('newAppointmentForm').reset();
            })
            .catch(error => {
                alert('Error al crear la cita: ' + error.message);
            });
    }
});

function showSuccessPopup(citaId) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>Su cita con ID ${citaId} ha sido creada exitosamente.</p>
            <button onclick="copyToClipboard('${citaId}')" class="btn btn-outline-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
            </button>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 5000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('ID de la cita copiado al portapapeles');
    }, (err) => {
        alert('Error al copiar al portapapeles: ' + err);
    });
}
