// Initialize the map with a fixed image
const map = L.map('map', {
    crs: L.CRS.Simple, // Use a simple coordinate system for an image
    zoomControl: false, // Disable zoom controls
    dragging: false, // Prevent moving
    scrollWheelZoom: false, // Disable zooming with scroll
    doubleClickZoom: false, // Disable double-click zooming
    touchZoom: false, // Disable pinch zoom
});

// Define the image bounds (adjust as needed)
const bounds = [[0, 0], [1000, 1500]];

// Add the campus map image as an overlay
L.imageOverlay(
    'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg',
    bounds
).addTo(map);

map.fitBounds(bounds); // Center and scale the map

// Fetch and display events
async function fetchEvents() {
    const response = await fetch("https://your-worker-subdomain.workers.dev/events"); // Replace with your Worker URL
    const events = await response.json();

    const eventList = document.getElementById("events");
    eventList.innerHTML = ""; // Clear existing events

    events.forEach(event => {
        const { title, description, location, time } = event;
        const [x, y] = location.split(',');

        // Add marker
        L.marker([x, y]).addTo(map)
            .bindPopup(`<strong>${title}</strong><br>${description}<br><em>Time: ${time}</em>`);

        // Add to event list
        const li = document.createElement("li");
        li.innerHTML = `<strong>${title}</strong> - ${time} @ ${location}`;
        eventList.appendChild(li);
    });
}

// Handle form submission
document.getElementById("eventForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;

    // Send data to Cloudflare Worker
    await fetch("https://your-worker-subdomain.workers.dev/addevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, location, time })
    });

    fetchEvents(); // Refresh event list
});

fetchEvents(); // Initial load
