document.getElementById('subscriberForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar que la página se recargue

    const authToken = document.getElementById('authToken').value;
    const resultElement = document.getElementById('result');
    
    resultElement.textContent = "Cargando...";

    try {
        const response = await fetch('https://api.musicapi.com/v1/artist/subscribers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        resultElement.textContent = `Número de suscriptores: ${data.subscribers}`;
    } catch (error) {
        resultElement.textContent = `Error al obtener datos: ${error.message}`;
    }
});



