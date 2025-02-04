// Get URL parameters and display them on the page
const params = new URLSearchParams(window.location.search);

document.getElementById('first-name').textContent = params.get('first-name') || 'N/A';
document.getElementById('last-name').textContent = params.get('last-name') || 'N/A';
document.getElementById('email').textContent = params.get('email') || 'N/A';
document.getElementById('mobile').textContent = params.get('mobile') || 'N/A';
document.getElementById('organization-name').textContent = params.get('organization-name') || 'N/A';
document.getElementById('timestamp').textContent = params.get('timestamp') || 'N/A';