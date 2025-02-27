// Fetch and display events from Cloudflare Worker
async function fetchEvents() {
    try {
        const response = await fetch("https://your-worker-subdomain.workers.dev/events"); // Replace with actual Worker URL
        const events = await response.json();

        const eventList = document.getElementById("events");
        eventList.innerHTML = ""; // Clear existing events

        events.forEach(event => {
            const { title, description, location, time } = event;
            const [lat, lng] = location.split(',').map(Number); // Convert to numbers

            // Add marker with popup
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<strong>${title}</strong><br>${description}<br><em>Time: ${time}</em>`);

            // Add to event list
            const li = document.createElement("li");
            li.innerHTML = `<strong>${title}</strong> - ${time} @ ${location}`;
            eventList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Handle form submission for adding events
document.getElementById("eventForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;

    // Send event data to Cloudflare Worker
    try {
        await fetch("https://your-worker-subdomain.workers.dev/addevent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, location, time })
        });

        fetchEvents(); // Refresh event list after adding
    } catch (error) {
        console.error("Error adding event:", error);
    }
});

fetchEvents(); // Load events on page load
