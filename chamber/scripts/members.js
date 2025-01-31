let companies = [];  // Declare a global variable to hold the companies data

// Function to fetch companies from the member.json file
async function fetchCompanies() {
    try {
        const response = await fetch('data/members.json');  // Use relative path to the JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        companies = await response.json();  // Store the fetched companies data in the global variable
    } catch (error) {
        console.error('Failed to fetch companies:', error);
    }
}

// const footerParagraphs = document.querySelectorAll('footer div p');
// const currentYear = new Date().getFullYear();
// footerParagraphs[0].innerText = `${currentYear} Ernest Ojakol - Kampala, Uganda`;
// footerParagraphs[1].innerText = `Last modified: ${document.lastModified}`;

function displayCompanies(viewType) {
    const container = document.getElementById("members-container");
    container.innerHTML = ''; // Clear existing content

    // If the viewType is 'list', display the data in a table format
    if (viewType === 'list') {
        const table = document.createElement('table');
        table.classList.add('company-table');
        
        // Create Table Header Row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Logo</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Membership Level</th>
            <th>Additional Info</th>
        `;
        table.appendChild(headerRow);

        // Add Rows for Each Company
        companies.forEach(company => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${company.image}" alt="${company.name} logo" class="company-logo"></td>
                <td>${company.name}</td>
                <td>${company.address}</td>
                <td>${company.phone}</td>
                <td><a href="${company.website}" target="_blank">${company.website}</a></td>
                <td>${company.membershipLevel === 1 ? 'Member' : company.membershipLevel === 2 ? 'Silver' : 'Gold'}</td>
                <td>${company.additionalInfo}</td>
            `;
            table.appendChild(row);
        });

        // Append the table to the container
        container.appendChild(table);
        
        // Ensure list-view styles are applied
        container.classList.add("list-view");
        container.classList.remove("grid-view");
    } else { // If the viewType is 'grid', display data in card format
        companies.forEach(company => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${company.image}" alt="${company.name} logo">
                <h2>${company.name}</h2>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Membership Level:</strong> ${company.membershipLevel === 1 ? 'Member' : company.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
                <p>${company.additionalInfo}</p>
            `;

            container.appendChild(memberCard);
        });

        // Ensure grid-view styles are applied
        container.classList.add("grid-view");
        container.classList.remove("list-view");
    }
}

// Toggle view function
let isGridView = false;
const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", () => {
    isGridView = !isGridView;
    displayCompanies(isGridView ? 'grid' : 'list');  // Pass the current view type
    toggleButton.textContent = isGridView ? "Switch to List View" : "Switch to Grid View";
});

// Initialize the page with the default view (list)
async function initializePage() {
    await fetchCompanies();  // Fetch the companies before rendering
    displayCompanies('list');  // Start with the list view
}

initializePage();
