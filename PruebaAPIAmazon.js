const clientId = '486dd899-24fd-45ff-9f14-aab90454cbd1'; 
const redirectUri = 'https://idiamer0707.github.io/PruebaAPIAmazon/'; 
const tokenUrl = 'https://api.musicapi.com/oauth2/token';
let accessToken = '';

document.getElementById('loguin').addEventListener('click', () => {
    const state = Math.random().toString(36).substring(7); 
    const scope = 'metrics'; 
    const authUrl = `https://api.musicapi.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&response_type=code`;

    
    window.location.href = authUrl;
});


async function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
       
        accessToken = await getAccessToken(authCode);
        
        getUserMetrics();
    }
}


async function getAccessToken(authCode) {
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&client_id=${clientId}&client_secret=TU_CLIENT_SECRET&redirect_uri=${encodeURIComponent(redirectUri)}&code=${authCode}`,
    });

    const data = await response.json();
    return data.access_token; 
}


async function getUserMetrics() {
    const metricsUrl = 'https://api.musicapi.com/v1/user/metrics'; 

    const response = await fetch(metricsUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`, 
        },
    });

    const data = await response.json();

    
    document.getElementById('seguidores').textContent = `Seguidores: ${data.followers}`;
    document.getElementById('image').src = data.profileImage || '';
}


if (window.location.search.includes('code')) {
    handleAuthCallback();
}
