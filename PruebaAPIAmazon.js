
const clientId = '486dd899-24fd-45ff-9f14-aab90454cbd1'; // Client ID
const redirectUri = 'http://localhost:3000/callback'; 
const apiUrl = 'https://api.musicapi.com';

function getAuthUrl() {
    const scope = 'metrics'; // Define el alcance
    const state = Math.random().toString(36).substring(7);
    return `${apiUrl}/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&response_type=code`;
}

function loginUser() {
    window.location.href = getAuthUrl();
}

// Intercambiar código por token
async function exchangeCodeForToken(authCode) {
    const response = await fetch(`${apiUrl}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${authCode}`
    });
    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        fetchMetrics(data..access_token);
    } else {
        console.error('Error obteniendo el token:', data);
    }
}

// Obtener métricas del usuario
async function fetchMetrics(token) {
    const response = await fetch(`${apiUrl}/user/metrics`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const metrics = await response.json();
    console.log('Métricas del usuario:', metrics);
    displayMetrics(metrics);
}

function displayMetrics(metrics) {
    const metricsContainer = document.getElementById('metrics');
    metricsContainer.innerHTML = JSON.stringify(metrics, null, 2);
}

// Procesar URL tras el login
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code');
    if (authCode) {
        exchangeCodeForToken(authCode);
    }
};
