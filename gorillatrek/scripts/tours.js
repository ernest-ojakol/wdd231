let companies = [];  // Declare a global variable to hold the companies data

// Function to fetch companies from the tour.json file
async function fetchCompanies() {
    try {
        const response = await fetch('data/tours.json');  // Use relative path to the JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        companies = await response.json();  // Store the fetched companies data in the global variable
    } catch (error) {
        console.error('Failed to fetch companies:', error);
    }
}

function displayCompanies(viewType) {
    const container = document.getElementById("tours-container");
    container.innerHTML = ''; // Clear existing content

    companies.forEach(company => {
        const tourCard = document.createElement("div");
        tourCard.classList.add("tour-card");

        tourCard.innerHTML = `
            <img src="${company.image}" alt="${company.name} logo">
            <h2>${company.name}</h2>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
            <p><strong>Costing:</strong>$ ${company.costing}</p>
            <p>${company.additionalInfo}</p>
            <button class="see-more-btn">See More</button>
        `;

        container.appendChild(tourCard);
    });

    // Ensure grid-view styles are applied
    container.classList.add("grid-view");
    container.classList.remove("list-view");
}

// Initialize the page with the default view (list)
async function initializePage() {
    await fetchCompanies();  // Fetch the companies before rendering
    displayCompanies('list');  // Start with the list view
}

initializePage();
