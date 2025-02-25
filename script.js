// Initialize the map with St. John Bosco's campus dimensions
const map = L.map('map', {
    crs: L.CRS.Simple, // Use a simple coordinate system for an image
    minZoom: -2, // Allows zooming out
    maxZoom: 2, // Allows zooming in
});

// Define the image bounds (adjust if needed to match real-world scale)
const bounds = [[0, 0], [1000, 1500]]; // This defines the image size

// Add the campus map image as an overlay
L.imageOverlay(
    'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg',
    bounds
).addTo(map);

map.fitBounds(bounds); // Fit the image within the view

// Function to fetch and display events from the Cloudflare Worker API
async function fetchEvents() {
    const response = await fetch("https://your-worker-subdomain.workers.dev/events"); // Replace with your Worker URL
    const events = await response.json();

    // Loop through the events and add markers to the map
    events.forEach(event => {
        const { title, description, location, time } = event;
        const [x, y] = location.split(','); // Assuming location is comma-separated x,y

        // Add marker to map
        L.marker([x, y]).addTo(map)
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
    const location = document.getElementById("location").value; // Should be x,y format
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
