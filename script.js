// Initialize the map (St. John Bosco's coordinates)
const map = L.map('map').setView([34.0619, -118.1255], 15);

// Set the tile layer for the map (using OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch and display events from the Cloudflare Worker API
async function fetchEvents() {
    const response = await fetch("https://your-worker-subdomain.workers.dev/events"); // Replace with your Worker URL
    const events = await response.json();

    // Loop through the events and add markers to the map
    events.forEach(event => {
        const { title, description, location, time } = event;
        const [lat, lng] = location.split(','); // Assuming location is comma-separated lat,lng

        // Add marker to map
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`
                <strong>${title}</strong><br>
                ${description}<br>
                <em>Time: ${time}</em>
            `);
    });
}

// Function to handle form submission (adding events to the database)
document.getElementById("eventForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;  // This should be lat,lng format
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;

    // Send event data to Cloudflare Worker for saving in the database
    await fetch("https://your-worker-subdomain.workers.dev/addevent", { // Replace with your Worker URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, location, time })
    });

    // Refresh the displayed events after adding a new one
    fetchEvents();
});

// Initial fetch to load existing events from the database
fetchEvents();
