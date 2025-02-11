window.addEventListener('load', function() {
    fetch('data/discover.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.discover_cards');

            data.forEach(attraction => {
                const card = document.createElement('div');
                card.classList.add('discover-card');

                const title = document.createElement('h2');
                title.textContent = attraction.name;
                card.appendChild(title);

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = attraction.image;
                img.alt = attraction.name;
                img.style.width = '300px';
                img.style.height = '200px';
                figure.appendChild(img);
                card.appendChild(figure);

                const address = document.createElement('address');
                address.textContent = attraction.address;
                card.appendChild(address);

                const description = document.createElement('p');
                description.textContent = attraction.description;
                card.appendChild(description);

                const button = document.createElement('button');
                button.textContent = 'Learn more';
                card.appendChild(button);

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading the discover.json:', error));

    const lastVisit = localStorage.getItem('lastVisit');
    const visitorMessage = document.getElementById('visitor-message');
    const dismissButton = document.getElementById('dismiss-message');

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (!lastVisit) {
        localStorage.setItem('lastVisit', currentTime);
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDifference = currentTime - lastVisitDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysDifference < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            if (daysDifference === 1) {
                visitorMessage.textContent = "You last visited 1 day ago.";
            } else {
                visitorMessage.textContent = `You last visited ${daysDifference} days ago.`;
            }
        }
        localStorage.setItem('lastVisit', currentTime);
    }

    dismissButton.addEventListener('click', function() {
        document.getElementById('visitor-info').style.display = 'none';
    });
});
