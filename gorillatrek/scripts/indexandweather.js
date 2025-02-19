//Week 03
async function loadEvents() {
    console.log("loading events");
    try {
        const response = await fetch('./data/awareness.json');
        const eventsData = await response.json();

        const eventsCard = document.querySelector('.events_card');

        let eventListHTML = '';

        eventsData.events.forEach(event => {
            eventListHTML += `
                <div class="event-item">
                    <div class="event-title">${event.title}</div>
                    <div class="event-details">
                        <strong>Date:</strong> ${event.date} <br>
                        <strong>Time:</strong> ${event.time} <br>
                        <strong>Location:</strong> ${event.location}<br><br><br>
                    </div>
                </div>
            `;
        });

        eventsCard.innerHTML = eventListHTML;
    } catch (error) {
        console.error('Error loading the JSON file:', error);
    }
}

loadEvents();
//Weather
const time = new Date();
const day = time.getDay();
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const apikey = "f12a2fa0a6a6f9fddbc14d416515b70b";
const latitude_ = -1.0335053300644959;
const longitude_ = 29.69321913833942;

document.addEventListener("DOMContentLoaded", () => {
    //const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude_}&lon=${longitude_}&units=metric&appid=${apikey}`
    async function apiFetch() {
        try {
            const response = await fetch(urlWeather);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const displayResults = (data) => {
        const eventMainBox = document.querySelector(".weather_card");
        eventMainBox.innerHTML = "";

        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let desc = data.weather[0].description;

        eventMainBox.innerHTML = `
            <div class="current-weather">
                <h2>The current Weather in: <span id="city-name">${data.name}</span>. Bwindi, the Home of Gorillas</h2>
                <h4>${weekdays[day]}</h4>
                <div class="weather-content"></div>
                <p>Temperature: <span id="current-temp">${parseFloat(data.main.temp).toFixed(0)}°C</span></p>
                <figure>
                    <img id="weather-icon" src="${iconsrc}" alt="${desc}">
                    <figcaption>${desc}</figcaption>
                </figure>
            </div>
        `;
    };

    apiFetch();
});

document.addEventListener("DOMContentLoaded", () => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=0.316994&lon=32.6464&units=metric&appid=f12a2fa0a6a6f9fddbc14d416515b70b`;

    async function apiForecastFetch() {
        try {
            const response = await fetch(forecastUrl);
            if (response.ok) {
                const forecastData = await response.json();
                displayResultsForecast(forecastData);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    }

    const displayResultsForecast = (forecastData) => {
        const weatherForecast = document.querySelector(".forecast_card");
        weatherForecast.innerHTML = "";

        const forecast = document.createElement("article");
        forecast.className = "forecast";
        forecast.innerHTML = `
            <h3>3-Day Weather Forecast</h3>
            <div class="main-day-box">
                <div class="day-box">
                    <h4 id="day-01">${weekdays[(day + 1) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-1" src="" alt="">
                        <figcaption id="figcaption-1"></figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-1"></span></p>
                </div>
                <div class="day-box">
                    <h4 id="day-02">${weekdays[(day + 2) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-2" src="" alt="">
                        <figcaption id="figcaption-2"></figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-2"></span></p>
                </div>
                <div class="day-box">
                    <h4 id="day-03">${weekdays[(day + 3) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-3" src="" alt="">
                        <figcaption id="figcaption-3"></figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-3"></span></p>
                </div>
            </div>
        `;
        weatherForecast.appendChild(forecast);

        const dailyForecasts = forecastData.list.slice(0, 3);
        dailyForecasts.forEach((dailyData, index) => {
            document.getElementById(
                `weather-icon-${index + 1}`
            ).src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
            document.getElementById(`figcaption-${index + 1}`).textContent =
                dailyData.weather[0].description;

            document.getElementById(
                `temp-${index + 1}`
            ).textContent = `${parseFloat(dailyData.main.temp).toFixed(0)}°C`;
        });
    };

    apiForecastFetch();
});

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
    const container = document.getElementById("index-members-container");
    container.innerHTML = ''; // Clear existing content

    // Filter out only Gold-status members (assuming Gold = membershipLevel 3)
    const goldMembers = companies.filter(company => company.membershipLevel === 3).slice(0, 3); // Get only 3 Gold members

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

        // Add Rows for Each Gold Member
        goldMembers.forEach(company => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${company.image}" alt="${company.name} logo" class="company-logo"></td>
                <td>${company.name}</td>
                <td>${company.address}</td>
                <td>${company.phone}</td>
                <td><a href="${company.website}" target="_blank">${company.website}</a></td>
                <td>${company.membershipLevel === 3 ? 'Gold' : ''}</td>
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
        goldMembers.forEach(company => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${company.image}" alt="${company.name} logo">
                <h2>${company.name}</h2>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Membership Level:</strong> Gold</p>
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
initializePage();
