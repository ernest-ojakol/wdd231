// Set current timestamp in hidden field
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
const modals = document.querySelectorAll('.modal');
const buttons = document.querySelectorAll('button[data-modal]');
const closeModalButtons = document.querySelectorAll('.close-modal');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});