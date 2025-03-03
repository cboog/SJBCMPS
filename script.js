document.addEventListener("DOMContentLoaded", () => {
    function updateMarker(markerId, xPercent, yPercent, mapWidth, mapHeight) {
        const marker = document.getElementById(markerId);
        if (marker) {
            const left = (xPercent / 100) * mapWidth;
            const top = (yPercent / 100) * mapHeight;
            marker.style.left = `${left}px`;
            marker.style.top = `${top}px`;
        }
    }

    const mapImage = document.querySelector(".map-container img");
    mapImage.onload = function() {
        const mapWidth = mapImage.offsetWidth;
        const mapHeight = mapImage.offsetHeight;

        // Place marker-1 at 34% x, 26% y
        updateMarker("marker-1", 34, 26, mapWidth, mapHeight);
    };

    const addEventButton = document.getElementById("addEventButton");
    const eventForm = document.getElementById("event-form");
    const createEventButton = document.getElementById("createEvent");

    addEventButton.addEventListener("click", () => {
        eventForm.style.display = "block";
    });

    createEventButton.addEventListener("click", () => {
        const eventName = document.getElementById("eventName").value;
        const eventTime = document.getElementById("eventTime").value;
        const eventLocation = document.getElementById("eventLocation").value;

        // Get the marker's position
        const marker = document.getElementById(eventLocation);
        const markerLeft = marker.style.left;
        const markerTop = marker.style.top;

        // Create a new event marker (or display event info)
        createNewEventMarker(markerLeft, markerTop, eventName, eventTime);

        // Hide the form
        eventForm.style.display = "none";
    });

    function createNewEventMarker(left, top, name, time) {
        const eventMarker = document.createElement("div");
        eventMarker.className = "event-marker";
        eventMarker.style.left = left;
        eventMarker.style.top = top;
        eventMarker.innerHTML = `<span class="event-info">${name}<br>${time}</span>`;
        document.querySelector(".map-container").appendChild(eventMarker);
    }
});
