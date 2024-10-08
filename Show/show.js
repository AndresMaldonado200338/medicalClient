document.getElementById('dateRangeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    // Validar fechas
    if (!fechaInicio || !fechaFin) {
        alert('Por favor, ingrese ambas fechas.');
        return;
    }

    // Hacer la solicitud al servidor
    fetch(`http://localhost:3000/citas/data/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red.');
            }
            return response.json();
        })
        .then(data => {
            const citasContainer = document.getElementById('citasContainer');
            citasContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas citas

            if (!Array.isArray(data) || data.length === 0) {
                citasContainer.innerHTML = '<p>No se encontraron citas en el rango de fechas proporcionado.</p>';
                return;
            }

            data.forEach(cita => {
                const citaElement = document.createElement('div');
                citaElement.classList.add('col-md-4', 'mb-4');

                citaElement.innerHTML = `
                    <div class="card">
                        <img src="http://localhost:3000/citas/images/${cita.ImageFile || 'placeholder.jpg'}" class="card-img-top" alt="Imagen de la cita" data-bs-toggle="modal" data-bs-target="#imageModal" data-image-src="http://localhost:3000/citas/images/${cita.ImageFile || 'placeholder.jpg'}">
                        <div class="card-body">
                            <h5 class="card-title">ID: ${cita.Id}</h5>
                            <p class="card-text">Estado: ${cita.Estado}</p>
                            <p class="card-text">Fecha: ${cita.Fecha || cita.appointmentDate}</p>
                            <p class="card-text">Descripción: ${cita.Descripción || 'No disponible'}</p>
                        </div>
                    </div>
                `;

                citasContainer.appendChild(citaElement);
            });

            document.querySelectorAll('.card-img-top').forEach(img => {
                img.addEventListener('click', function () {
                    const src = this.getAttribute('data-image-src');
                    document.getElementById('modalImage').setAttribute('src', src);
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener citas:', error);
            alert('Error al obtener citas. Por favor, inténtelo de nuevo más tarde.');
        });
});
