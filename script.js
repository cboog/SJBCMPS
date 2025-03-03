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

    function placeInitialMarker() {
        if (mapImage.complete) { // Check if image is already loaded
            const mapWidth = mapImage.offsetWidth;
            const mapHeight = mapImage.offsetHeight;
            updateMarker("marker-1", 34, 26, mapWidth, mapHeight);
        } else {
            mapImage.onload = function() {
                const mapWidth = mapImage.offsetWidth;
                const mapHeight = mapImage.offsetHeight;
                updateMarker("marker-1", 34, 26, mapWidth, mapHeight);
            };
        }
    }

    placeInitialMarker(); // Call the function to place the marker

    const addEventButton = document.getElementById("addEventButton");
    const eventForm = document.getElementById("event-form");
    const createEventButton = document.getElementById("createEvent");

    addEventButton.addEventListener("click", () => {
        eventForm.style.display = "block";
    });

    // Arrow button functionality
    document.querySelectorAll(".arrow-up, .arrow-down").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            let value = parseInt(input.value);
            const min = parseInt(input.min);
            const max = parseInt(input.max);

            if (button.classList.contains("arrow-up")) {
                value++;
                if (value > max) value = min;
            } else {
                value--;
                if (value < min) value = max;
            }

            input.value = value;
        });
    });

    createEventButton.addEventListener("click", () => {
        const eventName = document.getElementById("eventName").value;
        const eventHours = document.getElementById("eventHours").value;
        const eventMinutes = document.getElementById("eventMinutes").value;
        const eventLocation = document.getElementById("eventLocation").value;

        // Combine hours and minutes into a time string
        const eventTime = `${eventHours}:${eventMinutes}`;

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
